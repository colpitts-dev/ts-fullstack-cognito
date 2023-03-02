import dotenv from 'dotenv'

const envConfig = dotenv.config()

export const initAppEnv = () => {
  if (envConfig.error) {
    throw envConfig.error
  }
}

export const config = {
  port: parseInt(process.env.PORT || '3333', 10),
  aws: {
    cognito: {
      region: process.env.AWS_COGNITO_REGION || 'AWS_COGNITO_REGION',
      poolId: process.env.AWS_COGNITO_POOLID || 'AWS_COGNITO_POOLID',
      client: process.env.AWS_COGNITO_CLIENT || 'AWS_COGNITO_CLIENT',
      secret: process.env.AWS_COGNITO_SECRET || 'AWS_COGNITO_SECRET',
    },
  },
}
