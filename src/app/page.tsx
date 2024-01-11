'use client'

// import QRCodeComponent from '@/components/QRCode'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { LuHeartHandshake } from 'react-icons/lu'
import { PiHandHeartFill } from 'react-icons/pi'
import { FaPix } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import bg from './../../public/bg.webp'
import Card from '@/components/Card/Card'
import Overlay from '@/components/Overlay/Overlay'
import { Navbar } from '@/components/navbar'
import { TeamCard } from '@/components/TeamCard/TeamCard'
import CardRender, { CampaignProps } from '@/components/CardRender/CardRender'
import Button from '@/components/Button/Button'
import FormRender from '@/components/FormRender/FormRender'

export default function Home() {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState(false)
  const [data, setData] = useState<CampaignProps | null>(null)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BASE_URL
    const isLoggedIn = document.cookie.split(';').some((cookie) => {
      return cookie.trim().startsWith('logged-in=')
    })

    if (isLoggedIn) {
      // O cookie 'logged-in' existe
      console.log('O usuário está logado.')
      setIsLogged(true)
    } else {
      // O cookie 'logged-in' não existe
      console.log('O usuário não está logado.')
      setIsLogged(false)
    }

    async function getCampaings() {
      const res = await fetch(`${url}/api/campaign`)
      const data = await res.json()

      if (data.status === 'success') {
        console.log(data)
        setData(data)
      }
    }

    if (!data) getCampaings()
  }, [])

  function ctaButton() {
    if (isLogged) {
      router.push('/campaing')
    } else {
      alert('Faça login para criar sua campanha!')
      router.push('/auth/login')
    }
  }

  return (
    <main className="w-full flex flex-col items-center justify-start relative">
      <section
        id="home"
        className="w-full min-h-screen flex flex-col items-center justify-start relative"
      >
        <Navbar.Root>
          <Navbar.Logo />
          <Navbar.Content>
            <Navbar.Item title="Inicio" href="#home" />
            <Navbar.Item title="Campanhas" href="#campaing" />
            <Navbar.Item title="Contato" href="#contact" />
            <Navbar.Item title="Sobre" href="#about" />
            <Navbar.Divider />
            {!isLogged && <Navbar.Item title="Cadastre-se" href="/auth/sign" />}
            {!isLogged && <Navbar.Item title="Entrar" href="/auth/login" />}

            {isLogged && <Navbar.Item title="Minha conta" href="/account" />}
            {isLogged && (
              <Navbar.Item
                title="Sair"
                href="/"
                action={() => setIsLogged(false)}
              />
            )}
          </Navbar.Content>
        </Navbar.Root>

        <Overlay />
        <Image src={bg} alt="bg" fill className="-z-20 absolute object-cover" />

        <div className="w-full min-h-full gap-4 flex flex-col flex-1 items-center justify-center -mt-16">
          <h1 className="text-3xl text-center font-semibold text-primary-50">
            Dê vida à sua causa <br /> Comece sua campanha hoje mesmo!
          </h1>
          <Button
            onClick={ctaButton}
            title="Criar minha campanha"
            base="PRIMARY"
            width="AUTO"
          >
            <FaHeart className="text-2xl my-1" />
          </Button>
        </div>
      </section>

      <section className="w-full flex flex-col md:grid md:grid-cols-3 px-5 py-8 gap-4 bg-primary-50">
        <Card
          title="Campanhas cadastradas"
          description="Inspire-se e contribua para criar mudanças significativas."
        >
          {data ? (
            <span className="text-[52px] leading-none">
              {data.data.totalRegisteredCampaigns}
            </span>
          ) : (
            <span className="h-10 w-10 rounded-full border-dashed border-b-2 border-primary-500 animate-spin ease-in-out transition-all duration-500"></span>
          )}
        </Card>

        <Card
          title="Sem fins lucrativos"
          description="Contamos com a comunidade para tornar nosso trabalho possível, seja parte dessa jornada."
        >
          <LuHeartHandshake className="text-[52px]" />
        </Card>

        <Card
          title="Doações de qualquer valor"
          description="Sua generosidade é o que nos permite continuar fazendo a diferença."
        >
          <PiHandHeartFill className="text-[52px]" />
        </Card>
      </section>

      <section className="py-36 md:py-24 w-full flex items-center justify-center flex-col flex-1 text-primary-500 bg-primary-50">
        <FaPix className="text-[72px] md:text-[120px] mb-4" />
        <h1 className="text-4xl md:text-5xl font-semibold text-center">
          Utilizamos PIX
        </h1>
      </section>

      <section
        id="campaing"
        className="w-full flex items-center justify-center flex-col flex-1 text-primary-500 bg-primary-50"
      >
        <h1 className="text-3xl text-center font-semibold">
          Contribua para uma campanha
        </h1>
        {data ? (
          <CardRender campaigns={data.data.campaigns} />
        ) : (
          <h2 className="my-6 h-10 w-10 rounded-full border-dashed border-b-2 border-primary-500 animate-spin ease-in-out transition-all duration-500"></h2>
        )}
      </section>

      <section
        id="contact"
        className="bg-primary-500 w-full flex flex-col items-center justify-center py-10 px-4 md:px-[12%] text-primary-50"
      >
        <div className="gap-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl text-center font-semibold">Fale Conosco</h1>
          <p className="text-base text-center">
            Estamos aqui para ouvir você! Entre em contato conosco para
            esclarecer dúvidas, compartilhar sugestões ou relatar qualquer
            problema. Sua opinião é importante para nós.
          </p>
        </div>
        <FormRender />
      </section>

      <section
        id="about"
        className="w-full flex flex-col items-center justify-center py-10 px-4 md:px-[10%] lg:px-[16%] bg-primary-50 text-primary-500"
      >
        <div className="gap-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl text-center font-semibold">Sobre Nós</h1>
          <p className="text-base text-center">
            O &apos;Doe Aqui&apos; é uma instituição sem fins lucrativos
            dedicada a unir quem precisa com quem pode ajudar. Junte-se a nós e
            faça parte deste movimento inspirador.
          </p>
        </div>
      </section>

      <section
        id="about"
        className="w-full flex flex-col items-center justify-center py-10 px-4 md:px-[10%] lg:px-[16%] bg-primary-50 text-primary-500"
      >
        <div className="gap-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl text-center font-semibold">Equipe</h1>
        </div>

        <div className="flex flex-wrap items-center justify-center w-full px-5 py-8 gap-4 mb-28">
          <TeamCard
            name="Bruno Wanderson"
            image="/member-1.png"
            linkedin="https://www.linkedin.com/in/bruno-wanderson/"
            github="https://github.com/brunowanderson7"
          />

          <TeamCard
            name="Filipe Nascimento"
            image="/member-2.png"
            linkedin="https://www.linkedin.com/in/filipesnascimento/"
            github="https://github.com/FilipeFlip"
          />

          <TeamCard
            name="Renan Gabriel"
            image="/member-3.png"
            linkedin="https://www.linkedin.com/in/renansilva15/"
            github="https://github.com/renansilva15"
          />
        </div>
      </section>

      {/* <QRCodeComponent qrCodeData={qrCodeData} /> */}
      <footer className="bg-primary-500 w-full p-6"></footer>
    </main>
  )
}
