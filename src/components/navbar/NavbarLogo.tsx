import Image from 'next/image'

export const NavbarLogo = () => {
  return (
    <div className="w-[200px] h-[52px] absolute left-6 top-2">
      <Image src="/logo.png" alt="Logo" layout="fill" objectFit="contain" />
    </div>
  )
}

export default NavbarLogo
