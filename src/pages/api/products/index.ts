import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const products = await prisma.product.findMany({
      include: { tags: { include: { tag: true } }, images: true },
    });
    if (products) {
      res.status(200).json(products);
    } else {
      res.status(500).send('An error occurred retrieving products');
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
