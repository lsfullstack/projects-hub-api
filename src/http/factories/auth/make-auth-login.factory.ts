import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { AuthLoginService } from '@/services/auth/auth-login.service'

export const makeAuthLoginFactory = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authLoginService = new AuthLoginService(prismaUsersRepository)

  return authLoginService
}
