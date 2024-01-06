'use client'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Overlay from '@/components/Overlay/Overlay'
import Image from 'next/image'
import { FaUpload } from 'react-icons/fa'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Campaing() {
  const router = useRouter()

  const [selectedFile, setSelectedFile] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement
    const fileList = inputElement.files

    if (fileList && fileList.length > 0) {
      const fileName = fileList[0].name
      setSelectedFile(fileName)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const url = process.env.NEXT_PUBLIC_BASE_URL

    // const formData = new FormData(e.currentTarget)

    // const email = formData.get('login-email')?.toString() ?? ''
    // const password = formData.get('login-password')?.toString() ?? ''

    // console.log(email, password)

    // if (email === '' || password === '') {
    //   console.log('Preencha todos os campos')
    //   alert('Preencha todos os campos')
    // } else if (password.length < 8) {
    //   console.log('A senha deve conter no mínimo 8 caracteres')
    //   alert('A senha deve conter no mínimo 8 caracteres')
    // } else {
    //   const res = await fetch(`${url}/api/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   })

    //   const data = await res.json()

    //   if (data.error) {
    //     console.log(data.error)
    //     alert(data.error)
    //   } else {
    //     if (data.status === 'success') {
    //       router.push('/')
    //     } else alert('Erro ao logar')
    //     console.log(data)
    //   }
    // }
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
              name="camaping-description"
              id="camaping-description"
              rows={4}
              className="w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1"
            ></textarea>
          </div>

          <label
            htmlFor="file-upload"
            className="col-span-2 cursor-pointer w-full bg-primary-50 hover:scale-105 text-primary-500 font-semi py-2 px-4 rounded-lg flex items-center justify-start gap-3"
          >
            <FaUpload />{' '}
            {selectedFile ? <p>{selectedFile}</p> : 'Selecione uma imagem'}
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
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
    </main>
  )
}
