import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { image, productId } = req.body;
    try {
      const imageToRemovePrimary = await prisma.productImages.findFirst({
        where: { AND: [{ productId: productId }, { isPrimaryImage: true }] },
      });

      if (imageToRemovePrimary) {
        await prisma.productImages.update({
          where: { id: imageToRemovePrimary.id },
          data: {
            isPrimaryImage: false,
          },
        });
      }

      const foundImage = await prisma.productImages.findFirst({
        where: { AND: [{ image: image }, { productId: productId }] },
      });
      await prisma.productImages.update({
        where: { id: foundImage.id },
        data: {
          isPrimaryImage: true,
        },
      });

      const latestImages = await prisma.productImages.findMany({
        where: { productId: foundImage.productId },
        orderBy: { image: 'asc' },
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
