'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Campaign } from '@/components/CardRender/CardRender'
import { PieChart } from '@/components/Chart/PieChart'
import { ModalDonate } from '@/components/ModalDonate/ModalDonate'
import Loading from '@/components/Loading/Loading'

export default function View() {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const [data, setData] = useState<Campaign | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [idCampaign, setIdCampaign] = useState<string | null>(null)
  const [modal, setModal] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (searchParams) {
      setIdCampaign(searchParams.get('id'))
    }
  }, [searchParams]) // Executa apenas quando searchParams mudar

  useEffect(() => {
    async function getCampaings() {
      if (!idCampaign) return // Se idCampaign for null, não faz nada

      const res = await fetch(`${url}/api/campaign`)
      const jsonData = await res.json()

      if (jsonData.data) {
        const campaign = jsonData.data.campaigns.find(
          (item: Campaign) => item.id === idCampaign,
        )
        console.log(campaign)
        setLoading(false)
        setData(campaign || null)
      }
    }

    getCampaings()
  }, [url, idCampaign])

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = 'hidden' // Desativa o scroll da página ao abrir o modal
    } else {
      document.body.style.overflow = 'auto' // Reativa o scroll da página ao fechar o modal
    }

    return () => {
      document.body.style.overflow = 'auto' // Garante que o scroll seja reativado ao desmontar o componente
    }
  }, [modal])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data ? (
            <div className="w-full min-h-screen flex flex-col items-center justify-start bg-primary-50 text-primary-600 pb-10">
              <img
                src={data?.imageUrl}
                alt="card"
                width={500}
                height={500}
                className="w-full h-auto md:max-w-[600px] md:pt-8"
              />
              <div className="flex flex-col items-center my-4 px-4 md:p-0 md:w-[600px] md:flex md:items-start">
                <h1 className="text-xl md:text-2xl font-semibold">
                  {data?.title}
                </h1>
                <h3 className="font-light text-sm">{data?.username}</h3>
                <div className="w-full my-4 text-center md:text-start">
                  {data?.description}
                </div>
                <div className="w-full pt-4 border-y pb-4 border-primary-900 grid grid-cols-2 gap-3">
                  <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-col items-center justify-center">
                      <h4 className="font-semibold">Arrecadado</h4>
                      <h4>R$ {data?.totalRaised}</h4>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <h4 className="font-semibold">Meta</h4>
                      <h4>R$ {data?.goal}</h4>
                    </div>
                  </div>
                  <PieChart
                    goal={parseFloat(data?.goal)}
                    raised={parseFloat(data?.totalRaised)}
                  />
                </div>
                <div className="w-full pt-4 flex items-center justify-around gap-4">
                  <button
                    onClick={() => router.back()}
                    className="py-3 w-28 flex items-center justify-center bg-primary-500 text-white text-sm font-light hover:scale-105"
                  >
                    VOLTAR
                  </button>
                  <button
                    onClick={() => setModal(true)}
                    className="py-3 w-28 flex items-center justify-center bg-primary-500 text-white text-sm font-light hover:scale-105"
                  >
                    DOAR
                  </button>
                </div>
              </div>
              {modal && data && (
                <ModalDonate close={() => setModal(false)} id={data?.id} />
              )}
            </div>
          ) : (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-primary-50 text-primary-600 pb-10">
              <h1 className="px-10 md:px-60 mb-5">
                Essa campanha não está disponivél ou pode ter sido removida
              </h1>
              <button
                onClick={() => router.back()}
                className="py-3 w-28 flex items-center justify-center bg-primary-500 text-white text-sm font-light hover:scale-105"
              >
                VOLTAR
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}
