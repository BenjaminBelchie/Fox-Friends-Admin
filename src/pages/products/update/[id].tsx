import axios from 'axios';
import NewProductForm, {
  NewProductFormInputs,
} from '~/components/Forms/NewProductForm';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { ProductImages } from '@prisma/client';
import { prisma } from '~/server/db';
import { useEffect } from 'react';
import { useAppDispatch } from '~/hooks/redux';
import { fetchProducts } from '~/redux/reducers/products/productSlice';

export const getServerSideProps: GetServerSideProps<{
  product: NewProductFormInputs;
  images: ProductImages[];
}> = async context => {
  const { id } = context.query;
  const product = await prisma.product.findUnique({
    where: { id: Array.isArray(id) ? id[0] : id },
    include: {
      images: { orderBy: { image: 'asc' } },
      tags: { include: { tag: true } },
    },
  });

  if (product.createdAt) {
    const tags: string[] = [];
    product.tags.forEach(tag => {
      tags.push(tag.tag.tagName);
    });

    const productFormObject: NewProductFormInputs = {
      id: product.id,
      productTitle: product.title,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      isFeatured: product.isFeatured,
      price: parseFloat(product.price),
      status: product.status,
      tags: tags,
    };

    return {
      props: {
        product: productFormObject,
        images: product.images,
      },
    };
  } else {
    return;
  }
};

export default function UpdateProductsPage({
  product,
  images,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">
          Update {product.productTitle}
        </p>
        <div className="mt-4">
          <NewProductForm product={product} images={images} />
        </div>
      </div>
    </div>
  );
}
