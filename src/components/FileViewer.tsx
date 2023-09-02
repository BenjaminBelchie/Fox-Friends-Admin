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

type Props = {
  files: string[];
  primaryImage: string;
};
export default function FileViewer({ files, primaryImage }: Props) {
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
  );
  const [images, setImages] = useState(files);

  const removeImage = async (image: string) => {
    const imageName = image.replace(supabaseProductImagePrefix, '');
    const imageResponse = await axios.post('/api/products/images/remove', {
      image: imageName,
    });
    const { data, error } = await supabase.storage
      .from('images')
      .remove([imageName]);

    if (imageResponse.status === 200 && !error) {
      toast({
        title: 'Removed Image ✔',
      });
      setImages(imageResponse.data.images);
    }
  };

  const changePrimaryImage = async (image: string) => {
    const imageName = image.replace(supabaseProductImagePrefix, '');
    if (primaryImage === image) {
      await axios.post('/api/products/images/primary/remove', {
        image: imageName,
      });
    } else {
      await axios.post('/api/products/images/primary/add', {
        image: imageName,
      });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
        {images &&
          Array.from(images).map((image, i) => (
            <div
              className="flex h-64 justify-between p-2 duration-700 ease-in-out group-hover:opacity-75	"
              style={{
                backgroundImage: `url(${image})`,
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
                        fill={primaryImage === image ? `#ffff` : `transparent`}
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
                      <X className="h-4 w-4" />
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
