'use client'

import { useEffect, useState } from 'react'
import { useTransactions } from '../context/TransactionsContext'

export default function AccountBalance() {
  const [balance, setBalance] = useState(0)
  const { transactions, setTransactions } = useTransactions()

  useEffect(() => {
    fetchBalance()
  }, [transactions])

  const fetchBalance = async () => {
    const response = await fetch('/api/balance')
    const data = await response.json()
    setBalance(data.balance)
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Account Balance</h2>
      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">${balance.toFixed(2)}</p>
    </div>
  )
}