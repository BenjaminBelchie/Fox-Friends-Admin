import { Prisma, PrismaClient, Status } from '@prisma/client';
const prisma = new PrismaClient();

const tagIds = {
  HANDMADE_ID: '1eac3928-45d0-11ee-be56-0242ac120002',
  QUALITY_ID: '1eac3c8e-45d0-11ee-be56-0242ac120002',
  ANIMAL_ID: '1eac3e1e-45d0-11ee-be56-0242ac120002',
  CROCHET_ID: '1eac3f54-45d0-11ee-be56-0242ac120002',
};

const tags: Prisma.TagCreateArgs[] = [
  {
    data: {
      id: tagIds.HANDMADE_ID,
      tagName: 'Handmade',
    },
  },
  {
    data: {
      id: tagIds.QUALITY_ID,
      tagName: 'Quality Wool',
    },
  },
  {
    data: {
      id: tagIds.ANIMAL_ID,
      tagName: 'Animal',
    },
  },
  {
    data: {
      id: tagIds.CROCHET_ID,
      tagName: 'Crochet',
    },
  },
];

const products: Prisma.ProductCreateArgs[] = [
  {
    data: {
      title: 'Crochet Panda',
      shortDescription:
        'Each panda is meticulously handcrafted by skilled artisans, ensuring that every piece is unique and one-of-a-kind. Made from soft, high-quality yarn, this crochet panda is irresistibly huggable and soft to the touch, making it a comforting friend for children and a charming decor item for panda-themed rooms.',
      longDescription:
        "Introducing our adorable Handmade Crochet Panda – the perfect companion for panda lovers of all ages! Crafted with love and attention to detail, this charming crochet panda is a delightful blend of cuddliness and creativity. Each panda is meticulously handcrafted by skilled artisans, ensuring that every piece is unique and one-of-a-kind. Made from soft, high-quality yarn, this crochet panda is irresistibly huggable and soft to the touch, making it a comforting friend for children and a charming decor item for panda-themed rooms. With its endearing black and white pattern, expressive eyes, and sweet smile, our Handmade Crochet Panda captures the essence of these beloved creatures in a tangible form. Whether you're searching for a heartwarming gift for a special someone or a delightful addition to your own plush collection, this crochet panda is sure to bring joy and happiness wherever it goes. Not only is this handmade crochet panda a wonderful companion, but it's also an eco-friendly choice. Unlike mass-produced toys, our crochet panda is crafted with sustainability in mind, using natural materials and minimal packaging. It's a thoughtful way to support traditional craftsmanship and reduce your environmental footprint.",
      status: Status.ACTIVE,
      images: {
        create: [
          {
            image: 'test.png',
          },
          {
            image: 'about-photo.png',
            isPrimaryImage: true,
          },
        ],
      },
      price: '50',
      tags: {
        create: [{ tagId: tagIds.HANDMADE_ID }, { tagId: tagIds.ANIMAL_ID }],
      },
    },
  },
  {
    data: {
      title: 'Crochet Bear',
      shortDescription:
        'Each panda is meticulously handcrafted by skilled artisans, ensuring that every piece is unique and one-of-a-kind. Made from soft, high-quality yarn, this crochet panda is irresistibly huggable and soft to the touch, making it a comforting friend for children and a charming decor item for panda-themed rooms.',
      longDescription:
        "Introducing our adorable Handmade Crochet Panda – the perfect companion for panda lovers of all ages! Crafted with love and attention to detail, this charming crochet panda is a delightful blend of cuddliness and creativity. Each panda is meticulously handcrafted by skilled artisans, ensuring that every piece is unique and one-of-a-kind. Made from soft, high-quality yarn, this crochet panda is irresistibly huggable and soft to the touch, making it a comforting friend for children and a charming decor item for panda-themed rooms. With its endearing black and white pattern, expressive eyes, and sweet smile, our Handmade Crochet Panda captures the essence of these beloved creatures in a tangible form. Whether you're searching for a heartwarming gift for a special someone or a delightful addition to your own plush collection, this crochet panda is sure to bring joy and happiness wherever it goes. Not only is this handmade crochet panda a wonderful companion, but it's also an eco-friendly choice. Unlike mass-produced toys, our crochet panda is crafted with sustainability in mind, using natural materials and minimal packaging. It's a thoughtful way to support traditional craftsmanship and reduce your environmental footprint.",
      status: Status.ACTIVE,
      images: {
        create: [
          {
            image: 'hero.jpg',
          },
          {
            image: 'test.png',
            isPrimaryImage: true,
          },
          {
            image: 'about-photo.png',
          },
        ],
      },
      price: '60',
      tags: {
        create: [
          { tagId: tagIds.CROCHET_ID },
          { tagId: tagIds.QUALITY_ID },
          { tagId: tagIds.HANDMADE_ID },
        ],
      },
    },
  },
  {
    data: {
      title: 'Crochet Dino',
      shortDescription:
        'Each panda is meticulously handcrafted by skilled artisans, ensuring that every piece is unique and one-of-a-kind. Made from soft, high-quality yarn, this crochet panda is irresistibly huggable and soft to the touch, making it a comforting friend for children and a charming decor item for panda-themed rooms.',
      longDescription:
        "Introducing our adorable Handmade Crochet Panda – the perfect companion for panda lovers of all ages! Crafted with love and attention to detail, this charming crochet panda is a delightful blend of cuddliness and creativity. Each panda is meticulously handcrafted by skilled artisans, ensuring that every piece is unique and one-of-a-kind. Made from soft, high-quality yarn, this crochet panda is irresistibly huggable and soft to the touch, making it a comforting friend for children and a charming decor item for panda-themed rooms. With its endearing black and white pattern, expressive eyes, and sweet smile, our Handmade Crochet Panda captures the essence of these beloved creatures in a tangible form. Whether you're searching for a heartwarming gift for a special someone or a delightful addition to your own plush collection, this crochet panda is sure to bring joy and happiness wherever it goes. Not only is this handmade crochet panda a wonderful companion, but it's also an eco-friendly choice. Unlike mass-produced toys, our crochet panda is crafted with sustainability in mind, using natural materials and minimal packaging. It's a thoughtful way to support traditional craftsmanship and reduce your environmental footprint.",
      status: Status.ACTIVE,
      images: {
        create: [
          {
            image: 'hero.jpg',
          },
          {
            image: 'about-photo.png',
            isPrimaryImage: true,
          },
        ],
      },
      price: '45',
      tags: {
        create: [{ tagId: tagIds.CROCHET_ID }, { tagId: tagIds.HANDMADE_ID }],
      },
    },
  },
  {
    data: {
      title: 'Crochet Rabbit',
      shortDescription:
        'Each panda is meticulously handcrafted by skilled artisans, ensuring that every piece is unique and one-of-a-kind. Made from soft, high-quality yarn, this crochet panda is irresistibly huggable and soft to the touch, making it a comforting friend for children and a charming decor item for panda-themed rooms.',
      longDescription:
        "Introducing our adorable Handmade Crochet Panda – the perfect companion for panda lovers of all ages! Crafted with love and attention to detail, this charming crochet panda is a delightful blend of cuddliness and creativity. Each panda is meticulously handcrafted by skilled artisans, ensuring that every piece is unique and one-of-a-kind. Made from soft, high-quality yarn, this crochet panda is irresistibly huggable and soft to the touch, making it a comforting friend for children and a charming decor item for panda-themed rooms. With its endearing black and white pattern, expressive eyes, and sweet smile, our Handmade Crochet Panda captures the essence of these beloved creatures in a tangible form. Whether you're searching for a heartwarming gift for a special someone or a delightful addition to your own plush collection, this crochet panda is sure to bring joy and happiness wherever it goes. Not only is this handmade crochet panda a wonderful companion, but it's also an eco-friendly choice. Unlike mass-produced toys, our crochet panda is crafted with sustainability in mind, using natural materials and minimal packaging. It's a thoughtful way to support traditional craftsmanship and reduce your environmental footprint.",
      status: Status.ACTIVE,
      images: {
        create: [
          {
            image: 'hero.jpg',
            isPrimaryImage: true,
          },
          {
            image: 'test.png',
          },
          {
            image: 'about-photo.png',
          },
        ],
      },
      price: '80',
      tags: {
        create: [
          { tagId: tagIds.ANIMAL_ID },
          { tagId: tagIds.QUALITY_ID },
          { tagId: tagIds.HANDMADE_ID },
        ],
      },
    },
  },
];

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
  tags.forEach(async tag => {
    await prisma.tag.create(tag);
  });
  products.forEach(async item => {
    await prisma.product.create(item);
  });
  await prisma.siteConfig.create(siteConfig);
  await prisma.aboutMeDetails.create(aboutMeData);
}

main()
  .then(async () => {
    console.log('Database Seeded Successfully 😀');
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
