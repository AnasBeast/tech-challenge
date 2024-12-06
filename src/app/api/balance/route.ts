import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const account = await prisma.account.findFirst()
    return NextResponse.json({ balance: account?.balance || 0 })
  } catch (error) {
    console.error('Error fetching balance:', error)
    return NextResponse.json({ error: 'Failed to fetch balance' }, { status: 500 })
  }
}
