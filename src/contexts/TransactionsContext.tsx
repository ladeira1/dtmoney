import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../services/api'

interface Transaction {
  id: number
  title: string
  type: string
  category: string
  amount: number
  createdAt: Date
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[]
  createNewTransaction: (transaction: TransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextData)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function createNewTransaction(newTransaction: TransactionInput) {
    const response = await api.post('/transactions', { 
      ...newTransaction,
      createdAt: new Date()
     })

    const { transaction } = response.data
    setTransactions([
      ...transactions,
      transaction
    ])
  }
  
  useEffect(() => {
    api.get('transactions').then(response => setTransactions(response.data.transactions))
  }, [])
  
  return (
    <TransactionsContext.Provider value={{ transactions, createNewTransaction }} >
      {children}
    </TransactionsContext.Provider>
  )
}