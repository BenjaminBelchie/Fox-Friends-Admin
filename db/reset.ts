import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const siteConfig: Prisma.SiteConfigCreateArgs = {
  data: {
    heroImage: 'hero.jpg',
    primaryHeroText: 'Artisanal Crochet Goods',
    secondaryHeroText: 'Handmade to Order in the UK',
  },
};

async function main() {
  await prisma.product.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.productImages.deleteMany({});
  await prisma.productTags.deleteMany({});
  await prisma.siteConfig.deleteMany({});
  await prisma.siteConfig.create(siteConfig);
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
