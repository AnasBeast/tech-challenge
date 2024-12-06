import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { type, amount, iban } = await request.json()

    if (type === 'transfer' && !isValidIBAN(iban)) {
      return NextResponse.json({ error: 'Invalid IBAN' }, { status: 400 })
    }

    const account = await prisma.account.findFirst()
    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 })
    }

    let newBalance = account.balance

    switch (type) {
      case 'deposit':
        newBalance += amount
        break
      case 'withdraw':
      case 'transfer':
        if (account.balance < amount) {
          return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 })
        }
        newBalance -= amount
        break
      default:
        return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 })
    }

    await prisma.account.update({
      where: { id: account.id },
      data: { balance: newBalance },
    })

    let transaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        balance: newBalance,
        accountId: account.id,
        ...(type === 'transfer' && { iban }),
      },
    })

    return NextResponse.json({ success: true, transaction:transaction, balance: newBalance })
  } catch (error) {
    console.error('Error processing transaction:', error)
    return NextResponse.json({ error: 'Failed to process transaction' }, { status: 500 })
  }
}

function isValidIBAN(iban: string) {
  // Simple IBAN validation (this should be more robust in a real application)
  return /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(iban)
}

