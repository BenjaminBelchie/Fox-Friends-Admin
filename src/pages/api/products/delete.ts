import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { productId } = req.body;
      await prisma.product.delete({ where: { id: productId } });
      const products = await prisma.product.findMany({
        where: { isFeatured: true },
        include: { tags: { include: { tag: true } }, images: true },
        orderBy: { featuredIndex: 'asc' },
      });
      res.status(200).json(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
