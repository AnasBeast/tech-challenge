'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type TransactionType = 'deposit' | 'withdraw' | 'transfer'

export default function TransactionForm() {
  const [type, setType] = useState<TransactionType>('deposit')
  const [amount, setAmount] = useState('')
  const [iban, setIban] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (type === 'transfer' && !isValidIBAN(iban)) {
      setError('Invalid IBAN')
      return
    }

    const response = await fetch('/api/transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, amount: parseFloat(amount), iban }),
    })

    if (response.ok) {
      setAmount('')
      setIban('')
      router.refresh()
    } else {
      const data = await response.json()
      setError(data.error || 'An error occurred')
    }
  }

  const isValidIBAN = (iban: string) => {
    // Simple IBAN validation (this should be more robust in a real application)
    return /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(iban)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">New Transaction</h2>
      <div className="mb-4">
        <label className="block mb-2">Transaction Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="w-full p-2 border rounded"
        >
          <option value="deposit">Deposit</option>
          <option value="withdraw">Withdraw</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
          min="0.01"
          step="0.01"
        />
      </div>
      {type === 'transfer' && (
        <div className="mb-4">
          <label className="block mb-2">IBAN</label>
          <input
            type="text"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  )
}

