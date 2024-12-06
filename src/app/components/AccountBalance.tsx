'use client'

import { useEffect, useState } from 'react'

export default function AccountBalance() {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    fetchBalance()
  }, [])

  const fetchBalance = async () => {
    const response = await fetch('/api/balance')
    const data = await response.json()
    setBalance(data.balance)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">Account Balance</h2>
      <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
    </div>
  )
}

