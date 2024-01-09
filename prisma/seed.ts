import { prisma } from '@/lib/prisma'

async function main() {
  await prisma.stats.create({})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
  })
