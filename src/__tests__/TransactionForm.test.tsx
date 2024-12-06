import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TransactionForm from '@/components/TransactionForm'

// Mock the fetch function and useRouter
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, balance: 1100 }),
  })
) as jest.Mock

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh: jest.fn(),
  }),
}))

describe('TransactionForm', () => {
  it('renders the form fields', () => {
    render(<TransactionForm />)
    expect(screen.getByLabelText('Transaction Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('shows IBAN field for transfer transactions', () => {
    render(<TransactionForm />)
    fireEvent.change(screen.getByLabelText('Transaction Type'), { target: { value: 'transfer' } })
    expect(screen.getByLabelText('IBAN')).toBeInTheDocument()
  })

  it('submits the form with correct data', async () => {
    render(<TransactionForm />)
    fireEvent.change(screen.getByLabelText('Transaction Type'), { target: { value: 'deposit' } })
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '100' } })
    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'deposit', amount: 100 }),
      })
    })
  })

  it('displays error message on invalid IBAN', async () => {
    render(<TransactionForm />)
    fireEvent.change(screen.getByLabelText('Transaction Type'), { target: { value: 'transfer' } })
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '100' } })
    fireEvent.change(screen.getByLabelText('IBAN'), { target: { value: 'invalid-iban' } })
    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByText('Invalid IBAN')).toBeInTheDocument()
    })
  })
})

