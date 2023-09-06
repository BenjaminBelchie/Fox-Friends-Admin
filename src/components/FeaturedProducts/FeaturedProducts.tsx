import { Container } from './Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setIsEditingFeaturedProducts } from '~/redux/reducers/global/globalSlice';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import axios from 'axios';
import { AddProductBody } from '~/pages/api/products/add';
import { FlatProductsWithTagsAndImages } from '~/utils/createFlatProductObject';

type Props = {
  data: FlatProductsWithTagsAndImages[];
};

export default function FeaturedProducts({ data }: Props) {
  const isEditingFeatured = useAppSelector(
    state => state.globalSlice.isEditingFeaturedProducts,
  );
  const dispatch = useAppDispatch();
  const cardsState = useAppSelector(state => state.globalSlice.featuredCards);
  const { toast } = useToast();

  const updateFeaturedIndex = async (
    product: FlatProductsWithTagsAndImages,
    index: number,
  ) => {
    const productData = {
      ...product,
      images: [],
      featuredIndex: index,
    };
    await axios.post('/api/products/update', {
      ...productData,
    });
  };

  return (
    <div>
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
        <div className="flex gap-2">
          <Button
            className="bg-green-600 hover:bg-green-500"
            onClick={() => {
              dispatch(setIsEditingFeaturedProducts(false));
              console.log('CARD STATE ', cardsState);
              cardsState.map(async (product, i) => {
                await updateFeaturedIndex(product, i);
              });
              toast({
                title: 'Saved ✔',
                variant: 'success',
                description:
                  'The order of the featured products has been updated',
              });
            }}>
            Save Order
          </Button>
          <Button
            className="bg-gray-500 hover:bg-gray-400"
            onClick={() => {
              dispatch(setIsEditingFeaturedProducts(false));
            }}>
            Cancel
          </Button>
        </div>
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
  );
}
