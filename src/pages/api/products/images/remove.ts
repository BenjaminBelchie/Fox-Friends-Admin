import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseProductImagePrefix } from '~/constants/imagePrefixes';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const image: string = req.body.image;
    try {
      const foundImage = await prisma.productImages.findFirst({
        where: { image: image },
      });
      await prisma.productImages.delete({
        where: { id: foundImage.id },
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
    res.status(400).send('Invalid request request');
  }
}
