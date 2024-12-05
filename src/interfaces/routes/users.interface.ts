import { User } from '@prisma/client'

export interface CreateUserServiceRequest {
  name: string
  email: string
  password: string
}

export interface CreateUserServiceResponse {
  user: User
}
