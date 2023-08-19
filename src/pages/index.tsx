import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { Container } from '~/components/FeaturedProducts/Container';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Product } from '~/types/Product';
import { Button } from '~/components/ui/button';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { setIsEditingFeaturedProducts } from '~/redux/reducers/global/globalSlice';
import { useToast } from '~/components/ui/use-toast';

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
  const isEditingFeatured = useAppSelector(
    state => state.globalSlice.isEditingFeaturedProducts,
  );
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">Dashboard</p>
        <p className="pt-4 text-4xl">Featured Products</p>
        <p>
          These are the featured products that appear on the homepage, you can
          re-arrange the order by dragging and dropping and it will update the
          main website.
        </p>
        <DndProvider backend={HTML5Backend}>
          <div className="py-8">
            <Container data={data} />
          </div>
        </DndProvider>
        {isEditingFeatured ? (
          <Button
            className="bg-green-600 hover:bg-green-500"
            onClick={() => {
              dispatch(setIsEditingFeaturedProducts(false));
              toast({
                title: 'Saved ✔',
                variant: 'success',
                description:
                  'The order of the featured products has been updated',
              });
            }}>
            Save Order
          </Button>
        ) : (
          <Button
            className="bg-orange-400 hover:bg-orange-300"
            onClick={() => {
              dispatch(setIsEditingFeaturedProducts(true));
            }}>
            Edit Order
          </Button>
        )}
      </div>
    </div>
  );
}
