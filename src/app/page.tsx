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
import Chart from 'react-google-charts'

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
          <div className="w-full flex flex-col relative bg-primary-50 shadow-custom rounded-xl overflow-hidden">
            <div className="w-full flex relative">
              <Image
                src={'/img-sample.jpg'}
                alt="card"
                width={500}
                height={500}
                className="w-full h-auto"
              />
              <div className="bg-primary-500 py-2 px-4 text-white text-sm flex flex-col justify-start items-start absolute bottom-2 left-2 right-2">
                <h4>Ajude Vader a reconstruir a estrela da morte</h4>
                <span className="font-light text-[10px]">Darth Vader</span>
              </div>
            </div>
            <p className="text-sm text-primary-500 p-3 text-center font-normal">
              A galáxia precisa de sua ajuda AGORA para reconstruir a Estrela da
              Morte. Com sua contribuição, podemos trazer de volta a estação que
              mantinha a ordem.
            </p>
            <hr className="bg-primary-500 mx-2 h-0.5" />
            <div className="grid grid-cols-2">
              <div className="w-full flex flex-col items-center justify-center gap-2 text-primary-500 py-3">
                <div className="flex flex-col">
                  <h4 className="font-semibold">Arrecadado</h4>
                  <h4>R$ 45.522,01</h4>
                </div>
                <div className="flex flex-col">
                  <h4 className="font-semibold">Meta</h4>
                  <h4>R$ 50.000,00</h4>
                </div>
              </div>

              <div>
                <Chart
                  chartType="PieChart"
                  width="100%"
                  height="100%"
                  data={[
                    ['Meta', 'Arrecadado'],
                    ['', 45.522],
                    ['', 4.478],
                  ]}
                  options={{
                    pieHole: 0.8,
                    is3D: false,
                    backgroundColor: 'transparent',
                    colors: ['#23b4e7', 'red'],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <QRCodeComponent qrCodeData={qrCodeData} /> */}
    </main>
  )
}
