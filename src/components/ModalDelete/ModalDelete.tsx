'use cliente'

import { FaX } from 'react-icons/fa6'
import { useState } from 'react'

import Button from '../Button/Button'
import Loading from '../Loading/Loading'

interface ModalDeleteProps {
  id: string
  action: () => void
}

export const ModalDelete = ({ id, action }: ModalDeleteProps) => {
  const url = process.env.NEXT_PUBLIC_BASE_URL
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    setLoading(true)
    const res = await fetch(`${url}/api/campaign/${id}`, {
      method: 'DELETE',
    })

    const resJson = await res.json()
    if (resJson.status === 'success') {
      setLoading(false)
      alert('Campanha excluída com sucesso!')
      action()
    } else {
      alert('Erro ao excluir campanha')
      setLoading(false)
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-primary-900/20 flex items-center justify-center md:p-[20%] text-primary-50">
      <div className="w-full h-screen flex flex-col items-center justify-center relative  bg-primary-900 gap-4">
        <h1 className="text-2xl text-center mb-4">
          Deseja excluir esta campanha?
        </h1>
        <div className="w-48 gap-3 grid grid-cols-2">
          <Button base="DANGER" title="Não" width="MAX" onClick={action} />
          <Button
            base="PRIMARY"
            title="Sim"
            width="MAX"
            onClick={handleDelete}
          />
        </div>

        <button className="text-2xl absolute left-2 top-2" onClick={action}>
          <FaX />
        </button>
      </div>
      {loading && <Loading />}
    </div>
  )
}
