import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';
import { Status } from '@prisma/client';

export type AddProductBody = {
  productTitle: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  status: Status;
  images: string[];
  tags: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data: AddProductBody = req.body;
    console.log(data);
    const transaction = await prisma.product.create({
      data: {
        title: data.productTitle,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        price: data.price.toString(),
        status: data.status,
        images: {
          create: data.images.map(image => {
            return {
              image: image,
            };
          }),
        },
        tags: {
          create: data.tags.map(tag => ({
            tag: {
              create: {
                tagName: tag,
              },
            },
          })),
        },
      },
    });
    res.status(200).send('Success');
  } else {
    res.status(400).send('Invalid request method');
  }
}
