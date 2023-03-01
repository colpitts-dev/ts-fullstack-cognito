export const awsCognitoConfig = {
  region: process.env.AWS_COGNITO_REGION || 'ca-central-1',
  poolId: process.env.AWS_COGNITO_POOLID || 'ca-central-1_POOL',
  client: process.env.AWS_COGNITO_CLIENT || 'AWS_COGNITO_CLIENT',
  secret: process.env.AWS_COGNITO_SECRET || 'AWS_COGNITO_SECRET',
}
