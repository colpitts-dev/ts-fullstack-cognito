import express, { Request, Response } from 'express'
import { body, ValidationChain, validationResult } from 'express-validator'

import CognitoService from '../services/cognito.service'

class AuthController {
  public path = '/auth'
  public router = express.Router()

  constructor() {
    this.initRoutes()
  }

  private validateBody(type: string) {
    let validationResults: ValidationChain[] = []
    switch (type) {
      case 'signIn':
        validationResults = [
          body('username').notEmpty().isLength({ min: 6 }),
          body('password').isString().isLength({ min: 8 }),
        ]
        break
      case 'signUp':
        validationResults = [
          body('username').notEmpty().isLength({ min: 6 }),
          body('email').notEmpty().normalizeEmail().isEmail(),
          body('password').isString().isLength({ min: 8 }),
          body('birthdate').exists().isISO8601(),
          body('name').notEmpty().isString(),
          body('family_name').notEmpty().isString(),
        ]
        break
      case 'verify':
        validationResults = [
          body('username').notEmpty().isLength({ min: 6 }),
          body('code').notEmpty().isLength({ min: 6, max: 6 }),
        ]
    }
    return validationResults
  }

  private initRoutes() {
    this.router.post('/signin', this.validateBody('signIn'), this.signIn)
    this.router.post('/signup', this.validateBody('signUp'), this.signUp)
    this.router.post('/verify', this.validateBody('verify'), this.verify)
  }

  signIn(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() })
    }

    const { username, password } = req.body
    const cognito = new CognitoService()

    cognito.signInAccount(username, password).then(success => {
      if (success) {
        res.status(200).json({ status: 'success' })
      } else {
        res.status(500).end()
      }
    })
  }

  signUp(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() })
    }
    const { username, password, email, name, family_name, birthdate } = req.body
    const userAttr = []
    userAttr.push({ Name: 'email', Value: email })
    userAttr.push({ Name: 'name', Value: name })
    userAttr.push({ Name: 'family_name', Value: family_name })
    userAttr.push({ Name: 'birthdate', Value: birthdate })

    const cognito = new CognitoService()
    cognito.signUpAccount(username, password, userAttr).then(success => {
      if (success) {
        res.status(200).json({ status: 'success' })
      } else {
        res.status(500).end()
      }
    })
  }

  verify(req: Request, res: Response) {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() })
    }

    const { username, code } = req.body
    const cognito = new CognitoService()

    cognito.verifyAccount(username, code).then(success => {
      if (success) {
        res.status(200).json({ status: 'success' })
      } else {
        res.status(500).end()
      }
    })
  }
}

export default AuthController
