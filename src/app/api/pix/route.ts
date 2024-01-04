import { getRandomNumbers } from '@/lib/get-random-numbers'
import { pix } from '@klawdyo/pix.js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { pixKey, amount } = body

  const code = pix({
    key: pixKey,
    // name: '',
    // city: 'coco',
    txId: getRandomNumbers(4).join(''),
    amount,
  })

  const data = {
    pixCode: code,
  }

  return NextResponse.json({
    data,
  })
}
