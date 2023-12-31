'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { IoClose, IoExit, IoMenu } from 'react-icons/io5'

interface NavbarContentProps {
  children: ReactNode
}

export const NavbarContent = ({ children }: NavbarContentProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    window.addEventListener('resize', handleResize)

    // Verificação inicial
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      onClick={() => setIsMobile(!isMobile)}
      className="flex flex-col items-end md:flex md:flex-row md:items-center md:justify-center gap-1 font-semibold text-base text-primary-50 md:gap-3"
    >
      {isMobile ? (
        <IoMenu
          className="text-3xl cursor-pointer md:hidden hover:text-primary-200 transition-all duration-200"
          onClick={() => setIsMobile(!isMobile)}
        />
      ) : (
        <>
          <IoClose
            className="text-3xl cursor-pointer md:hidden mb-2 hover:text-primary-200 transition-all duration-200"
            onClick={() => setIsMobile(!isMobile)}
          />
          {children}
        </>
      )}
    </div>
  )
}

export default NavbarContent
