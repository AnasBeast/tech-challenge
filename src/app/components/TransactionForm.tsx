'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransactions, Transaction } from '../context/TransactionsContext'
import { motion } from 'framer-motion'

type TransactionType = 'deposit' | 'withdraw' | 'transfer'

export default function TransactionForm() {
  const [type, setType] = useState<TransactionType>('deposit')
  const [amount, setAmount] = useState('')
  const [iban, setIban] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setTransactions } = useTransactions()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (type === 'transfer' && !isValidIBAN(iban)) {
      setError('Invalid IBAN')
      return
    }

    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, amount: parseFloat(amount), iban }),
      })

      if (!response.ok) {
        throw new Error('Failed to create transaction')
      }

      const data = await response.json()
      setAmount('')
      setIban('')
      setTransactions((prev: Transaction[]) => [data.transaction, ...prev])
      router.refresh()
    } catch (error) {
      console.error('Error creating transaction:', error)
      setError('An error occurred')
    }
  }

  const isValidIBAN = (iban: string) => {
    // Simple IBAN validation (this should be more robust in a real application)
    return /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(iban)
  }

  return (
      <motion.form 
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-lg mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">New Transaction</h2>
      <div className="mb-4">
        <label className="block mb-2">Transaction Type</label>
        <div className="flex">
          <motion.button
            type="button"
            className={`flex-1 py-2 px-4 rounded-l-lg ${type === 'deposit' ? 'bg-green-500' : 'bg-gray-700'}`}
            onClick={() => setType('deposit')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Deposit
          </motion.button>
          <motion.button
            type="button"
            className={`flex-1 py-2 px-4 ${type === 'transfer' ? 'bg-blue-500' : 'bg-gray-700'}`}
            onClick={() => setType('transfer')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Transfer
          </motion.button>
          <motion.button
            type="button"
            className={`flex-1 py-2 px-4 rounded-r-lg ${type === 'withdraw' ? 'bg-red-500' : 'bg-gray-700'}`}
            onClick={() => setType('withdraw')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Withdraw
          </motion.button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2 text-gray-700 dark:text-gray-300">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
          required
          min="0.01"
          step="0.01"
        />
      </div>
      {type === 'transfer' && (
        <div className="mb-4">
          <label htmlFor="iban" className="block mb-2 text-gray-700 dark:text-gray-300">IBAN</label>
          <input
            type="text"
            id="iban"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-gray-100"
            required
          />
        </div>
      )}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
        Submit
      </button>
    </motion.form>
  )
}
