import { useState, ChangeEvent, useEffect } from 'react';
import { Button } from './ui/button';
import { Check, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useToast } from './ui/use-toast';
import TextField from './ui/text-field';

const primaryInitText = 'Artisanal Crochet Goods';
const secondaryInitText = 'Handmade to Order in the UK';

export default function HeroEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [primaryHeroText, setPrimaryHeroText] = useState(primaryInitText);
  const [secondaryHeroText, setSecondaryHeroText] = useState(secondaryInitText);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  const hasHeroTextChanged = () => {
    if (
      primaryHeroText !== primaryInitText ||
      secondaryHeroText !== secondaryInitText
    ) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    hasHeroTextChanged();
  }, [primaryHeroText, secondaryHeroText]);

  return (
    <div>
      <p className="pt-4 text-4xl">Hero Image</p>
      <p className="pb-4">
        You can change your hero image by just droping a new one here. It is
        like 95% accurate positioning to the hero on the main website.
      </p>
      {file ? (
        <div
          className=" h-[401px] w-full bg-cover bg-center p-4"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${URL.createObjectURL(
              file,
            )})`,
          }}>
          <div className=" flex justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setFile(null);
                    }}
                    className="bg-red-500 hover:bg-red-400"
                    size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="start">
                  <p>Reset Image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setFile(null);
                      toast({
                        title: 'Saved ✔',
                        description: 'Hero image updated successfully',
                        variant: 'success',
                      });
                    }}
                    className="bg-green-600 hover:bg-green-500"
                    size="icon">
                    <Check className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent align="end">
                  <p>Save Image</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex h-full w-full  flex-col justify-center">
            <div className="flex -translate-y-16 flex-col items-center">
              <p className="text-6xl font-bold uppercase text-white">
                {primaryHeroText}
              </p>
              <p className="text-4xl font-bold uppercase text-green-200">
                {secondaryHeroText}
              </p>
            </div>
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
              onChange={handleFileChange}
            />
          </label>
        </div>
      )}
      <div className="flex flex-col gap-2 pt-4">
        <p>You can also change the text overlayed on the hero image</p>
        <TextField
          value={primaryHeroText}
          setValue={setPrimaryHeroText}
          htmlId="primary-hero-text"
          inputType="text"
          showLabel={true}
          lableText="Primary Hero Text"
        />
        <TextField
          value={secondaryHeroText}
          setValue={setSecondaryHeroText}
          htmlId="secondary-hero-text"
          inputType="text"
          showLabel={true}
          lableText="Secondary Text"
        />
        {hasHeroTextChanged() && (
          <Button className="w-fit">Save Hero Text</Button>
        )}
      </div>
    </div>
  );
}
