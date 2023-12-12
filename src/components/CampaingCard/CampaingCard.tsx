import Image from 'next/image'
import { PieChart } from '../Chart/PieChart'

interface CampaingCardProps {
  title: string
  user: string
  description: string
  image: string
  goal: number
  raised: number
}

export const CampaingCard = ({
  title,
  description,
  image,
  goal,
  raised,
  user,
}: CampaingCardProps) => {
  return (
    <div className="w-full flex flex-col relative bg-primary-50 shadow-custom rounded-xl overflow-hidden">
      <div className="w-full flex relative">
        <Image
          src={image || '/img-sample.jpg'}
          alt="card"
          width={500}
          height={500}
          className="w-full h-auto"
        />
        <div className="bg-primary-500 py-2 px-4 text-white text-sm flex flex-col justify-start items-start absolute bottom-2 left-2 right-2">
          <h4>{title}</h4>
          <span className="font-light text-[10px]">{user}</span>
        </div>
      </div>
      <p className="text-sm text-primary-500 p-3 text-center font-normal">
        {description}
      </p>
      <hr className="bg-primary-500 mx-2 h-0.5" />
      <div className="grid grid-cols-2">
        <div className="w-full flex flex-col items-center justify-center gap-2 text-primary-500 py-3">
          <div className="flex flex-col">
            <h4 className="font-semibold">Arrecadado</h4>
            <h4>R$ {raised}</h4>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold">Meta</h4>
            <h4>R$ {goal}</h4>
          </div>
        </div>

        <PieChart goal={goal} raised={raised} />
      </div>
    </div>
  )
}
