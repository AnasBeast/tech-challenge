'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type Transaction = {
  id: string
  createdAt: string
  amount: number
  balance: number
  type: string
  iban?: string
  accountId :string
}

type TransactionsContextType = {
  transactions: Transaction[]
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined)

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider')
  }
  return context
}