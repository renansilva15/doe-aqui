'use client'

import Button from '@/components/Button/Button'
import Input from '@/components/Input/Input'
import Overlay from '@/components/Overlay/Overlay'
import Image from 'next/image'

import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center relative">
      <Overlay />
      <Image
        src="/bg.webp"
        alt="bg"
        fill
        objectFit="cover"
        className="-z-20 absolute"
      />

      <div className="flex flex-col items-center justify-center w-full p-8 bg-primary-900/40  text-primary-50 gap-4 md:p-16 md:rounded-lg md:w-[460px]">
        <form className="flex flex-col items-center justify-center w-full gap-3">
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
            style="OUTLINED"
            title="Cadastre se"
            action={() => router.push('/auth/sign')}
          ></Button>
          <Button width="MAX" style="PRIMARY" title="Login"></Button>
        </div>
      </div>
    </main>
  )
}
