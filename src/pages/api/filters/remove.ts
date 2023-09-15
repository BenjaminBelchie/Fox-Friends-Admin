import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      await prisma.productFilters.delete({
        where: { id: data.id },
      });
      const productFilters = await prisma.productFilters.findMany({
        include: { productFilterValues: true },
      });
      res.status(200).json(productFilters);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
