import bcrypt from 'bcryptjs'
import { prisma } from '../../lib/prisma.js'
import { generateToken, type UserPayload } from '../../utils/jwt.js'
import { Result } from '../../utils/result.js'

export class LoginService {
  async login(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      })
      if (!user) {
        return Result.err(new Error('User or password invalid.'))
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return Result.err(new Error('User or password invalid.'))
      }

      const payload: UserPayload = {
        id: String(user.id),
        email: user.email,
      }

      const token = generateToken(payload)

      return Result.ok({
        token,
        user: { id: user.id, email: user.email },
      })
    } catch {
      return Result.err(new Error('Failed to login'))
    }
  }

  async register(email: string, password: string) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      })
      if (existingUser) {
        return Result.err(new Error('Email already in use.'))
      }
      const hashedPassword = await bcrypt.hash(password, 8)
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      })
      return Result.ok({
        user: { id: user.id, email: user.email },
      })
    } catch {
      return Result.err(new Error('Failed to register'))
    }
  }

  async deleteAccount(id: string | string[]) {
    try {
      const ids = Array.isArray(id) ? id : [id]
      const parsedIds = ids
        .map((value) => Number(value))
        .filter((value) => !Number.isNaN(value))

      if (parsedIds.length === 0) {
        return Result.err(new Error('Invalid user id'))
      }

      if (parsedIds.length === 1) {
        const idToDelete = parsedIds[0]
        await prisma.user.delete({ where: { id: Number(idToDelete) } })
        return Result.ok({ message: 'Account deleted successfully.' })
      }

      const deleted = await prisma.user.deleteMany({
        where: { id: { in: parsedIds } },
      })
      if (deleted.count === 0) {
        return Result.err(new Error('No accounts found for the provided ids'))
      }

      return Result.ok({
        message: `${deleted.count} accounts deleted successfully.`,
      })
    } catch {
      return Result.err(new Error('Failed to delete account'))
    }
  }
}
