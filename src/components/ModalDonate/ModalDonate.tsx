'use client'

import { IoClose } from 'react-icons/io5'
import { useState } from 'react'
import QRCodeComponent from '@/components/QRCode'

import Input from '../Input/Input'
import Button from '../Button/Button'

interface ModalDonateProps {
  close: () => void
  id: string
}

export const ModalDonate = ({ close, id }: ModalDonateProps) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const [pix, setPix] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const value = formData.get('value-donate')?.toString() ?? ''

    console.log(value)

    if (value === '') {
      console.log('insira um valor')
      alert('insira um valor')
    } else {
      if (parseFloat(value) <= 0) {
        alert('O valor deve ser maior que 0')
      } else {
        const res = await fetch(`${url}/api/pix`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            campaignId: id,
            amount: value,
          }),
        })

        const data = await res.json()
        if (data.error) {
          console.log(data.error)
          alert(data.error)
        } else {
          const { pixCode } = data.data

          console.log(pixCode)
          setPix(data.data.pixCode)
        }
      }
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-primary-900/30 flex">
      <div className="m-[10%] flex-1 bg-primary-900 gap-3 flex flex-col items-center justify-center px-5 py-16 text-center text-primary-50 relative">
        {pix ? (
          <>
            <div className="bg-white p-3 flex items-center justify-center">
              <QRCodeComponent value={pix} />
            </div>
            <div className="pt-4 flex flex-col items-center justify-center text-center">
              <h3>
                Aponte a câmera do seu celular para o QR Code e faça o pagamento
              </h3>
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="gap-3 flex flex-col items-center justify-center md:items-start md:justify-start"
          >
            <h1>INSIRA O VALOR DA SUA DOAÇÃO</h1>
            <Input
              label=""
              placeholder="Ex: 20"
              type="number"
              idName="value-donate"
            />
            <Button base="PRIMARY" title="DOAR" width="MAX" />
          </form>
        )}

        <div className="absolute top-2 left-2" onClick={close}>
          <IoClose className="text-2xl hover:text-primary-400 hover:cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
