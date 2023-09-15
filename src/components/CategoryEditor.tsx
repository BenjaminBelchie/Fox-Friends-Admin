import { Button } from '~/components/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import axios from 'axios';
import { ProductCategories, Status } from '@prisma/client';
import Image from 'next/image';
import { Badge } from './ui/badge';

type Props = {
  initalCategories: ProductCategories[];
};

export default function CategoryEditor({ initalCategories }: Props) {
  const [categories, setCategories] =
    useState<ProductCategories[]>(initalCategories);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const res = await axios.post('/api/categories/create', {
      category: data.category,
      values: data.productFilterValues,
    });
    setCategories(res.data);
    reset();
  };

  console.log(getValues().category);

  return (
    <div className="mt-3 flex flex-col gap-8">
      <div className="rounded-2xl bg-gray-50 p-4 shadow-lg">
        <p className="mb-4 border-b pb-2 text-xl">New Category</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-900">
              Category
            </label>
            <input
              type="text"
              placeholder="Animals"
              id="category"
              className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
              {...register('category')}
              required
            />
          </div>

          <Button type="submit" className="w-fit">
            Add Category
          </Button>
        </form>
      </div>

      <div className="rounded-2xl bg-gray-50 p-4 shadow-lg">
        <p className="border-b pb-2 text-xl">Your Categories</p>
        {categories.length > 0 ? (
          <>
            {categories.map((category, index) => (
              <div className="my-4 rounded-xl bg-gray-200 px-4 py-4">
                <div className="flex gap-2">
                  <X
                    className="cursor-pointer text-red-600"
                    onClick={async e => {
                      e.preventDefault();
                      const res = await axios.post('/api/categories/remove', {
                        id: category.id,
                      });
                      setCategories(res.data);
                    }}
                  />
                  {category.category}
                  <Badge
                    className={`${
                      category.status === 'ACTIVE'
                        ? 'bg-green-400 hover:bg-green-500'
                        : 'bg-orange-400 hover:bg-orange-500'
                    }`}>
                    {category.status === 'ACTIVE' ? 'Active' : 'Draft'}
                  </Badge>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <Image height={200} width={200} src="/not-found.svg" alt={''} />
            <p>No Product Categories</p>
            <p>Use the New Category form to add new categories.</p>
          </div>
        )}
        {categories.filter(filter => filter.status === 'DRAFT').length > 0 && (
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                const res = await axios.post('/api/categories/save', {
                  categories: categories.filter(
                    filter => filter.status === Status.DRAFT,
                  ),
                });
                setCategories(res.data);
              }}>
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => setCategories(initalCategories)}>
              Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
