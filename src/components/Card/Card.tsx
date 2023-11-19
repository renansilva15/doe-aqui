import { ReactNode } from 'react'

interface CardProps {
  title: string
  description: string
  children?: ReactNode
}

export const Card = ({ title, description, children }: CardProps) => {
  return (
    <div className="bg-primary-50 text-primary-500 text-center flex flex-col items-center -mt-20 justify-center p-8 gap-7 rounded-xl shadow-custom">
      <div className="flex flex-col items-center justify-center">
        {children}
        <h1 className="text-2xl leading-none">{title}</h1>
      </div>
      <p className="text-base">{description}</p>
    </div>
  )
}

export default Card
