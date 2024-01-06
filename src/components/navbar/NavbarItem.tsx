'use client'

import { useRouter } from 'next/navigation'

interface NavbarItemProps {
  title: string
  href: string
  action?: boolean
}

export const NavbarItem = ({ title, href, action }: NavbarItemProps) => {
  const router = useRouter()
  async function handleLogout() {
    const url = process.env.NEXT_PUBLIC_BASE_URL
    await fetch(`${url}/api/auth/logout`, {
      method: 'POST',
    })
  }

  return (
    <button
      onClick={() => {
        if (action) {
          handleLogout()
        } else {
          router.push(href)
        }
      }}
      className={`transition-all duration-200 hover:text-primary-200`}
    >
      {title}
    </button>
  )
}

export default NavbarItem
