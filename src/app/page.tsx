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
import { TeamCard } from '@/components/TeamCard/TeamCard'

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
      <section
        id="home"
        className="w-full min-h-screen flex flex-col items-center justify-start relative"
      >
        <Navbar.Root>
          <Navbar.Logo />
          <Navbar.Content>
            <Navbar.Item title="Inicio" href="#home" active={true} />
            <Navbar.Item title="Campanhas" href="#campaing" />
            <Navbar.Item title="Contato" href="#contact" />
            <Navbar.Item title="Sobre" href="#about" />
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

      <section
        id="campaing"
        className="w-full flex items-center justify-center flex-col flex-1 text-primary-500 bg-primary-50"
      >
        <h1 className="text-3xl text-center font-semibold">
          Contribua para uma campanha
        </h1>
        <div className="flex flex-col md:grid md:grid-cols-3 w-full px-5 py-8 gap-4 mb-28">
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
        <form
          action=""
          className="w-full flex flex-col items-center justify-center px-4 py-4 md:px-[10%] lg:px-[16%] text-primary-50 gap-2"
        >
          <div className="flex flex-col items-start justify-start w-full">
            <h3>Nome</h3>
            <input
              type="text"
              placeholder='Ex: "João da Silva"'
              className="h-12 w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1"
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col items-start justify-start w-full">
              <h3>Email</h3>
              <input
                type="email"
                placeholder='Ex: "exemple@gmail.com"'
                className="h-12 w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full">
              <h3>Telefone</h3>
              <input
                type="tel"
                placeholder='Ex: "(99) 99999-9999"'
                className="h-12 w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <h3>Mensagen</h3>
            <textarea className="h-52 w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1" />
          </div>
          <div className="flex flex-col items-start justify-start w-full">
            <button className="flex items-center justify-center gap-3 px-6 h-12 rounded-lg text-center bg-primary-50 w-full">
              <span className="text-base text-primary-500 font-semibold">
                Enviar
              </span>
            </button>
          </div>
        </form>
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
