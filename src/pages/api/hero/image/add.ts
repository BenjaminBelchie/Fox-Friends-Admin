import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data = req.body;
    try {
      const heroImage = await prisma.siteConfig.update({
        where: { id: data.id },
        data: {
          heroImage: data.image,
        },
      });
      const config = await prisma.siteConfig.findFirst();
      res.status(200).json(config);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
