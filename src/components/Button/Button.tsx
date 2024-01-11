import { ReactNode } from 'react'

type ButtonStyle = 'PRIMARY' | 'SECONDARY' | 'OUTLINED' | 'DANGER'
type ButtonWidth = 'AUTO' | 'MAX'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  base: ButtonStyle
  width: ButtonWidth
  title: string
  children?: ReactNode
  action?: () => void
}

export const Button = ({
  base,
  width,
  title,
  children,

  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`${
        base === 'PRIMARY'
          ? 'bg-primary-500 text-primary-50'
          : base === 'SECONDARY'
          ? 'bg-primary-50 text-primary-500'
          : base === 'DANGER'
          ? 'bg-red-500 text-primary-50'
          : 'bg-transparent text-primary-50 border-primary-50 border-2'
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
