import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
import {
  UpdateCampaignInput,
  UpdateCampaignSchema,
} from '@/lib/validations/campaign.schema'
import { NextRequest, NextResponse } from 'next/server'

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
    console.error('Error deleting campaign:', error)

    return NextResponse.json({
      status: 'error',
      message: 'Failed to delete campaign',
    })
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

  const body = (await req.json()) as UpdateCampaignInput

  const { title, description, goal, totalRaised, pixKey } =
    UpdateCampaignSchema.parse(body)

  if (!title || !description || !pixKey) {
    return NextResponse.json({
      status: 'fail',
      data: {},
    })
  }

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id, userId },
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
      data: { campaign },
    })
  } catch (error) {
    console.error('Error deleting campaign:', error)

    return NextResponse.json({
      status: 'error',
      message: 'Failed to delete campaign',
    })
  }
}
