import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '~/server/db';
import { AddProductBody } from './add';
import { create } from 'domain';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const data: AddProductBody = req.body;
    if (data.id) {
      await prisma.productTags.deleteMany({ where: { productId: data.id } });
      const transaction = await prisma.product.update({
        where: { id: data.id },
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

      if (transaction.createdAt) {
        res.status(200).send('Updated product successfully');
      } else {
        res.status(500).send('There was an error updating the product');
      }
    } else {
      res.status(404).send('No product ID specified');
    }
  } else {
    res.status(400).send('Invalid request method');
  }
}
