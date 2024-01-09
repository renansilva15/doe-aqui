'use client'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Loading from '@/components/Loading/Loading'
import Overlay from '@/components/Overlay/Overlay'
import Image from 'next/image'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Sign() {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const name = formData.get('sign-name')?.toString() ?? ''
    const email = formData.get('sign-email')?.toString() ?? ''
    const password = formData.get('sign-password')?.toString() ?? ''
    const password2 = formData.get('sign-password2')?.toString() ?? ''

    console.log(name, email, password, password2)

    if (password !== password2) {
      console.log('As senhas não são iguais')
      alert('As senhas não são iguais')
    } else if (
      name === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      console.log('Preencha todos os campos')
      alert('Preencha todos os campos')
    } else if (password.length < 8) {
      console.log('A senha deve conter no mínimo 8 caracteres')
      alert('A senha deve conter no mínimo 8 caracteres')
    } else {
      const res = await fetch(`${url}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })

      const data = await res.json()

      if (data.error) {
        console.log(data.error)
        alert(data.error)
      } else {
        if (data.status === 'success') {
          router.push('/auth/login')
        } else alert('Erro ao cadastrar usuário')
        console.log(data)
      }
    }

    setLoading(false)
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

      <div className="flex flex-col items-center justify-center w-full p-8 bg-primary-900/40  text-primary-50 gap-4 md:p-16 md:rounded-lg md:w-[460px]">
        <form
          id="signForm"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full gap-3"
        >
          <Input
            label="Nome"
            placeholder='Ex: "João da Silva"'
            type="text"
            idName="sign-name"
          />
          <Input
            label="Email"
            placeholder='Ex: "exemple@gmail.com"'
            type="email"
            idName="sign-email"
          />
          <Input
            label="Senha"
            placeholder=" ********"
            type="password"
            idName="sign-password"
          />
          <Input
            label="Repita sua senha"
            placeholder=" ********"
            type="password"
            idName="sign-password2"
          />
        </form>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            width="MAX"
            base="OUTLINED"
            title="Voltar"
            onClick={() => router.push('/')}
          ></Button>
          <Button
            width="MAX"
            base="PRIMARY"
            title="Confirmar"
            form="signForm"
          ></Button>
        </div>
      </div>

      {loading && <Loading />}
    </main>
  )
}
