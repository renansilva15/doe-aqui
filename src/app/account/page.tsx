'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@/components/Button/Button'
import Loading from '@/components/Loading/Loading'
import { Campaign } from '@/components/CardRender/CardRender'
import { MyCampaing } from '@/components/CampaingCard/CampaingCard'

type User = {
  id: string
  name: string
  email: string
}

export default function Account() {
  const url = process.env.NEXT_PUBLIC_BASE_URL

  const [loading, setLoading] = useState(true)
  const [isLogged, setIsLogged] = useState(false)
  const [data, setData] = useState<Campaign[] | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = document.cookie.split(';').some((cookie) => {
      return cookie.trim().startsWith('logged-in=')
    })

    if (isLoggedIn) {
      // O cookie 'logged-in' existe
      console.log('O usuário está logado.')

      if (!user) getUser()
    } else {
      // O cookie 'logged-in' não existe
      console.log('O usuário não está logado.')
      setLoading(false)
      setIsLogged(false)
    }

    async function getUser() {
      setIsLogged(true)

      const res = await fetch(`${url}/api/users/me`)
      const resJson = await res.json()

      if (resJson.status === 'success') {
        console.log(resJson.data.user)
        setUser(resJson.data.user)
      } else {
        console.log(resJson)
        setLoading(false)
      }
    }

    async function getCampaigns(usuario: User) {
      const res = await fetch(`${url}/api/campaign`)
      const resJson = await res.json()

      if (resJson.status === 'success') {
        console.log('Dados puros: ', resJson.data.campaigns)

        const campaigns = resJson.data.campaigns.filter((item: Campaign) => {
          if (item.username === usuario.name) return item
        })

        console.log('Filtrados:', campaigns)
        setData(campaigns)
      }

      setLoading(false)
    }

    if (user) {
      getCampaigns(user)
    }
  }, [user])

  return (
    <main className="w-full h-screen flex flex-col items-center justify-start relative p-4">
      {isLogged && !loading ? (
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl">{user?.name}</h1>
            <h3 className="text-lg">{user?.email}</h3>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="text-lg">Minhas campanhas</h1>
            <div className="flex flex-col md:grid md:grid-cols-3 w-full px-5 py-6 gap-4">
              {data ? (
                <>
                  {data.map((item) => (
                    <MyCampaing
                      id={item.id}
                      key={item.id}
                      title={item.title}
                      user={item.username}
                      description={item.description}
                      goal={parseFloat(item.goal)}
                      raised={parseFloat(item.totalRaised)}
                      pixKey={item.pixKey}
                      image={item.imageUrl}
                    />
                  ))}
                </>
              ) : (
                <h3>Você não possui campanhas cadastradas</h3>
              )}
            </div>
          </div>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <h1>Faça login para acessar suas informações</h1>
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button
              onClick={() => router.push('/')}
              base="PRIMARY"
              title="Inicio"
              width="MAX"
            />
            <Button
              onClick={() => router.push('/auth/login')}
              base="PRIMARY"
              title="Login"
              width="MAX"
            />
          </div>
        </div>
      )}
    </main>
  )
}
