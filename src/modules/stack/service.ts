import { prisma } from '../../lib/prisma.js'
import { Result } from '../../utils/result.js'

interface StackData {
  name: string
  icon: string
}

export class StackService {
  async getAll() {
    try {
      const stacks = await prisma.stack.findMany()
      return Result.ok(stacks)
    } catch {
      return Result.err(new Error('Failed to fetch stacks'))
    }
  }

  async getById(id: number) {
    try {
      const stack = await prisma.stack.findUnique({ where: { id } })
      if (!stack) {
        return Result.err(new Error('Stack not found'))
      }
      return Result.ok(stack)
    } catch {
      return Result.err(new Error('Failed to fetch stack'))
    }
  }

  async create(data: StackData) {
    try {
      const newStack = await prisma.stack.create({ data })
      return Result.ok(newStack)
    } catch {
      return Result.err(new Error('Failed to create stack'))
    }
  }

  async update(id: number, data: StackData) {
    try {
      const updatedStack = await prisma.stack.update({
        where: { id },
        data,
      })
      return Result.ok(updatedStack)
    } catch {
      return Result.err(new Error('Failed to update stack'))
    }
  }

  async delete(id: number) {
    try {
      const deletedStack = await prisma.stack.delete({ where: { id } })
      return Result.ok(deletedStack)
    } catch {
      return Result.err(new Error('Failed to delete stack'))
    }
  }
}
