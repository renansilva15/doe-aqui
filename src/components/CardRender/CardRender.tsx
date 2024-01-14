import { CampaingCard } from '../CampaingCard/CampaingCard'

export type Campaign = {
  username: string
  id: string
  imageUrl: string
  title: string
  description: string
  goal: string
  totalRaised: string
  pixKey: string
}

export type CampaignProps = {
  data: {
    totalRegisteredCampaigns: number
    campaigns: Campaign[]
  }
}

interface CardRenderProps {
  campaigns: Campaign[]
}

export const CardRender = ({ campaigns }: CardRenderProps) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-3 w-full px-5 py-6 gap-4 mb-20">
      {campaigns.length > 0 ? (
        campaigns.map((item) => (
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
        ))
      ) : (
        <h2 className="flex w-full col-span-3 items-center justify-center">
          Campanhas cadastradas aparecerão aqui
        </h2>
      )}
    </div>
  )
}
export default CardRender
