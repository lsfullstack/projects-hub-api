import { UsersRepository } from '@/interfaces/repositories/users-repository.interface'
import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  async create(userData: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: userData,
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
