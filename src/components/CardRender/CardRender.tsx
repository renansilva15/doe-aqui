'use client'

import { useState, useEffect } from 'react'
import { CampaingCard } from '../CampaingCard/CampaingCard'

export type CampaignProps = {
  username: string
  id: string
  imageUrl: string
  title: string
  description: string
  goal: string
  totalRaised: string
  pixKey: string
}

export type Props = {
  data: {
    campaigns: CampaignProps[]
  }
}

export const CardRender = () => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const [data, setData] = useState<Props['data']>({
    campaigns: [],
  })

  useEffect(() => {
    async function getCampaings() {
      const res = await fetch(`${url}/api/campaign`)
      const jsonData = await res.json()

      console.log(jsonData.data)
      setData(jsonData.data)
    }

    getCampaings()
  }, [])

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 w-full px-5 py-8 gap-4 mb-28">
      {data.campaigns.map((item) => (
        <CampaingCard
          id={item.id}
          key={item.id}
          title={item.title}
          user={item.username}
          description={item.description}
          goal={parseFloat(item.goal)}
          raised={parseFloat(item.totalRaised)}
          pixKey={item.pixKey}
          image={item.imageUrl}
        />
      ))}
    </div>
  )
}
export default CardRender
