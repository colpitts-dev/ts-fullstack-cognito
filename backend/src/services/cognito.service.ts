import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider'
import crypto from 'crypto'

import { awsCognitoConfig } from '../config/aws'

class CognitoService {
  private cognitoIdentity
  private config = {
    region: awsCognitoConfig.region,
  }
  private secretHash = awsCognitoConfig.secret
  private clientId = awsCognitoConfig.client

  constructor() {
    this.cognitoIdentity = new CognitoIdentityProvider(this.config)
  }

  public async signInAccount(
    username: string,
    password: string,
  ): Promise<boolean> {
    try {
      const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: this.clientId,
        AuthParameters: {
          USERNAME: username,
          PASSWORD: password,
          SECRET_HASH: this.generateHash(username),
        },
      }

      const data = await this.cognitoIdentity.initiateAuth(params)

      console.log({ data })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  public async signUpAccount(
    username: string,
    password: string,
    userAttr: { Name: string; Value: string }[],
  ) {
    try {
      const params = {
        ClientId: this.clientId,
        Password: password,
        Username: username,
        SecretHash: this.generateHash(username),
        UserAttributes: userAttr,
      }
      const data = await this.cognitoIdentity.signUp(params)
      console.log({ data })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  public async verifyAccount(username: string, code: string): Promise<boolean> {
    const params = {
      ClientId: this.clientId,
      ConfirmationCode: code,
      SecretHash: this.generateHash(username),
      Username: username,
    }

    try {
      const data = await this.cognitoIdentity.confirmSignUp(params)
      console.log({ data })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  private generateHash(username: string): string {
    return crypto
      .createHmac('SHA256', this.secretHash)
      .update(username + this.clientId)
      .digest('base64')
  }
}

export default CognitoService
