'use client'

import { useEffect } from 'react'
import { useTransactions } from '../context/TransactionsContext'
import { motion } from 'framer-motion'

export default function AccountStatement() {
  const { transactions, setTransactions } = useTransactions()

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions')
      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }
      const data = await response.json()
      setTransactions(data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
    }
  }

  return (

      <motion.div 
      className="bg-gray-800 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Account Statement</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-right">Amount</th>
              <th className="py-2 text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <motion.tr 
                key={transaction.id}
                className="border-b border-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="py-2">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td className={`py-2 text-right ${transaction.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                  {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                </td>
                <td className="py-2 text-right">${transaction.balance.toFixed(2)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}