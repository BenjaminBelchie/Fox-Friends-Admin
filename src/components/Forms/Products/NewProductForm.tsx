import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { createClient } from '@supabase/supabase-js';
import React from 'react';
import axios from 'axios';
import { Heart, X } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useForm, SubmitHandler, Controller, set } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import FormTextArea from '~/components/ui/form-text-area';
import FormTextField from '~/components/ui/form-text-field';
import { toast, useToast } from '~/components/ui/use-toast';
import { PoundSignIcon } from '~/constants/icons';
import { env } from '~/env.mjs';
import { AddProductBody } from '~/pages/api/products/add';
import { generateUUID } from '~/utils/generateId';
import { Status } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import TextField from '~/components/ui/text-field';
import { Badge } from '~/components/ui/badge';

export type NewProductFormInputs = {
  productTitle: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  status: Status;
  tags: string[];
};

export default function NewProductForm() {
  const { register, handleSubmit, reset, control } =
    useForm<NewProductFormInputs>();

  const [files, setFiles] = useState<File[] | null>(null);
  // State to show the primary image, string is image name
  const [primaryImage, setPrimaryImage] = useState<string>();
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
  );

  const onSubmit: SubmitHandler<NewProductFormInputs> = async formData => {
    const fileNames: string[] = [];
    files.map(async file => {
      let uniqueFilename = `${generateUUID()}_${file.name}`;
      fileNames.push(uniqueFilename);
      await supabase.storage.from('images').upload(uniqueFilename, file);
    });
    const productData: AddProductBody = {
      ...formData,
      images: fileNames,
      tags: tags,
    };
    const res = await axios.post('/api/products/add', {
      ...productData,
    });
    if (res.status === 200) {
      reset();
      setFiles(null);
      setTags([]);
      toast({
        title: 'Product Added Successfully ✔',
        variant: 'success',
      });
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files));
  };

  const handleAddTag = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setTags(prevTags => prevTags.concat(tagInput));
      setTagInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <FormTextField
          htmlId="product-title"
          inputType="text"
          showLabel={true}
          lableText="Product Title"
          placeholder="Crochet Bear"
          register={register}
          inputSelector="productTitle"
        />
        <FormTextArea
          htmlId="short-description"
          lableText="Short Description"
          showLabel={true}
          register={register}
          inputSelector="shortDescription"
          rows={4}
          placeholder="Introducing our Handmade Crochet Bear, a charming and huggable companion that brings warmth and nostalgia to your life. Crafted with love and care, each bear is meticulously crocheted by skilled artisans, ensuring a unique and one-of-a-kind creation."
        />
        <FormTextArea
          htmlId="long-description"
          lableText="Long Description"
          showLabel={true}
          register={register}
          inputSelector="longDescription"
          rows={6}
          placeholder="Introducing our Handmade Crochet Bear, a charming and huggable companion that brings warmth and nostalgia to your life. Crafted with love and care, each bear is meticulously crocheted by skilled artisans, ensuring a unique and one-of-a-kind creation. Made from soft, high-quality yarn, this crochet bear boasts a cozy texture that invites cuddles and embraces. Its intricate details, from the adorable button eyes to the carefully stitched nose, give it a delightful personality that appeals to all ages. Whether you're looking for a cherished gift for a loved one or a whimsical addition to your home decor, our Handmade Crochet Bear is a heartwarming choice. Capture the essence of handmade craftsmanship and the comfort of a classic teddy bear with our meticulously designed crochet creation. Cherish the beauty of tradition and the joy of a truly special companion with our Handmade Crochet Bear."
        />
        <FormTextField
          htmlId="product-price"
          inputType="number"
          showLabel={true}
          lableText="Product Price"
          placeholder="49.99"
          icon={<PoundSignIcon />}
          register={register}
          inputSelector="price"
        />
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-900">
            Product Status
          </label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px] border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {tags.length > 0 ? (
          <div className="flex gap-2">
            {tags.map(tag => (
              <Badge>{tag}</Badge>
            ))}
          </div>
        ) : (
          <></>
        )}
        <div>
          <label
            htmlFor="tag-input"
            className="mb-2 block text-sm font-medium text-gray-900">
            Tags
          </label>
          <div className="relative">
            <input
              type="text"
              id="tag-input"
              placeholder="Crochet, Animal"
              value={tagInput}
              onChange={e => {
                setTagInput(e.target.value);
              }}
              onKeyDown={handleAddTag}
              className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
            />
          </div>
        </div>
        <div>
          {files && files.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
                {files &&
                  Array.from(files).map((image, i) => (
                    <div
                      className="flex h-64 justify-between p-2 duration-700 ease-in-out group-hover:opacity-75	"
                      style={{
                        backgroundImage: `url(${URL.createObjectURL(image)})`,
                        backgroundSize: 'cover',
                      }}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={e => {
                                e.preventDefault();
                                if (primaryImage === image.name) {
                                  setPrimaryImage(null);
                                } else {
                                  setPrimaryImage(image.name);
                                }
                              }}
                              className="bg-green-500 hover:bg-green-400"
                              size="icon">
                              <Heart
                                fill={
                                  primaryImage === image.name
                                    ? `#ffff`
                                    : `transparent`
                                }
                                className="h-4 w-4"
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent align="start">
                            <p>Make primary image</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={e => {
                                e.preventDefault();
                                const copyArray = [...files];
                                copyArray.splice(i, 1);
                                setFiles(copyArray);
                                if (primaryImage === image.name)
                                  setPrimaryImage(null);
                              }}
                              className="bg-red-500 hover:bg-red-400"
                              size="icon">
                              <X className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent align="end">
                            <p>Reset Image</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                  <svg
                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>
          )}
        </div>
        <Button className="w-fit">Add Product</Button>
      </div>
    </form>
  );
}
