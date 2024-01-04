import { ReactNode } from 'react'

type ButtonStyle = 'PRIMARY' | 'SECONDARY'
type ButtonWidth = 'AUTO' | 'MAX'

interface ButtonProps {
  style: ButtonStyle
  width: ButtonWidth
  title: string
  children?: ReactNode
  action?: () => void
}

export const Button = ({
  style,
  width,
  title,
  children,
  action,
}: ButtonProps) => {
  return (
    <button
      onClick={action}
      className={`${
        style === 'PRIMARY'
          ? 'bg-primary-500 text-primary-50'
          : 'bg-primary-50 text-primary-500'
      } 
      ${
        width === 'MAX' ? 'w-full' : ' px-6'
      } flex items-center justify-center gap-3 py-3 rounded-lg text-center hover:scale-105 transition-all duration-200`}
    >
      {children}
      <span className="text-base font-semibold">{title}</span>
    </button>
  )
}
export default Button
