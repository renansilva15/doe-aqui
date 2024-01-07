import { verifyJWT } from './token'

export async function isTokenValid(token: string) {
  let isTokenValid = true

  try {
    await verifyJWT(token)
  } catch (error) {
    console.log(error)
    isTokenValid = false
  }

  return isTokenValid
}
