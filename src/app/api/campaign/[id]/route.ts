import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import {
  UpdateCampaignInput,
  UpdateCampaignSchema,
} from '@/lib/validations/campaign.schema'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = req.headers.get('X-USER-ID')

  if (!userId) {
    return getErrorResponse(
      401,
      'You are not logged in, please provide token to gain access',
    )
  }

  const { id } = params

  try {
    const hasCampaign = await prisma.campaign.findUnique({
      where: { id, userId },
    })

    if (!hasCampaign) {
      return getErrorResponse(404, 'Campaign not found')
    }

    const deletedCampaign = await prisma.campaign.delete({
      where: { id, userId },
    })

    return NextResponse.json({
      status: 'success',
      data: { deletedCampaign },
    })
  } catch (error) {
    console.log(error)

    return getErrorResponse(500)
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = req.headers.get('X-USER-ID')

  if (!userId) {
    return getErrorResponse(
      401,
      'You are not logged in, please provide token to gain access',
    )
  }

  const { id } = params

  try {
    const body = (await req.json()) as UpdateCampaignInput

    const { title, description, goal, totalRaised, imageUrl, pixKey } =
      UpdateCampaignSchema.parse(body)

    const campaign = await prisma.campaign.findUnique({
      where: { id },
    })

    if (!campaign) {
      return getErrorResponse(404, 'Campaign not found')
    }

    // campaign.title = title
    // campaign.description = description
    // campaign.goal = goal as unknown as Decimal
    // campaign.totalRaised = totalRaised as unknown as Decimal
    // campaign.pixKey = pixKey

    await prisma.campaign.update({
      data: {
        title,
        description,
        imageUrl,
        goal,
        totalRaised,
        pixKey,
      },
      where: {
        id,
      },
    })

    return NextResponse.json({
      status: 'success',
    })
  } catch (error) {
    console.log(error)

    if (error instanceof ZodError) {
      return getErrorResponse(400, 'failed validations', error)
    }

    return getErrorResponse()
  }
}
