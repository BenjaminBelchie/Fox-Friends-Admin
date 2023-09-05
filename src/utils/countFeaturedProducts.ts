import { prisma } from '~/server/db';

export default async function countFeaturedProducts() {
  return await prisma.product.count({ where: { isFeatured: true } });
}
