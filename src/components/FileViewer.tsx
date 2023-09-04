import { Heart, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import axios from 'axios';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { env } from '~/env.mjs';
import { supabaseProductImagePrefix } from '~/constants/imagePrefixes';
import { toast } from './ui/use-toast';
import { ProductImages } from '@prisma/client';
import { Ring } from '@uiball/loaders';

type Props = {
  files: ProductImages[];
};
export default function FileViewer({ files }: Props) {
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
  );
  const [images, setImages] = useState(files);
  const [removingImage, setRemovingImage] = useState({
    id: '',
    loading: false,
  });

  const removeImage = async (image: ProductImages) => {
    setRemovingImage({ id: image.id, loading: true });
    const imageName = image.image;
    const imageResponse = await axios.post('/api/products/images/remove', {
      image: imageName,
    });
    const { data, error } = await supabase.storage
      .from('images')
      .remove([imageName]);

    if (imageResponse.status === 200 && !error) {
      setRemovingImage({ id: '', loading: false });
      toast({
        title: 'Removed Image ✔',
        variant: 'success',
      });
      setImages(imageResponse.data.images);
    } else {
      setRemovingImage({ id: '', loading: false });
      toast({
        title: 'Whoops 😐',
        description: 'An error occured removing the image',
        variant: 'destructive',
      });
    }
  };

  const changePrimaryImage = async (image: ProductImages) => {
    const imageName = image.image;
    if (image.isPrimaryImage) {
      const imagesResponse = await axios.post(
        '/api/products/images/primary/remove',
        {
          image: imageName,
          productId: image.productId,
        },
      );
      setImages(imagesResponse.data.images);
    } else {
      const imagesResponse = await axios.post(
        '/api/products/images/primary/add',
        {
          image: imageName,
          productId: image.productId,
        },
      );
      setImages(imagesResponse.data.images);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
        {images &&
          images.map((image, i) => (
            <div
              className="flex h-64 justify-between p-2 duration-700 ease-in-out group-hover:opacity-75	"
              style={{
                backgroundImage: `url(${
                  supabaseProductImagePrefix + image.image
                })`,
                backgroundSize: 'cover',
              }}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        changePrimaryImage(image);
                      }}
                      className="bg-green-500 hover:bg-green-400"
                      size="icon">
                      <Heart
                        fill={image.isPrimaryImage ? `#ffff` : `transparent`}
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
                        removeImage(image);
                      }}
                      className="bg-red-500 hover:bg-red-400"
                      size="icon">
                      {removingImage.id === image.id &&
                      removingImage.loading ? (
                        <Ring
                          size={25}
                          lineWeight={3}
                          speed={2}
                          color="white"
                        />
                      ) : (
                        <X className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent align="end">
                    <p>Delete Image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
      </div>
    </div>
  );
}
