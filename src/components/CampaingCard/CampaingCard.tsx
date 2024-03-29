'use client'

import { useState } from 'react'

import { PieChart } from '../Chart/PieChart'
import { useRouter } from 'next/navigation'
import Button from '../Button/Button'
import ModalUpdate from '../ModalUpdate/ModalUpdate'
import { ModalDelete } from '../ModalDelete/ModalDelete'

interface CampaingCardProps {
  title: string
  user: string
  description: string
  image: string
  goal: number
  raised: number
  id: string
  pixKey: string
}

export const CampaingCard = ({
  title,
  description,
  image,
  goal,
  raised,
  user,
  id,
}: CampaingCardProps) => {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/campaing/view?id=${id}`)}
      className="w-full flex flex-col relative bg-primary-50 shadow-custom rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-200"
    >
      <div className="w-full flex relative">
        <img
          src={image}
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
        <div className="w-full flex flex-col items-start justify-center gap-2 text-primary-500 py-3 pl-4">
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

export const MyCampaing = ({
  title,
  description,
  image,
  goal,
  raised,
  user,
  id,
  pixKey,
}: CampaingCardProps) => {
  const [modal, setModal] = useState(false)
  const [delet, setDelet] = useState(false)

  return (
    <div className="w-full flex flex-col relative bg-primary-50 shadow-custom rounded-xl overflow-hidden">
      <div className="w-full flex relative">
        <img
          src={image}
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
        <div className="w-full flex flex-col items-start justify-center gap-2 text-primary-500 py-3 pl-4">
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
      <div className="grid grid-cols-2 p-3 gap-3">
        <Button
          onClick={() => setDelet(true)}
          base="DANGER"
          title="Deletar"
          width="MAX"
        />
        <Button
          onClick={() => setModal(true)}
          base="PRIMARY"
          title="Editar"
          width="MAX"
        />
      </div>

      {modal && (
        <ModalUpdate
          id={id}
          description={description}
          goal={goal}
          imageUrl={image}
          pixKey={pixKey}
          title={title}
          totalRaised={raised}
          action={() => setModal(false)}
        />
      )}

      {delet && <ModalDelete id={id} action={() => setDelet(false)} />}
    </div>
  )
}
