import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'
import { mockUsers } from 'prisma/mocks/users.mock'

export const usersSeed = async () => {
  for (const user of mockUsers) {
    const findByEmail = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    })

    if (!findByEmail) {
      const passwordHash = await hash(user.password, 6)

      await prisma.user.create({
        data: {
          id: user.uuid,
          name: user.name,
          email: user.email,
          password_hash: passwordHash,
        },
      })
    }
  }
}
