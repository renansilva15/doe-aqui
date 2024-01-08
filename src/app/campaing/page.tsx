'use client'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Overlay from '@/components/Overlay/Overlay'
import Image from 'next/image'
import { FaCheck, FaPlus, FaUpload } from 'react-icons/fa'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ImgCut from '@/components/ImgCut/ImgCut'

type ResponseData = {
  campaign: {
    description: string
    goal: string
    id: string
    imageUrl: string | null
    pixKey: string
    title: string
    totalRaised: string
    userId: string
  }
}

export default function Campaing() {
  const router = useRouter()

  const [modal, setModal] = useState(false)
  const [archivo, setArchivo] = useState<File | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const url = process.env.NEXT_PUBLIC_BASE_URL

    const formData = new FormData(e.currentTarget)

    const title = formData.get('campaign-title')?.toString() ?? ''
    const pixKey = formData.get('campaign-pixkey')?.toString() ?? ''
    const goal = formData.get('campaign-goal')?.toString() ?? ''
    const description = formData.get('campaing-description')?.toString() ?? ''

    console.log(title, pixKey, goal, description)

    if (title === '' || pixKey === '' || goal === '' || description === '') {
      console.log('Preencha todos os campos')
      alert('Preencha todos os campos')
    } else {
      if (parseFloat(goal) <= 0) {
        alert('A meta deve ser maior que 0')
        return
      } else {
        const res = await fetch(`${url}/api/campaign`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            description: description,
            pixKey: pixKey,
            imageUrl: '/img-sample.png',
            goal: parseFloat(goal),
          }),
        })

        const data = await res.json()
        const resData = data.data as ResponseData

        if (data.error) {
          console.log(data.error)
          alert(data.error)
        } else {
          if (archivo) {
            handleUpload(url as string, resData)
          } else {
            alert('Campanha cadastrada com sucesso!')
            router.push('/')
          }
        }
      }
    }
  }

  const handleUpload = async (url: string, dataCampaing: ResponseData) => {
    if (archivo) {
      const formData = new FormData()
      formData.append('file', archivo)
      formData.append('campaignId', dataCampaing.campaign.id)

      try {
        const response = await fetch(`${url}/api/upload`, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Upload bem-sucedido!', data)

          const res = await fetch(
            `${url}/api/campaign/${dataCampaing.campaign.id}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                title: dataCampaing.campaign.title,
                description: dataCampaing.campaign.description,
                imageUrl: data.data.url,
                goal: parseFloat(dataCampaing.campaign.goal),
                totalRaised: 0,
                pixKey: dataCampaing.campaign.pixKey,
              }),
            }
          )

          const data2 = await res.json()
          console.log(data2)

          if (data2.error) {
            console.log(data2.error)
            alert(data2.error)
          } else {
            alert('Campanha cadastrada com sucesso!')
            router.push('/')
          }
        } else {
          console.error(
            'Erro ao fazer o upload:',
            response.status,
            response.statusText
          )
        }
      } catch (error) {
        console.error('Erro ao fazer o upload:', error)
      }
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center relative">
      <Overlay />
      <Image
        src="/bg.webp"
        alt="bg"
        fill
        className="-z-20 absolute object-cover"
      />

      <div className="flex flex-col items-center justify-center w-full h-full p-8 bg-primary-900/40  text-primary-50 gap-4 md:p-16 md:rounded-lg">
        <p className="text-center">
          Preencha o formulario abaixo para cadastrar sua campanha
        </p>
        <form
          id="loginForm"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full gap-3 md:grid md:grid-cols-2 md:gap-4"
        >
          <div className="w-full col-span-2">
            <Input
              label="Titulo"
              placeholder='Ex: "Campanha de arrecadação..."'
              type="text"
              idName="campaign-title"
            />
          </div>
          <Input
            label="Chave PIX"
            placeholder='Ex: "000-000-000-00"'
            type="text"
            idName="campaign-pixkey"
          />
          <Input
            label="Meta"
            placeholder='Ex: "200"'
            type="number"
            idName="campaign-goal"
          />
          <div className="flex flex-col items-start justify-start w-full col-span-2">
            <h3>Descrição</h3>
            <textarea
              name="campaing-description"
              id="campaing-description"
              rows={4}
              className="w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1"
            ></textarea>
          </div>

          <label
            onClick={() => setModal(true)}
            className="col-span-2 cursor-pointer w-full bg-primary-50 hover:scale-105 text-primary-500 font-semi py-2 px-4 rounded-lg flex items-center justify-start gap-3"
          >
            {archivo ? (
              <span className="flex gap-3  items-center justify-start">
                <FaCheck className="text-xl" />
                <span className="h-full flex items-center">
                  Imagem selecionada
                </span>
              </span>
            ) : (
              <span className="flex gap-3 items-center justify-start">
                <FaPlus className="text-xl" />
                <span className="h-full flex items-center">
                  Imagem personalizada
                </span>
              </span>
            )}
          </label>
        </form>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            width="MAX"
            base="OUTLINED"
            title="Inicio"
            onClick={() => router.push('/')}
          ></Button>
          <Button
            width="MAX"
            base="PRIMARY"
            title="Confirmar"
            form="loginForm"
          ></Button>
        </div>
      </div>

      {modal && <ImgCut close={() => setModal(false)} setFile={setArchivo} />}
    </main>
  )
}
