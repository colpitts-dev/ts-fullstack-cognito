/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'

import { awsCognitoConfig } from '../config/aws'

// In memory pem store
const pems: { [key: string]: any } = {}

class AuthMiddleware {
  private region = awsCognitoConfig.region
  private userPoolId = awsCognitoConfig.poolId

  constructor() {
    this.init()
  }

  private async init() {
    const URL = `https://cognito-idp.${this.region}.amazonaws.com/${this.userPoolId}/.well-known/jwks.json`

    try {
      const response = await fetch(URL)
      if (response.status !== 200) {
        throw 'request not successful'
      }
      const data = await response.json()
      const { keys } = data

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const key_id = key.kid
        const modulus = key.n
        const exponent = key.e
        const key_type = key.kty
        const jwk = { kty: key_type, n: modulus, e: exponent }
        const pem = jwkToPem(jwk)

        pems[key_id] = pem
      }
    } catch (error) {
      console.info('Could not fetch JWKs')
      console.error(error)
    }
  }

  verifyToken(req: Request, res: Response, next: any) {
    const token = String(req.header('Authorization')).replace('Bearer ', '')
    if (!token) {
      return res.status(401).end()
    }

    const decodeJwt: any = jwt.decode(token, {
      complete: true,
    })
    if (!decodeJwt) {
      return res.status(401).end()
    }

    const kid: string = decodeJwt.header.kid
    const pem = pems[kid]
    if (!pem) {
      return res.status(401).end()
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    jwt.verify(token, pem, (err: any, payload: any) => {
      if (err) {
        return res.status(401).end()
      }
      console.log({ payload })
      next()
    })
  }
}

export default AuthMiddleware
