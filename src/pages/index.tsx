import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { Product } from '~/types/Product';
import FeaturedProducts from '~/components/FeaturedProducts/FeaturedProducts';
import HeroEditor from '~/components/HeroEditor';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchProducts } from '~/redux/reducers/products/productSlice';
import { useAppDispatch } from '~/hooks/redux';

export const getServerSideProps: GetServerSideProps<{
  data: Product[];
}> = async () => {
  return {
    props: {
      data: [
        {
          id: '728ed52f',
          price: 100,
          status: 'pending',
          title: 'Crochet Panda',
          tags: ['crochet', 'cute', 'animal'],
          image: '/testProduct.jpg',
          shortDescription:
            'Introducing our Handmade Crochet Bunny - a lovable and enchanting creation that brings a touch of sweetness to your world. Carefully handcrafted by skilled artisans, each bunny is a unique masterpiece, infused with warmth and craftsmanship.',
        },
        {
          id: '728ed52ffdgsf',
          price: 55,
          status: 'pending',
          title: 'Crochet Rabbit',
          image: '/testProduct.jpg',
          tags: ['crochet', 'cute', 'animal'],
          shortDescription:
            'Introducing our Handmade Crochet Bunny - a lovable and enchanting creation that brings a touch of sweetness to your world. Carefully handcrafted by skilled artisans, each bunny is a unique masterpiece, infused with warmth and craftsmanship.',
        },
        {
          id: '728eddfgdfgdf52f',
          price: 60,
          status: 'pending',
          title: 'Crochet Bear',
          image: '/testProduct.jpg',
          tags: ['crochet', 'cute', 'animal'],
          shortDescription:
            'Introducing our Handmade Crochet Bunny - a lovable and enchanting creation that brings a touch of sweetness to your world. Carefully handcrafted by skilled artisans, each bunny is a unique masterpiece, infused with warmth and craftsmanship.',
        },
        {
          id: 'ewrweewgfd',
          price: 25,
          status: 'pending',
          title: 'Crochet Bunny',
          image: '/testProduct.jpg',
          tags: ['crochet', 'cute', 'animal'],
          shortDescription:
            'Introducing our Handmade Crochet Bunny - a lovable and enchanting creation that brings a touch of sweetness to your world. Carefully handcrafted by skilled artisans, each bunny is a unique masterpiece, infused with warmth and craftsmanship.',
        },
        {
          id: 'sdaddfg',
          price: 25,
          status: 'pending',
          title: 'Crochet Dino',
          image: '/testProduct.jpg',
          tags: ['crochet', 'cute', 'animal'],
          shortDescription:
            'Introducing our Handmade Crochet Bunny - a lovable and enchanting creation that brings a touch of sweetness to your world. Carefully handcrafted by skilled artisans, each bunny is a unique masterpiece, infused with warmth and craftsmanship.',
        },
      ],
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
        <FeaturedProducts data={data} />
      </div>
    </div>
  );
}
