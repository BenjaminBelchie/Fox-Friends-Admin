import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Product } from '~/types/Product';
import FeaturedProducts from '~/components/FeaturedProducts/FeaturedProducts';
import HeroEditor from '~/components/HeroEditor';

export const getStaticProps: GetStaticProps<{ data: Product[] }> = () => {
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">Dashboard</p>
        <HeroEditor />
        <FeaturedProducts data={data} />
      </div>
    </div>
  );
}
