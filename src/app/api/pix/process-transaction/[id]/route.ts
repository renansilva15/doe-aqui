import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const txId = params.id

  try {
    const transaction = await prisma.pix.findUnique({
      where: {
        txId,
      },
    })

    if (!transaction) {
      return getErrorResponse(404, 'Transaction not found')
    }

    await prisma.$transaction([
      prisma.campaign.update({
        data: {
          totalRaised: {
            increment: transaction.amount,
          },
        },
        where: {
          id: transaction.campaignId,
        },
      }),

      prisma.pix.delete({
        where: {
          txId,
        },
      }),
    ])

    return NextResponse.json({
      status: 'sucess',
      message: 'Transaction completed',
    })
  } catch (error) {
    console.log(error)

    return getErrorResponse()
  }
}
