import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Product, ProductWithImages } from '~/types/Product';
import FeaturedProducts from '~/components/FeaturedProducts/FeaturedProducts';
import HeroEditor from '~/components/HeroEditor';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '~/redux/reducers/products/productSlice';
import { useAppDispatch } from '~/hooks/redux';
import { prisma } from '~/server/db';

export const getServerSideProps: GetServerSideProps<{
  data: ProductWithImages[];
}> = async context => {
  const products = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { images: true },
  });
  return {
    props: {
      data: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('DATA ', data);
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
        <FeaturedProducts data={data} />
      </div>
    </div>
  );
}
