import jwt, { type SignOptions } from 'jsonwebtoken'

export interface UserPayload {
  id: string
  email: string
}

const secret = process.env.JWT_SECRET
const EXPIRES_IN = process.env.EXPIRES_IN || '1h'

if (!secret) {
  throw new Error('A variável de ambiente JWT_SECRET não está definida!')
}

const JWT_SECRET: string = secret

export function verifyToken(token: string): UserPayload {
  return jwt.verify(token, JWT_SECRET) as unknown as UserPayload
}

export function generateToken(payload: UserPayload): string {
  const options: SignOptions = {}
  if (EXPIRES_IN) {
    options.expiresIn = EXPIRES_IN as any
  }
  return jwt.sign(payload, JWT_SECRET, options)
}
