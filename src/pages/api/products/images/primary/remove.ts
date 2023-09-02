import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const image = req.body.image;
    try {
      const foundImage = await prisma.productImages.findFirst({
        where: { image: image },
      });
      await prisma.productImages.update({
        where: { id: foundImage.id },
        data: {
          isPrimaryImage: false,
        },
      });

      const latestImages = await prisma.productImages.findMany({
        where: { productId: foundImage.productId },
      });
      res.status(200).json({
        images: latestImages,
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  } else {
    res.status(400).send('invalid request method');
  }
}
