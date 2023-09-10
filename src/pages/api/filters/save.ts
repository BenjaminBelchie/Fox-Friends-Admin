import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

// export type CreateProductFilterBody = {
//   filters: ;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const data = req.body;
      if (data && data.filters) {
        data.filters.map(async filter => {
          await prisma.productFilters.update({
            where: { id: filter.id },
            data: {
              staus: 'ACTIVE',
            },
          });
          const productFilters = await prisma.productFilters.findMany({
            include: { productFilterValues: true },
            where: { staus: 'ACTIVE' },
          });
          res.status(200).json(productFilters);
        });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
