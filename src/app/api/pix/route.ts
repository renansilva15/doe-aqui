import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { pix } from '@klawdyo/pix.js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { campaignId, amount } = body

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
    })

    if (!campaign) {
      return getErrorResponse(404, 'Campaign not found')
    }

    const pixKey = campaign.pixKey
    const txId = await generateTxId()

    const code = pix({
      key: pixKey,
      // name: '',
      // city: 'coco',
      txId,
      amount,
    })

    await prisma.pix.create({
      data: {
        campaignId,
        amount,
        txId,
      },
    })

    const data = {
      pixCode: code,
      txId,
    }

    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data,
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.log(error)

    return getErrorResponse()
  }
}

async function generateTxId() {
  const pixes = await prisma.pix.findMany()

  const lastTxId = pixes.reduce((max, pix) => {
    const txId = parseInt(pix.txId)
    return txId > max ? txId : max
  }, -1)

  const newTxId = (lastTxId + 1) % 10000

  return newTxId.toString().padStart(4, '0') // Ensures the code is 4 digits long.
}
