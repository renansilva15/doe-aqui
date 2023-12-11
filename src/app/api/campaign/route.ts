import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  // const userId = req.headers.get('X-USER-ID')

  // if (!userId) {
  //   return getErrorResponse(
  //     401,
  //     'You are not logged in, please provide token to gain access',
  //   )
  // }

  const campaigns = await prisma.campaign.findMany()

  return NextResponse.json({
    status: 'success',
    data: { campaigns },
  })
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-USER-ID')

  if (!userId) {
    return getErrorResponse(
      401,
      'You are not logged in, please provide token to gain access',
    )
  }

  const { title, description, pixKey } = await req.json()

  if (!title || !description || !pixKey) {
    return NextResponse.json({
      status: 'fail',
      data: {},
    })
  }

  const campaign = await prisma.campaign.create({
    data: {
      userId,
      title,
      description,
      pixKey,
    },
  })

  return NextResponse.json({
    status: 'success',
    data: { campaign },
  })
}
