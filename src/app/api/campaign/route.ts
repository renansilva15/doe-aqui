import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import {
  RegisterCampaignInput,
  RegisterCampaignSchema,
} from '@/lib/validations/campaign.schema'
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

  const processedCampaigns = await Promise.all(
    campaigns.map(async (campaign) => {
      const { userId, ...processedCampaign } = campaign

      const username = await prisma.user.findUnique({
        where: {
          id: userId,
        },

        select: {
          name: true,
        },
      })

      return { username: username?.name, ...processedCampaign }
    }),
  )

  return NextResponse.json({
    status: 'success',
    data: { campaigns: processedCampaigns },
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

  const body = (await req.json()) as RegisterCampaignInput
  const { title, description, pixKey } = RegisterCampaignSchema.parse(body)

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
