import { prisma } from '@/lib/prisma'

export async function seed() {}

seed().then(() => {
  console.log('📝 Database seeded')
  prisma.$disconnect()
})
