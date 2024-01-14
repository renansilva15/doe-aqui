'use client'

import { FormEvent, useState } from 'react'
import { FaCheck, FaPlus } from 'react-icons/fa'

import Input from '../Input/Input'
import Button from '../Button/Button'
import ImgCut from '../ImgCut/ImgCut'
import Loading from '../Loading/Loading'

interface UpdateProps {
  id: string
  description: string
  goal: number
  imageUrl: string
  pixKey: string
  title: string
  totalRaised: number

  action: () => void
}

type Update = {
  id: string
  imageUrl: string
  title: string
  description: string
  goal: string
  totalRaised: string
  pixKey: string
}

export const ModalUpdate = ({
  description,
  goal,
  id,
  imageUrl,
  pixKey,
  title,
  totalRaised,
  action,
}: UpdateProps) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL

  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [archivo, setArchivo] = useState<File | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const title = formData.get('update-title')?.toString() ?? ''
    const pixKey = formData.get('update-pixkey')?.toString() ?? ''
    const goal = formData.get('update-goal')?.toString() ?? ''
    const raised = formData.get('update-raised')?.toString() ?? ''
    const description = formData.get('update-description')?.toString() ?? ''

    if (
      title === '' ||
      pixKey === '' ||
      goal === '' ||
      raised === '' ||
      description === ''
    ) {
      console.log('Preencha todos os campos')
      alert('Preencha todos os campos')
    } else {
      if (parseFloat(goal) <= 0 || parseFloat(raised) < 0) {
        alert('Sem numeros negativos ou meta zerada')
      } else if (archivo) {
        handleUpload({
          description,
          goal,
          id,
          imageUrl,
          pixKey,
          title,
          totalRaised: raised,
        })
      } else {
        handleUpdate({
          description,
          goal,
          id,
          imageUrl,
          pixKey,
          title,
          totalRaised: raised,
        })
      }
    }
  }

  const handleUpload = async (dataCampaing: Update) => {
    if (archivo) {
      const formData = new FormData()
      formData.append('file', archivo)
      formData.append('campaignId', dataCampaing.id)

      try {
        const response = await fetch(`${url}/api/upload`, {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const data = await response.json()
          console.log('Upload bem-sucedido!', data)

          handleUpdate(dataCampaing, data.data.url)
        } else {
          console.error(
            'Erro ao fazer o upload:',
            response.status,
            response.statusText,
          )
        }
      } catch (error) {
        console.error('Erro ao fazer o upload:', error)
      }
    }
  }

  async function handleUpdate(dataCampaing: Update, image?: string) {
    const res = await fetch(`${url}/api/campaign/${dataCampaing.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: dataCampaing.title,
        description: dataCampaing.description,
        imageUrl: image || dataCampaing.imageUrl,
        goal: parseFloat(dataCampaing.goal),
        totalRaised: parseFloat(dataCampaing.totalRaised),
        pixKey: dataCampaing.pixKey,
      }),
    })

    const data2 = await res.json()
    console.log(data2)

    if (data2.error) {
      console.log(data2.error)
      alert(data2.error)
    } else {
      alert('Campanha atualizada com sucesso!')
      setLoading(false)
      action()
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-primary-800 flex flex-col text-primary-50 p-4 md:px-10">
      <div className="flex w-full items-center justify-center py-4 md:py-10 text-xl md:text-2xl">
        <h1>Edite os dados da sua campanha</h1>
      </div>
      <div className="flex flex-col gap-4 justify-start items-center w-full">
        <form
          id="update-form"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full gap-3 md:grid md:grid-cols-2 md:gap-4"
        >
          <Input
            label="Titulo"
            placeholder='Ex: "Campanha de arrecadação..."'
            type="text"
            idName="update-title"
            value={title}
          />
          <Input
            label="Chave PIX"
            placeholder='Ex: "000-000-000-00"'
            type="text"
            idName="update-pixkey"
            value={pixKey}
          />
          <Input
            label="Meta"
            placeholder='Ex: "200"'
            type="number"
            idName="update-goal"
            value={goal.toString()}
          />
          <Input
            label="Arrecadado"
            placeholder='Ex: "150"'
            type="number"
            idName="update-raised"
            value={totalRaised.toString()}
          />
          <div className="flex flex-col items-start justify-start w-full col-span-2">
            <h3>Descrição</h3>
            <textarea
              name="update-description"
              id="update-description"
              rows={4}
              className="w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1"
              defaultValue={description}
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
                  Imagem atualizada
                </span>
              </span>
            ) : (
              <span className="flex gap-3 items-center justify-start">
                <FaPlus className="text-xl" />
                <span className="h-full flex items-center">
                  Atualizar imagem?
                </span>
              </span>
            )}
          </label>
        </form>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            width="MAX"
            base="DANGER"
            title="Cancelar"
            onClick={action}
          ></Button>
          <Button
            width="MAX"
            base="PRIMARY"
            title="Comfirmar"
            form="update-form"
          ></Button>
        </div>
      </div>

      {modal && <ImgCut close={() => setModal(false)} setFile={setArchivo} />}
      {loading && <Loading />}
    </div>
  )
}
export default ModalUpdate
