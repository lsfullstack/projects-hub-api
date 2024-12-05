import { prisma } from '@/lib/prisma'
import { usersSeed } from './usersSeed'

export async function seed() {
  await usersSeed()
}

seed().then(() => {
  console.log('📝 Database seeded')
  prisma.$disconnect()
})
