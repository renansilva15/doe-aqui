'use client'

import { useState, useEffect } from 'react'
import { CampaingCard } from '../CampaingCard/CampaingCard'

type Props = {
  data: {
    campaigns: {
      username: string
      id: string
      title: string
      description: string
      goal: string
      totalRaised: string
      pixKey: string
    }[]
  }
}

export const CardRender = () => {
  const [data, setData] = useState<Props['data']>({
    campaigns: [],
  })

  useEffect(() => {
    async function getCampaings() {
      const res = await fetch('http://localhost:3000/api/campaign')
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
          key={item.id}
          title={item.title}
          user={item.username}
          description={item.description}
          goal={parseFloat(item.goal)}
          raised={parseFloat(item.totalRaised)}
          pixKey={item.pixKey}
          image="/img-sample.jpg"
        />
      ))}
    </div>
  )
}
export default CardRender
