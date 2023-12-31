import Link from 'next/link'

interface NavbarItemProps {
  title: string
  href: string
  active?: boolean
}

export const NavbarItem = ({ title, href, active }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className={`${
        active && 'underline'
      } transition-all duration-200 hover:text-primary-200`}
    >
      {title}
    </Link>
  )
}

export default NavbarItem
