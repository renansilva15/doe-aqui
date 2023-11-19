import React, { ReactNode } from 'react'

interface NavbarContentProps {
  children: ReactNode
}

export const NavbarContent = ({ children }: NavbarContentProps) => {
  return (
    <div className="flex items-center justify-center font-semibold text-base text-primary-50 gap-6">
      {children}
    </div>
  )
}

export default NavbarContent
