import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import {
  RegisterCampaignInput,
  RegisterCampaignSchema,
} from '@/lib/validations/campaign.schema'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function GET() {
  try {
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
  } catch (error) {
    console.log(error)

    return getErrorResponse()
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get('X-USER-ID')

  if (!userId) {
    return getErrorResponse(
      401,
      'You are not logged in, please provide token to gain access',
    )
  }

  try {
    const body = (await req.json()) as RegisterCampaignInput
    const { title, description, pixKey, goal } =
      RegisterCampaignSchema.parse(body)

    const campaign = await prisma.campaign.create({
      data: {
        userId,
        title,
        description,
        pixKey,
        goal,
      },
    })

    return new NextResponse(
      JSON.stringify({
        status: 'success',
        data: { campaign },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.log(error)

    if (error instanceof ZodError) {
      return getErrorResponse(400, 'failed validations', error)
    }

    return getErrorResponse()
  }
}
