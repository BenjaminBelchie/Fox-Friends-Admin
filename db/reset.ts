import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.productTags.deleteMany({});
  await prisma.siteConfig.deleteMany({});
}

main()
  .then(async () => {
    console.log('Database Reset Successfully 😀');
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
