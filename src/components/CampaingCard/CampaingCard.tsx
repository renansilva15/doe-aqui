'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { PieChart } from '../Chart/PieChart'
import ModalCampaing from '../ModalCampaing/ModalCampaing'
import Input from '../Input/Input'

interface CampaingCardProps {
  title: string
  user: string
  description: string
  image: string
  goal: number
  raised: number

  pixKey: string
}

export const CampaingCard = ({
  title,
  description,
  image,
  goal,
  raised,
  user,
  pixKey,
}: CampaingCardProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden' // Desativa o scroll da página ao abrir o modal
    } else {
      document.body.style.overflow = 'auto' // Reativa o scroll da página ao fechar o modal
    }

    return () => {
      document.body.style.overflow = 'auto' // Garante que o scroll seja reativado ao desmontar o componente
    }
  }, [openModal])

  return (
    <>
      {openModal && (
        <ModalCampaing>
          <div className="w-full flex flex-col items-center justify-center md:grid md:grid-cols-2 md:p-4 md:items-start md:gap-y-4">
            <Image
              src={image || '/img-sample.jpg'}
              alt="card"
              width={500}
              height={500}
              className="w-full h-auto"
            />

            <div className="w-full flex flex-col items-start justify-center gap-3 p-4 md:pl-4 md:pt-0">
              <div className="w-full grid grid-cols-4">
                <div className="flex flex-col w-full col-span-3">
                  <h1 className="text-2xl font-semibold">{title}</h1>
                  <h3 className="font-light text-sm">{user}</h3>
                </div>
                <div className="flex items-center justify-end w-full ">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="py-2 px-4 bg-primary-500 rounded-xl text-primary-50"
                  >
                    Voltar
                  </button>
                </div>
              </div>
              <div className="w-full">{description}</div>
              <div className="w-full grid grid-cols-2 border-b-2 md:border-0">
                <div className="w-full flex flex-col items-start justify-start gap-2 text-primary-500">
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

            <div className="w-full flex flex-col items-start justify-center gap-3 p-4 col-span-2">
              <p>Contribua para essa campanha, faça sua doação.</p>
              <div className="w-full flex">
                <div className="flex flex-1 relative">
                  <Input
                    type="number"
                    idName="donation"
                    label="Insira um valor"
                    placeholder="R$ 10"
                  />
                  <button className="py-2 px-4 bg-primary-500 rounded-r-xl h-[50px] text-primary-50 absolute bottom-[-1px] right-[-4px]">
                    Doar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalCampaing>
      )}

      <div
        onClick={() => setOpenModal(true)}
        className="w-full flex flex-col relative bg-primary-50 shadow-custom rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-200"
      >
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
    </>
  )
}
