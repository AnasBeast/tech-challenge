import { createServer } from 'http'
import { apiResolver } from 'next/dist/server/api-utils/node'
import supertest from 'supertest'
import { GET as getBalance } from '@/app/api/balance/route'
import { POST as postTransaction } from '@/app/api/transaction/route'
import { GET as getTransactions } from '@/app/api/transactions/route'

jest.mock('@/lib/prisma', () => ({
  prisma: {
    account: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    transaction: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

const createTestServer = (handler) => {
  return createServer((req, res) => {
    return apiResolver(req, res, undefined, handler, {} as any, false)
  })
}

describe('API Routes', () => {
  describe('GET /api/balance', () => {
    it('returns the account balance', async () => {
      const prisma = require('@/lib/prisma').prisma
      prisma.account.findFirst.mockResolvedValue({ balance: 1000 })

      const server = createTestServer(getBalance)
      const response = await supertest(server).get('/')

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ balance: 1000 })
    })
  })

  describe('POST /api/transaction', () => {
    it('processes a deposit transaction', async () => {
      const prisma = require('@/lib/prisma').prisma
      prisma.account.findFirst.mockResolvedValue({ id: '1', balance: 1000 })
      prisma.account.update.mockResolvedValue({ balance: 1100 })
      prisma.transaction.create.mockResolvedValue({})

      const server = createTestServer(postTransaction)
      const response = await supertest(server)
        .post('/')
        .send({ type: 'deposit', amount: 100 })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({ success: true, balance: 1100 })
    })

    it('rejects a withdrawal with insufficient funds', async () => {
      const prisma = require('@/lib/prisma').prisma
      prisma.account.findFirst.mockResolvedValue({ id: '1', balance: 100 })

      const server = createTestServer(postTransaction)
      const response = await supertest(server)
        .post('/')
        .send({ type: 'withdraw', amount: 200 })

      expect(response.status).toBe(400)
      expect(response.body).toEqual({ error: 'Insufficient funds' })
    })
  })

  describe('GET /api/transactions', () => {
    it('returns the list of transactions', async () => {
      const prisma = require('@/lib/prisma').prisma
      const mockTransactions = [
        { id: '1', type: 'deposit', amount: 100, balance: 1100, createdAt: new Date() },
        { id: '2', type: 'withdraw', amount: -50, balance: 1050, createdAt: new Date() },
      ]
      prisma.transaction.findMany.mockResolvedValue(mockTransactions)

      const server = createTestServer(getTransactions)
      const response = await supertest(server).get('/')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(mockTransactions)
    })
  })
})

