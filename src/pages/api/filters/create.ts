import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';

export type CreateProductFilterBody = {
  filterType: string;
  values: { value: string }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const data: CreateProductFilterBody = req.body;
      await prisma.productFilters.create({
        data: {
          filterType: data.filterType,
          productFilterValues: {
            create: data.values.map(value => {
              return {
                value: value.value,
              };
            }),
          },
        },
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
