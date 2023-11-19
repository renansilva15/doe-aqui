import QRCodeComponent from '@/components/QRCode'
import { Navbar } from '@/components/navbar'

export default function Home() {
  const qrCodeData =
    '00020126360014BR.GOV.BCB.PIX0114+558999430173852040000530398654040.105802BR5904null6004null62440506ASD12350300017BR.GOV.BCB.BRCODE01051.0.06304A476'

  return (
    <main className="bg-white w-full min-h-screen flex flex-col items-center justify-start">
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
      <QRCodeComponent qrCodeData={qrCodeData} />
    </main>
  )
}
