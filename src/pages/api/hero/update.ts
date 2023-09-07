import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const configUpdate = await prisma.siteConfig.upsert({
        where: { id: data.id },
        update: {
          heroImage: data.heroImage,
          primaryHeroText: data.primaryHeroText,
          secondaryHeroText: data.secondaryHeroText,
        },
        create: {
          heroImage: data.heroImage,
          primaryHeroText: data.primaryHeroText,
          secondaryHeroText: data.secondaryHeroText,
        },
      });
      const config = await prisma.siteConfig.findFirst();
      res.json(config);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else if (req.method === 'GET') {
    try {
      const config = await prisma.siteConfig.findFirst();
      res.json(config);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
}
