import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const siteConfig: Prisma.SiteConfigCreateArgs = {
  data: {
    heroImage: 'hero.jpg',
    primaryHeroText: 'Artisanal Crochet Goods',
    secondaryHeroText: 'Handmade to Order in the UK',
  },
};

const aboutMeData: Prisma.AboutMeDetailsCreateArgs = {
  data: {
    titleText: "Hi, I'm Anna",
    description:
      "Hello, I'm Anna, the creative soul behind the crochet wonders in my cozy corner of the world. Ever since I can remember, crochet has been my greatest passion and my most cherished form of self-expression. As the years went by, I honed my skills, pushing the boundaries of what can be achieved with a simple hook and a skein of yarn. Today, my craft has evolved into something more than just a hobby; it's a labor of love that fills my days with warmth and joy.",
    image: 'about-photo.png',
  },
};

async function main() {
  await prisma.product.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.productImages.deleteMany({});
  await prisma.productTags.deleteMany({});
  await prisma.siteConfig.deleteMany({});
  await prisma.siteConfig.create(siteConfig);
  await prisma.aboutMeDetails.create(aboutMeData);
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
