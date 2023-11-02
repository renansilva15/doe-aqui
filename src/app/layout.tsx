import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '600'] })

export const metadata: Metadata = {
  title: 'Doe Aqui',
  description:
    'Doe Aqui: Cadastre suas campanhas e receba doações via PIX. Ajude causas importantes e arrecade fundos de forma simples e segura. Seja parte da mudança que você deseja ver no mundo.',
  keywords:
    'Doe Aqui, Campanhas, Doações via PIX, Causas, Fundos, Ajuda, Solidariedade',
  robots: 'index, follow',
  authors: [
    { name: 'Bruno Wanderson', url: 'https://github.com/brunowanderson7' },
    { name: 'Filipe Nascimento', url: 'https://github.com/filipeflip' },
    { name: 'Renan Gabriel', url: 'https://github.com/renansilva15' },
  ],
  openGraph: {
    images: './og-image.webp',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://doeaqui.vercel.app/',
    siteName: 'Doe Aqui',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
