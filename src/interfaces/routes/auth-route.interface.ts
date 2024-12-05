import { User } from '@prisma/client'

export interface AuthLoginServiceRequest {
  email: string
  password: string
}

export interface AuthLoginServiceResponse {
  user: User
}
