import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';
import { Status } from '@prisma/client';

export type AddProductBody = {
  id?: string;
  productTitle: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  isFeatured: boolean;
  featuredIndex?: number;
  primaryImage: string;
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

    const transaction = await prisma.product.create({
      data: {
        title: data.productTitle,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        price: data.price.toString(),
        isFeatured: data.isFeatured,
        status: data.status,
        images: {
          create: data.images.map(image => {
            return {
              image: image,
              isPrimaryImage: data.primaryImage === image,
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

    if (transaction.createdAt) {
      res.status(200).send('Success');
    } else {
      res.status(500).send('Could not add product');
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
