'use client'

import { IoClose } from 'react-icons/io5'
import { FormEvent, useState } from 'react'
import QRCode from 'qrcode.react'

import Input from '../Input/Input'
import Button from '../Button/Button'
import Loading from '../Loading/Loading'

interface ModalDonateProps {
  close: () => void
  id: string
}

export const ModalDonate = ({ close, id }: ModalDonateProps) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const [pix, setPix] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

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
    setLoading(false)
  }

  async function handleProcessTransaction(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    const id = formData.get('id-donate')?.toString() ?? ''

    if (id === '') {
      console.log('insira o identificador')
      alert('insira o identificador')
    } else {
      const res = await fetch(`${url}/api/pix/process-transaction/${id}`, {
        method: 'POST',
      })

      const data = await res.json()
      if (data.error) {
        console.log(data.error)
        alert(data.error)
      } else {
        alert('Doação realizada com sucesso!')
        close()
      }
    }
    setLoading(false)
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-primary-900/30 flex">
      <div className="m-[8%] flex-1 bg-primary-900 gap-3 flex flex-col items-center justify-center px-5 py-16 text-center text-primary-50 relative">
        {pix ? (
          <>
            <div className="bg-white p-3 flex items-center justify-center">
              <QRCode value={pix} />
            </div>
            <div className="pt-4 gap-3 flex flex-col items-center justify-center text-centeremus ">
              <h3>
                Aponte a câmera do seu celular para o QR Code e faça o pagamento
              </h3>

              <form
                onSubmit={handleProcessTransaction}
                className="gap-3 pt-3 flex flex-col items-center justify-center md:items-start md:justify-start max-w-[480px] border-t border-primary-50"
              >
                <h3 className="text-xs">
                  Nos ajude a manter um controle melhor sobre cada doação, ao
                  fazer o pagamento insira o identificador que apareceno
                  comprovante no campo abaixo, e lembrem-se,{' '}
                  <span className="uppercase">
                    "Vocês são os verdadeiros Heróis"
                  </span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label=""
                    placeholder="Ex: 0021"
                    type="number"
                    idName="id-donate"
                  />
                  <Button base="PRIMARY" title="OK" width="MAX" />
                </div>
              </form>
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

      {loading && <Loading />}
    </div>
  )
}
