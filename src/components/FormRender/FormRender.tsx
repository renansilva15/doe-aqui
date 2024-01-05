import Button from '../Button/Button'
import Input from '../Input/Input'

export const FormRender = () => {
  return (
    <form
      action=""
      className="w-full flex flex-col items-center justify-center px-4 py-4 md:px-[10%] lg:px-[16%] text-primary-50 gap-2"
    >
      <Input
        label="Nome"
        placeholder='Ex: "João da Silva"'
        type="text"
        idName="contact-name"
      />

      <div className="grid grid-cols-2 w-full gap-4">
        <Input
          label="Email"
          placeholder='Ex: "exemple@gmail.com"'
          type="email"
          idName="contact-email"
        />
        <Input
          label="Telefone"
          placeholder='Ex: "(99) 99999-9999"'
          type="tel"
          idName="contact-tel"
        />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <h3>Mensagem</h3>
        <textarea
          id="contact-mensage"
          name="contact-mensage"
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