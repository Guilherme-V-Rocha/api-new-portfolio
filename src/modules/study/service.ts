import { prisma } from '../../lib/prisma.js'
import { Result } from '../../utils/result.js'

interface StudyData {
  title: string
  description: string
}

export class StudyService {
  async getAll() {
    try {
      const studies = await prisma.study.findMany()
      return Result.ok(studies)
    } catch {
      return Result.err(new Error('Failed to fetch studies'))
    }
  }

  async getById(id: number) {
    try {
      const study = await prisma.study.findUnique({ where: { id } })
      if (!study) {
        return Result.err(new Error('Study not found'))
      }
      return Result.ok(study)
    } catch {
      return Result.err(new Error('Failed to fetch study'))
    }
  }

  async create(data: StudyData) {
    try {
      const newStudy = await prisma.study.create({ data })
      return Result.ok(newStudy)
    } catch {
      return Result.err(new Error('Failed to create study'))
    }
  }

  async update(id: number, data: StudyData) {
    try {
      const updatedStudy = await prisma.study.update({
        where: { id },
        data,
      })
      return Result.ok(updatedStudy)
    } catch {
      return Result.err(new Error('Failed to update study'))
    }
  }

  async delete(id: number) {
    try {
      const deletedStudy = await prisma.study.delete({ where: { id } })
      return Result.ok(deletedStudy)
    } catch {
      return Result.err(new Error('Failed to delete study'))
    }
  }
}
