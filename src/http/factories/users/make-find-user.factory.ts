import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { FindUserService } from '@/services/users/find.service'

export const makeFindUserFactory = () => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const findUserService = new FindUserService(prismaUsersRepository)

  return findUserService
}
