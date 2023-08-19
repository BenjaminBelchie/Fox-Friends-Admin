import { Container } from './Container';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { setIsEditingFeaturedProducts } from '~/redux/reducers/global/globalSlice';
import { Button } from '../ui/button';
import { toast, useToast } from '../ui/use-toast';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { Product } from '~/types/Product';

type Props = {
  data: Product[];
};

export default function FeaturedProducts({ data }: Props) {
  const isEditingFeatured = useAppSelector(
    state => state.globalSlice.isEditingFeaturedProducts,
  );
  const dispatch = useAppDispatch();
  const { toast } = useToast();
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
  );
}
