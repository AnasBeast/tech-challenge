'use client'

import { useEffect, useState } from 'react'

type Transaction = {
  id: string
  date: string
  amount: number
  balance: number
}

export default function AccountStatement() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions')
    const data = await response.json()
    setTransactions(data)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Account Statement</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-right">Amount</th>
            <th className="text-right">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td className={`text-right ${transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {transaction.amount.toFixed(2)}
              </td>
              <td className="text-right">{transaction.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

