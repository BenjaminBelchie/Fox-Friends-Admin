import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import {
  FlatProductsWithTagsAndImages,
  columns,
} from '~/components/ProductsTable/columns';
import { DataTable } from '~/components/ProductsTable/table';
import { useAppDispatch } from '~/hooks/redux';
import { fetchProducts } from '~/redux/reducers/products/productSlice';
import { prisma } from '~/server/db';
import { ProductWithTagsAndImages } from '~/types/Product';

export const getServerSideProps: GetServerSideProps<{
  products: FlatProductsWithTagsAndImages[];
}> = async context => {
  const products = await prisma.product.findMany({
    include: { tags: { include: { tag: true } }, images: true },
  });
  const flatProducts: FlatProductsWithTagsAndImages[] = products.map(
    product => {
      return {
        id: product.id,
        price: parseFloat(product.price),
        shortDescription: product.shortDescription,
        status: product.status,
        title: product.title,
        tags: product.tags.map(tag => tag.tag.tagName),
      };
    },
  );
  return {
    props: {
      products: flatProducts,
    },
  };
};

export default function ProductsPage({
  products,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">Products</p>
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
}
