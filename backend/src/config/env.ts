import dotenv from 'dotenv'

const envConfig = dotenv.config()

export const initAppEnv = () => {
  if (envConfig.error) {
    throw envConfig.error
  }
}

export const config = {
  port: parseInt(process.env.PORT || '3333', 10),
}
