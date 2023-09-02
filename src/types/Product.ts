import { Prisma } from '@prisma/client';

export type Product = {
  id: string;
  price: number;
  status: string;
  title: string;
  tags: string[];
  image: string;
  shortDescription: string;
};

export type ProductWithTagsAndImages = Prisma.ProductGetPayload<{
  include: { tags: { include: { tag } }; images: true };
}>;
