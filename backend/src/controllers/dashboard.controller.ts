import express, { Request, Response } from 'express'
import AuthMiddleware from '../middleware/auth.middleware'

class DashboardController {
  public path = '/dashboard'
  public router = express.Router()
  private authMiddleware

  constructor() {
    this.authMiddleware = new AuthMiddleware()
    this.initRoutes()
  }

  private initRoutes() {
    // All routes require valid cognito token
    this.router.use(this.authMiddleware.verifyToken)
    this.router.get('/', this.dashboard)
  }

  dashboard(req: Request, res: Response) {
    res.json({
      status: 'success',
      data: { message: 'Welcome to your private dashboard!' },
    })
  }
}

export default DashboardController
