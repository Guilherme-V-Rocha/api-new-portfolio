import { prisma } from '../../lib/prisma.js'
import { Result } from '../../utils/result.js'

interface ProjectData {
  title: string
  shortDescription: string
  highlights: Array<string>
  type: string
  link: string
  stacksIds: Array<number>
}

export class ProjectsService {
  async getAll() {
    try {
      const projects = await prisma.project.findMany({
        include: {
          stacks: true,
        },
      })
      return Result.ok(projects)
    } catch {
      return Result.err(new Error('Failed to fetch projects'))
    }
  }

  async getById(id: number) {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
        include: {
          stacks: true,
        },
      })
      if (!project) {
        return Result.err(new Error('Project not found'))
      }
      return Result.ok(project)
    } catch {
      return Result.err(new Error('Failed to fetch project'))
    }
  }

  async create(data: ProjectData) {
    const { stacksIds, ...projectData } = data

    try {
      const newProject = await prisma.project.create({
        data: {
          ...projectData,
          ...(stacksIds && stacksIds.length > 0
            ? {
                stacks: {
                  connect: stacksIds.map((id) => ({ id })),
                },
              }
            : undefined),
        },
        include: {
          stacks: true,
        },
      })
      return Result.ok(newProject)
    } catch {
      return Result.err(new Error('Failed to create project'))
    }
  }

  async update(id: number, data: ProjectData) {
    const { stacksIds, ...projectData } = data
    try {
      const updatedProject = await prisma.project.update({
        where: { id },
        data: {
          ...projectData,
          ...(stacksIds && stacksIds.length > 0
            ? {
                stacks: {
                  connect: stacksIds.map((id) => ({ id })),
                },
              }
            : undefined),
        },
        include: {
          stacks: true,
        },
      })
      return Result.ok(updatedProject)
    } catch {
      return Result.err(new Error('Failed to update project'))
    }
  }

  async delete(id: number) {
    try {
      await prisma.project.delete({
        where: { id },
      })
      return Result.ok({ message: 'Project deleted successfully' })
    } catch {
      return Result.err(new Error('Failed to delete project'))
    }
  }
}
