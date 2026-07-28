import { type Request, type Response } from 'express'
import type { ICrudController } from '../../utils/crudRoutes.js'
import type { StackService } from './service.js'

export class StackController implements ICrudController {
  private stackService: StackService

  constructor(stackService: StackService) {
    this.stackService = stackService
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    const result = await this.stackService.getAll()
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const result = await this.stackService.getById(Number(id))
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, icon } = req.body
    if (!name || !icon) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const result = await this.stackService.create({ name, icon })
    if (result.ok) {
      return res.status(201).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, icon } = req.body

    if (!name || !icon) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    const result = await this.stackService.update(Number(id), { name, icon })
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const result = await this.stackService.delete(Number(id))
    if (result.ok) {
      return res.status(200).json(result.value)
    }
    return res.status(500).json({ error: result.error })
  }
}
