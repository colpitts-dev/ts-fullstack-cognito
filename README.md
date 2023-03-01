# Web App Starter

An open source fullstack TypeScript project that leverages AWS Cognito for authentication.

## Features

- AWS Infrastructure as code using Terraform
  - AWS Cognito User Pools for Authentication
- React client to authenticate directly with AWS Cognito
- Express server with AWS Cognito service and auth middleware

### Creating test accounts

Using AWS CLI:

```
aws cognito-idp admin-create-user  --user-pool-id "AWS_USER_POOL_ID"  --username "test-user-name"
aws cognito-idp admin-set-user-password --user-pool-id "AWS_USER_POOL_ID" --username "test-user-name" --password 'Password123!' --permanent
```

### Creating accounts

Using backend service:

```
curl --request POST \
  --url http://localhost:3333/auth/signup \
  --header 'Content-Type: application/json' \
  --data '{
	"username": "johndoe",
	"email": "john.doe@example.com",
	"name": "John",
	"family_name": "Doe",
	"password": "Password123!",
	"birthdate": "1979-01-01",
	"phone": "18005551234"
}'
```
