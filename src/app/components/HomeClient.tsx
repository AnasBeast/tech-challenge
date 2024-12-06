'use client'

import AccountBalance from './AccountBalance'
import TransactionForm from './TransactionForm'
import AccountStatement from './AccountStatement'
import { TransactionsProvider } from '../context/TransactionsContext'

export default function HomeClient() {
  return (
    <TransactionsProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Banking App</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <AccountBalance />
            <TransactionForm />
          </div>
          <AccountStatement />
        </div>
      </main>
    </TransactionsProvider>
  )
}