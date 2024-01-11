type InputType = 'text' | 'password' | 'email' | 'tel' | 'number'

interface InputProps {
  type: InputType
  label: string
  placeholder: string
  idName: string

  value?: string
}

export const Input = ({
  type,
  label,
  placeholder,
  idName,
  value,
}: InputProps) => {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <h3>{label}</h3>
      <input
        id={idName}
        name={idName}
        type={type}
        {...(type === 'number' && { step: 'any' })}
        placeholder={placeholder}
        value={value}
        className="h-12 w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1"
      />
    </div>
  )
}
export default Input
