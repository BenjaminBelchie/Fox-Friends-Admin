import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export type CreateCategoryBody = {
  category: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const data: CreateCategoryBody = req.body;
      await prisma.productCategories.create({
        data: {
          category: data.category,
          status: 'DRAFT',
        },
      });
      const productCategories = await prisma.productCategories.findMany();
      res.status(200).json(productCategories);
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
