import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import { columns } from '~/components/ProductsTable/columns';
import { DataTable } from '~/components/ProductsTable/table';
import { useAppDispatch, useAppSelector } from '~/hooks/redux';
import { fetchProducts } from '~/redux/reducers/products/productSlice';
import { prisma } from '~/server/db';
import createFlatProductsObject, {
  FlatProductsWithTagsAndImages,
} from '~/utils/createFlatProductObject';

export const getServerSideProps: GetServerSideProps<{
  products: FlatProductsWithTagsAndImages[];
}> = async context => {
  const products = await prisma.product.findMany({
    include: { tags: { include: { tag: true } }, images: true },
  });
  const flatProducts = createFlatProductsObject(products);
  return {
    props: {
      products: flatProducts,
    },
  };
};

export default function ProductsPage({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const productsState = useAppSelector(state => state.productSlice.products);
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">Products</p>
        {productsState ? (
          <DataTable columns={columns} data={productsState} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
