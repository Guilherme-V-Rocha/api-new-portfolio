import jwt, { type SignOptions } from 'jsonwebtoken'

export interface UserPayload {
  id: string
  email: string
}

export interface UserPayload {
  id: string
  email: string
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('A variável de ambiente JWT_SECRET não está definida!')
  }
  return secret
}

// export function verifyToken(token: string): UserPayload {
//   return jwt.verify(token, getSecret()) as unknown as UserPayload
// }

export function verifyToken(token: string): UserPayload {
  const secret = getSecret()
  console.log('verifyToken - secret usado:', secret.substring(0, 5) + '...')
  console.log('verifyToken - token recebido:', token.substring(0, 30) + '...')

  try {
    const decoded = jwt.verify(token, secret)
    console.log('verifyToken - decoded:', decoded)
    return decoded as unknown as UserPayload
  } catch (err: any) {
    console.log('verifyToken - ERRO:', err.message)
    throw err
  }
}

export function generateToken(payload: UserPayload): string {
  const expiresIn = process.env.EXPIRES_IN || '1h'
  const options: SignOptions = {}
  if (expiresIn) {
    options.expiresIn = expiresIn as any
  }
  return jwt.sign(payload, getSecret(), options)
}
