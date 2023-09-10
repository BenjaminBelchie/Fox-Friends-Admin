import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import axios from 'axios';
import { Status } from '@prisma/client';
import { ProductFiltersWithValues } from '~/types/Product';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Badge } from './ui/badge';

type Props = {
  initalFilters: ProductFiltersWithValues[];
};

export default function FilterEditor({ initalFilters }: Props) {
  const [filters, setFilters] =
    useState<ProductFiltersWithValues[]>(initalFilters);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: 'productFilterValues',
    },
  );

  const router = useRouter();

  const onSubmit = async data => {
    const res = await axios.post('/api/filters/create', {
      filterType: data.filterType,
      values: data.productFilterValues,
    });
    setFilters(res.data);
    reset();
  };
  return (
    <div className="mt-3 flex flex-col gap-8">
      <div className="rounded-2xl bg-gray-50 p-4 shadow-lg">
        <p className="mb-4 border-b pb-2 text-xl">New Filter</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div>
            <label
              htmlFor="filterType"
              className="mb-2 block text-sm font-medium text-gray-900">
              Filter Type
            </label>
            <input
              type="text"
              placeholder="Colour"
              id="filterType"
              className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
              {...register('filterType', {})}
              required
            />
          </div>
          <div className="flex gap-2">
            <p>Filter Values</p>
            <Plus
              className="cursor-pointer text-green-600"
              onClick={() => {
                append({ value: '' });
              }}
            />
          </div>
          {fields.map((field, index) => (
            <div className="rounded-xl border p-4" key={field.id}>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
                  placeholder="Brown"
                  {...register(`productFilterValues.${index}.value`, {
                    required: true,
                  })}
                  required
                />
                <X
                  className="cursor-pointer text-red-600"
                  onClick={() => {
                    remove(index);
                  }}
                />
              </div>
            </div>
          ))}
          <Button
            type="submit"
            className="w-fit"
            disabled={
              getValues().productFilterValues &&
              getValues().productFilterValues.length > 0
                ? false
                : true
            }>
            Add Filter
          </Button>
        </form>
      </div>

      <div className="rounded-2xl bg-gray-50 p-4 shadow-lg">
        <p className="border-b pb-2 text-xl">Your filters</p>
        {filters.length > 0 ? (
          <Accordion type="single" collapsible>
            {filters.map((filter, index) => (
              <AccordionItem
                key={index}
                value={filter.filterType}
                className="my-4 rounded-xl bg-gray-200 px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex justify-center gap-2">
                    <X
                      className="text-red-600"
                      onClick={async e => {
                        e.preventDefault();
                        const res = await axios.post('/api/filters/remove', {
                          id: filter.id,
                        });
                        setFilters(res.data);
                      }}
                    />
                    {filter.filterType}
                    <Badge
                      className={`${
                        filter.staus === 'ACTIVE'
                          ? 'bg-green-400 hover:bg-green-500'
                          : 'bg-orange-400 hover:bg-orange-500'
                      }`}>
                      {filter.staus === 'ACTIVE' ? 'Active' : 'Draft'}
                    </Badge>
                  </div>
                </AccordionTrigger>
                {filter.productFilterValues.map((value, index) => (
                  <AccordionContent key={index}>
                    <div className="flex gap-2">
                      <Checkbox id={value.value} />
                      {value.value}
                    </div>
                  </AccordionContent>
                ))}
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="flex flex-col items-center">
            <Image height={200} width={200} src="/not-found.svg" alt={''} />
            <p>No Product Filters</p>
            <p>Use the New Filter form to add new filters.</p>
          </div>
        )}
        {filters.filter(filter => filter.staus === 'DRAFT').length > 0 && (
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                const res = await axios.post('/api/filters/save', {
                  filters: filters.filter(
                    filter => filter.staus === Status.DRAFT,
                  ),
                });
                setFilters(res.data);
              }}>
              Save
            </Button>
            <Button
              variant="secondary"
              onClick={() => setFilters(initalFilters)}>
              Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
