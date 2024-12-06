import { render, screen, waitFor } from '@testing-library/react'
import AccountStatement from '@/components/AccountStatement'

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: '1', date: '2023-05-01T00:00:00.000Z', amount: 100, balance: 1100 },
      { id: '2', date: '2023-05-02T00:00:00.000Z', amount: -50, balance: 1050 },
    ]),
  })
) as jest.Mock

describe('AccountStatement', () => {
  it('renders the account statement', async () => {
    render(<AccountStatement />)

    await waitFor(() => {
      expect(screen.getByText('Account Statement')).toBeInTheDocument()
      expect(screen.getByText('100.00')).toBeInTheDocument()
      expect(screen.getByText('-50.00')).toBeInTheDocument()
      expect(screen.getByText('1100.00')).toBeInTheDocument()
      expect(screen.getByText('1050.00')).toBeInTheDocument()
    })
  })

  it('calls the transactions API on mount', () => {
    render(<AccountStatement />)
    expect(global.fetch).toHaveBeenCalledWith('/api/transactions')
  })
})

