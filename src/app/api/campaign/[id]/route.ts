import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/prisma'
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
