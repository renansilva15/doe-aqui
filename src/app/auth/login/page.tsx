'use client'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Overlay from '@/components/Overlay/Overlay'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const url = process.env.NEXT_PUBLIC_BASE_URL

    const formData = new FormData(e.currentTarget)

    const email = formData.get('login-email')?.toString() ?? ''
    const password = formData.get('login-password')?.toString() ?? ''

    console.log(email, password)

    if (email === '' || password === '') {
      console.log('Preencha todos os campos')
      alert('Preencha todos os campos')
    } else if (password.length < 8) {
      console.log('A senha deve conter no mínimo 8 caracteres')
      alert('A senha deve conter no mínimo 8 caracteres')
    } else {
      const res = await fetch(`${url}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
          router.push('/')
        } else alert('Erro ao logar')
        console.log(data)
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

      <div className="flex flex-col items-center justify-center w-full p-8 bg-primary-900/40  text-primary-50 gap-4 md:p-16 md:rounded-lg md:w-[460px]">
        <form
          id="loginForm"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full gap-3"
        >
          <Input
            label="Email"
            placeholder='Ex: "exemple@gmail.com"'
            type="email"
            idName="login-email"
          />
          <Input
            label="Senha"
            placeholder=" ********"
            type="password"
            idName="login-password"
          />
        </form>
        <div className="grid grid-cols-2 gap-4 w-full">
          <Button
            width="MAX"
            base="OUTLINED"
            title="Cadastre se"
            onClick={() => router.push('/auth/sign')}
          ></Button>
          <Button
            width="MAX"
            base="PRIMARY"
            title="Login"
            form="loginForm"
          ></Button>
        </div>
      </div>
    </main>
  )
}
