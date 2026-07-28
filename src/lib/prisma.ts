import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client.js'

const connectionString = `${process.env.DATABASE_URL}`
if (!connectionString) {
  throw new Error('The DATABASE_URL environment variable is not set.!')
}
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export const initializeDatabase = async () => {
  try {
    await prisma.$connect()
    console.log('Connected to the database successfully!')
  } catch (error) {
    console.error('Error connecting to the database:', error)
    process.exit(1)
  }
}

export { prisma }
