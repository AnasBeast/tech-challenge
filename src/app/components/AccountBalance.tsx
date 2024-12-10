'use client'

import { useEffect, useState } from 'react'
import { useTransactions } from '../context/TransactionsContext'
import { motion } from 'framer-motion'

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
    <motion.div 
      className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Account Balance</h2>
      <p className="text-4xl font-bold text-green-400">${balance.toFixed(2)}</p>
    </motion.div>
  )
}