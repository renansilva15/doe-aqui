import { NextApiRequest } from 'next'

export function getCookies(req: NextApiRequest) {
  const cookiesHeader = req.headers.cookie || ''

  const cookies = cookiesHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    acc[key] = decodeURIComponent(value)
    return acc
  }, {} as any)

  return cookies
}
