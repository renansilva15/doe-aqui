'use client'

// import QRCodeComponent from '@/components/QRCode'
import Image from 'next/image'
import { FaHeart } from 'react-icons/fa'
import { LuHeartHandshake } from 'react-icons/lu'
import { PiHandHeartFill } from 'react-icons/pi'
import { FaPix } from 'react-icons/fa6'

import bg from './../../public/bg.webp'
import Card from '@/components/Card/Card'
import Overlay from '@/components/Overlay/Overlay'
import { Navbar } from '@/components/navbar'
import { CampaingCard } from '@/components/CampaingCard/CampaingCard'

const data = {
  title: 'Ajude Vader a recuperar a estrela da morte',
  user: 'Darth Vader',
  description:
    'A galáxia precisa de sua ajuda AGORA para reconstruir a Estrela da Morte. Com sua contribuição, podemos trazer de volta a estação que mantinha a ordem.',
  image: '/img-sample.jpg',
  goal: 1000000,
  raised: 590085,
}

export default function Home() {
  // const qrCodeData =
  //   '00020126360014BR.GOV.BCB.PIX0114+558999430173852040000530398654040.105802BR5904null6004null62440506ASD12350300017BR.GOV.BCB.BRCODE01051.0.06304A476'

  return (
    <main className="w-full flex flex-col items-center justify-start relative">
      <section className="w-full min-h-screen flex flex-col items-center justify-start relative">
        <Navbar.Root>
          <Navbar.Logo />
          <Navbar.Content>
            <Navbar.Item title="Inicio" href="/" active={true} />
            <Navbar.Item title="Campanhas" href="/" />
            <Navbar.Item title="Contato" href="/" />
            <Navbar.Item title="Sobre" href="/" />
            <Navbar.Divider />
            <Navbar.Item title="Cadastre-se" href="/" />
            <Navbar.Item title="Entrar" href="/" />
          </Navbar.Content>
        </Navbar.Root>

        <Overlay />
        <Image
          src={bg}
          alt="bg"
          fill
          objectFit="cover"
          className="-z-20 absolute"
        />

        <div className="w-full min-h-full gap-4 flex flex-col flex-1 items-center justify-center -mt-16">
          <h1 className="text-3xl text-center font-semibold text-primary-50">
            Dê vida à sua causa <br /> Comece sua campanha hoje mesmo!
          </h1>
          <button className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg text-center bg-primary-500">
            <FaHeart className="text-2xl text-primary-50" />
            <span className="text-base text-primary-50 font-semibold">
              Criar minha campanha
            </span>
          </button>
        </div>
      </section>

      <section className="w-full flex flex-col md:grid md:grid-cols-3 px-5 py-8 gap-4 bg-primary-50">
        <Card
          title="Campanhas cadastradas"
          description="Inspire-se e contribua para criar mudanças significativas."
        >
          <span className="text-[52px] leading-none">665</span>
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

      <section className="py-36 w-full flex items-center justify-center flex-col flex-1 text-primary-500 bg-primary-50">
        <FaPix className="text-[120px]" />
        <h1 className="text-5xl font-semibold text-center">Utilizamos PIX</h1>
      </section>

      <section className="w-full flex items-center justify-center flex-col flex-1 text-primary-500 bg-primary-50">
        <h1 className="text-3xl text-center font-semibold">
          Contribua para uma campanha
        </h1>
        <div className="flex flex-col md:grid md:grid-cols-3 w-full px-5 py-8 gap-4">
          <CampaingCard
            title={data.title}
            description={data.description}
            image={data.image}
            goal={data.goal}
            raised={data.raised}
            user={data.user}
          />
          <CampaingCard
            title={data.title}
            description={data.description}
            image={data.image}
            goal={data.goal}
            raised={data.raised}
            user={data.user}
          />
          <CampaingCard
            title={data.title}
            description={data.description}
            image={data.image}
            goal={data.goal}
            raised={data.raised}
            user={data.user}
          />
          <CampaingCard
            title={data.title}
            description={data.description}
            image={data.image}
            goal={data.goal}
            raised={data.raised}
            user={data.user}
          />
        </div>
      </section>

      {/* <QRCodeComponent qrCodeData={qrCodeData} /> */}
    </main>
  )
}
