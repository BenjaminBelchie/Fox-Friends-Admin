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

type filtersState = {
  filterType: string;
  id: string;
  productFilterValues: { value: string }[];
}[];

type Props = {
  initalFilters: filtersState;
};

export default function FilterEditor({ initalFilters }: Props) {
  const [filters, setFilters] = useState<filtersState>(initalFilters);
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
                    onClick={e => {
                      e.preventDefault();
                      let f = filters.filter(fil => {
                        return fil.id !== filter.id;
                      });
                      setFilters(f);
                    }}
                  />
                  {filter.filterType}
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
        {filters !== initalFilters && (
          <div className="flex gap-2">
            <Button>Save</Button>
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
