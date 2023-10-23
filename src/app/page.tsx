import QRCodeComponent from '@/components/QRCode'

export default function Home() {
  const qrCodeData =
    '00020126360014BR.GOV.BCB.PIX0114+558999430173852040000530398654040.105802BR5904null6004null62440506ASD12350300017BR.GOV.BCB.BRCODE01051.0.06304A476'

  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between p-24">
      <QRCodeComponent qrCodeData={qrCodeData} />
    </main>
  )
}
