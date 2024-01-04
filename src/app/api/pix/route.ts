import { prisma } from '@/lib/prisma'
import { pix } from '@klawdyo/pix.js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { campaignId, amount } = body

  try {
    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
    })

    if (!campaign) {
      return NextResponse.json({
        data: {},
        status: 'fail',
        message: 'Campaign not found',
      })
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

    return NextResponse.json({
      data,
    })
  } catch (err) {
    console.log(err)

    return NextResponse.json({
      data: {},
      status: 'error',
      message: 'Internal Server Error',
    })
  }
}

export async function generateTxId() {
  const pixes = await prisma.pix.findMany()

  const lastTxId = pixes.reduce((max, pix) => {
    const txId = parseInt(pix.txId)
    return txId > max ? txId : max
  }, -1)

  const newTxId = (lastTxId + 1) % 10000

  return newTxId.toString().padStart(4, '0') // Ensures the code is 4 digits long.
}
