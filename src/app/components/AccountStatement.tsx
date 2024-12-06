'use client'

import { useEffect } from 'react'
import { useTransactions } from '../context/TransactionsContext'

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
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Account Statement</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-gray-700 dark:text-gray-300">Date</th>
            <th className="text-right text-gray-700 dark:text-gray-300">Amount</th>
            <th className="text-right text-gray-700 dark:text-gray-300">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return(
            <tr key={transaction.id} className="border-t border-gray-200 dark:border-gray-700">
              <td className="py-2 text-gray-900 dark:text-gray-100">{new Date(transaction.createdAt).toLocaleDateString()}</td>
              <td className={`py-2 text-right ${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.amount.toFixed(2)}
              </td>
              <td className="py-2 text-right text-gray-900 dark:text-gray-100">{transaction.balance.toFixed(2)}</td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  )
}