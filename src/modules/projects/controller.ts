import { type Request, type Response } from 'express'
import type { ICrudController } from '../../utils/crudRoutes.js'
import type { ProjectsService } from './service.js'

export class ProjectsController implements ICrudController {
  private projectsService: ProjectsService

  constructor(projectsService: ProjectsService) {
    this.projectsService = projectsService
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    const result = await this.projectsService.getAll()
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const result = await this.projectsService.getById(Number(id))
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { title, shortDescription, highlights, type, link, stacksIds } =
      req.body
    if (!title || !shortDescription || !highlights || !type || !link) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const result = await this.projectsService.create({
      title,
      shortDescription,
      highlights,
      type,
      link,
      stacksIds,
    })

    if (result.ok) {
      return res.status(201).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { title, shortDescription, highlights, type, link, stacksIds } =
      req.body

    if (!title || !shortDescription || !highlights || !type || !link) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const result = await this.projectsService.update(Number(id), {
      title,
      shortDescription,
      highlights,
      type,
      link,
      stacksIds,
    })

    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const result = await this.projectsService.delete(Number(id))
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }
}
