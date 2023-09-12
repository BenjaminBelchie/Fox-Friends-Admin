import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      console.log(data);
      if (data && data.categories) {
        Promise.all(
          data.categories.map(async category => {
            await prisma.productCategories.update({
              where: { id: category.id },
              data: {
                status: 'ACTIVE',
              },
            });
          }),
        ).then(async () => {
          const productCategories = await prisma.productCategories.findMany();
          res.status(200).json(productCategories);
        });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
