import { ProductImages } from '@prisma/client';
import { ProductWithTagsAndImages } from '~/types/Product';

export type FlatProductsWithTagsAndImages = {
  id: string;
  price: number;
  status: string;
  title: string;
  tags: string[];
  isFeatured: boolean;
  featuredIndex?: number;
  shortDescription: string;
  images: ProductImages[];
};

export default function createFlatProductsObject(
  products: ProductWithTagsAndImages[],
): FlatProductsWithTagsAndImages[] {
  return products.map(product => {
    return {
      id: product.id,
      price: parseFloat(product.price),
      shortDescription: product.shortDescription,
      status: product.status,
      title: product.title,
      isFeatured: product.isFeatured,
      featuredIndex: product.featuredIndex,
      images: product.images,
      tags: product.tags.map(tag => tag.tag.tagName),
    };
  });
}
