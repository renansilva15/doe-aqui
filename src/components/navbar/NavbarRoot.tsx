import React, { ReactNode } from 'react'

interface NavbarRootProps {
  children: ReactNode
}

export const NavbarRoot = ({ children }: NavbarRootProps) => {
  return (
    <nav className="bg-primary-500 w-full flex justify-end p-6 relative">
      {children}
    </nav>
  )
}

export default NavbarRoot
