import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Heart, X } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
  files: File[];
  primaryImage: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  setPrimaryImage: Dispatch<SetStateAction<string>>;
};
export default function FileUploader({
  files,
  primaryImage,
  setFiles,
  setPrimaryImage,
}: Props) {
  // State to show the primary image, string is image name

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files));
  };

  return (
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
                <span className="font-semibold">Click to upload</span> or drag
                and drop
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
  );
}
