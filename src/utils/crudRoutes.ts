import { type Request, type Response, Router } from 'express'

export interface ICrudController {
  getAll(req: Request, res: Response): Promise<Response>
  getById(req: Request, res: Response): Promise<Response>
  create(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
}

export function crudRoutes(
  router: Router,
  controller: ICrudController,
  middlewares: { create?: any[]; update?: any[] } = {},
) {
  router.get('/', ...(middlewares.update || []), (req, res) =>
    controller.getAll(req, res),
  )
  router.get('/:id', ...(middlewares.update || []), (req, res) =>
    controller.getById(req, res),
  )

  router.post('/', ...(middlewares.create || []), (req, res) =>
    controller.create(req, res),
  )
  router.put('/:id', ...(middlewares.update || []), (req, res) =>
    controller.update(req, res),
  )

  router.delete('/:id', ...(middlewares.update || []), (req, res) =>
    controller.delete(req, res),
  )
}
