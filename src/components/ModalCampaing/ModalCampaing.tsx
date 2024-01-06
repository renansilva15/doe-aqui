import React, { ReactNode } from 'react'

interface ModalCampaingProps {
  children: ReactNode
}

export const ModalCampaing = ({ children }: ModalCampaingProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-start justify-start">
      {children}
    </div>
  )
}
export default ModalCampaing
