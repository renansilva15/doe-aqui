import Button from '../Button/Button'
import Input from '../Input/Input'

export const FormRender = () => {
  const url = process.env.NEXT_PUBLIC_SHEET_URL || ''

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const datelocale = new Date()
      .toLocaleDateString()
      .toString()
      .replaceAll('/', '_')

    const data = {
      name: formData.get('name')?.toString(),
      email: formData.get('email')?.toString(),
      phone: formData.get('phone')?.toString(),
      date: datelocale,
      message: formData.get('message')?.toString(),
    }

    console.log(data)

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [data],
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  return (
    <form
      id="contact-form"
      name="contact-form"
      onSubmit={handleSubmit}
      className="w-full flex flex-col items-center justify-center px-4 py-4 md:px-[10%] lg:px-[16%] text-primary-50 gap-2"
    >
      <Input
        label="Nome"
        placeholder='Ex: "João da Silva"'
        type="text"
        idName="name"
      />

      <div className="grid grid-cols-2 w-full gap-4">
        <Input
          label="Email"
          placeholder='Ex: "exemple@gmail.com"'
          type="email"
          idName="email"
        />
        <Input
          label="Telefone"
          placeholder='Ex: "(99) 99999-9999"'
          type="tel"
          idName="phone"
        />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <h3>Mensagem</h3>
        <textarea
          id="message"
          name="message"
          className="h-52 w-full text-black rounded-lg bg-primary-50 focus:ring-1 focus:ring-primary-500 pl-1"
        />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <Button width="MAX" base="SECONDARY" title="Enviar"></Button>
      </div>
    </form>
  )
}

export default FormRender
