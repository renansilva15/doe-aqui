interface NavbarItemProps {
  title: string
  href: string
  action?: boolean
}

export const NavbarItem = ({ title, href, action }: NavbarItemProps) => {
  function handleLogout() {
    document.cookie =
      'logged-in=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  }
  if (action) {
    handleLogout()
  }

  return (
    <a
      href={href}
      className={`transition-all duration-200 hover:text-primary-200`}
    >
      {title}
    </a>
  )
}

export default NavbarItem
