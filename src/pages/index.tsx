import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import FeaturedProducts from '~/components/FeaturedProducts/FeaturedProducts';
import HeroEditor from '~/components/HeroEditor';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { fetchProducts } from '~/redux/reducers/products/productSlice';
import { useAppDispatch } from '~/hooks/redux';
import { prisma } from '~/server/db';
import Image from 'next/image';
import Link from 'next/link';
import createFlatProductsObject, {
  FlatProductsWithTagsAndImages,
} from '~/utils/createFlatProductObject';

export const getServerSideProps: GetServerSideProps<{
  data: FlatProductsWithTagsAndImages[];
}> = async context => {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { tags: { include: { tag: true } }, images: true },
    orderBy: { featuredIndex: 'asc' },
  });

  const flatProducts = createFlatProductsObject(products);
  return {
    props: {
      data: flatProducts,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, error, isLoading } = useUser();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">
          {user ? `Welcome ${user.name}` : `Welcome`}
        </p>
        <HeroEditor />
        {data.filter(product => product.isFeatured === true).length === 0 ? (
          <div className="flex flex-col items-center">
            <Image height={300} width={300} src="/not-found.svg" alt={''} />
            <p>No Featured Products</p>
            <p>
              Go to{' '}
              <Link
                href="/products"
                className="text-blue-600 hover:underline dark:text-blue-500">
                Products
              </Link>{' '}
              to make a product featured
            </p>
          </div>
        ) : (
          <FeaturedProducts data={data} />
        )}
      </div>
    </div>
  );
}
