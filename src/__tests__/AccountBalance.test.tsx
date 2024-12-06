import { render, screen, waitFor } from '@testing-library/react'
import AccountBalance from '@/components/AccountBalance'

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ balance: 1000 }),
  })
) as jest.Mock

describe('AccountBalance', () => {
  it('renders the account balance', async () => {
    render(<AccountBalance />)

    await waitFor(() => {
      expect(screen.getByText('$1000.00')).toBeInTheDocument()
    })
  })

  it('calls the balance API on mount', () => {
    render(<AccountBalance />)
    expect(global.fetch).toHaveBeenCalledWith('/api/balance')
  })
})

