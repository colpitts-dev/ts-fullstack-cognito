resource "aws_cognito_user_pool" "pool" {
  name   = "congnito-hyperlocal-dev-user-pool"

  auto_verified_attributes = ["email"]

  verification_message_template {
    default_email_option = "CONFIRM_WITH_CODE"
    email_subject = "Account Confirmation"
    email_message = "Your confirmation code is {####}"
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }
}

resource "aws_cognito_user_pool_client" "app-client" {
  name          = "cognito-user-pool-hyperlocal-dev-client"
  user_pool_id  = aws_cognito_user_pool.pool.id
}

resource "aws_cognito_user_pool_client" "app-server" {
  name          = "cognito-user-pool-hyperlocal-dev-server"
  user_pool_id  = aws_cognito_user_pool.pool.id
  generate_secret     = true
  explicit_auth_flows = ["ALLOW_CUSTOM_AUTH", "ALLOW_ADMIN_USER_PASSWORD_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_PASSWORD_AUTH" ]
}

provider "aws" {
  region = "ca-central-1"
}