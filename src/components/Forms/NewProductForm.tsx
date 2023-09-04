import { createClient } from '@supabase/supabase-js';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller, set } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import FormTextArea from '~/components/ui/form-text-area';
import FormTextField from '~/components/ui/form-text-field';
import { toast } from '~/components/ui/use-toast';
import { PoundSignIcon } from '~/constants/icons';
import { env } from '~/env.mjs';
import { AddProductBody } from '~/pages/api/products/add';
import { generateUUID } from '~/utils/generateId';
import { Product, ProductImages, Status } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import ProductTags from '../ProductTags';
import FileUploader from '../FileUploader';
import FileViewer from '../FileViewer';
import { supabaseProductImagePrefix } from '~/constants/imagePrefixes';
import Router from 'next/router';
import { Checkbox } from '../ui/checkbox';

export type NewProductFormInputs = {
  id?: string;
  productTitle: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  isFeatured: boolean;
  status: Status;
  tags: string[];
};

type Props = {
  product?: NewProductFormInputs;
  images?: ProductImages[];
};

export default function NewProductForm(props: Props) {
  const { register, handleSubmit, reset, control } =
    useForm<NewProductFormInputs>({
      defaultValues: props.product ? props.product : null,
    });

  const [files, setFiles] = useState<File[] | null | undefined>(null);
  const [tags, setTags] = useState<string[]>(
    props.product && props.product.tags ? props.product.tags : [],
  );

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
      Router.push('/products');
      reset();
      setFiles(null);
      setTags([]);
      toast({
        title: 'Product Added Successfully ✔',
        variant: 'success',
      });
    }
  };

  const onUpdate: SubmitHandler<NewProductFormInputs> = async formData => {
    const fileNames: string[] = [];
    if (files) {
      files.map(async file => {
        let uniqueFilename = `${generateUUID()}_${file.name}`;
        fileNames.push(uniqueFilename);
        await supabase.storage.from('images').upload(uniqueFilename, file);
      });
    }
    const productData: AddProductBody = {
      ...formData,
      images: fileNames,
      tags: tags,
    };
    const res = await axios.post('/api/products/update', {
      ...productData,
      id: props.product.id,
    });
    if (res.status === 200) {
      Router.push('/products');
      toast({
        title: 'Product Updated Successfully ✔',
        variant: 'success',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        props.product && props.images ? onUpdate : onSubmit,
      )}
      className="flex flex-col gap-4">
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-gray-900">
            Feature Product
          </label>
          <Controller
            name="isFeatured"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="is-featured"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
        <ProductTags tags={tags} setTags={setTags} />
        {props.images && <FileViewer files={props.images} />}
        <FileUploader files={files} setFiles={setFiles} />
        <Button className="w-fit">
          {props.product ? 'Update Product' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}
