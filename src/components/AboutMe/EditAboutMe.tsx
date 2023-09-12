import { AboutMeDetails } from '@prisma/client';
import FileUploader from '../ImageUploader';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import axios from 'axios';
import { useRouter } from 'next/router';

type Props = {
  aboutMeData: AboutMeDetails;
};

export default function AboutMe({ aboutMeData }: Props) {
  const [image, setImage] = useState<File | string>(aboutMeData?.image);
  const [saveDisabled, setSaveDisabled] = useState(true);
  const router = useRouter();

  const checkCanUpdate = () => {
    if (
      getValues().title !== aboutMeData.titleText ||
      getValues().aboutMe !== aboutMeData.description ||
      image !== aboutMeData.image
    ) {
      setSaveDisabled(false);
    } else {
      setSaveDisabled(true);
    }
  };

  useEffect(() => {
    if (image) {
      checkCanUpdate();
    } else {
      setSaveDisabled(true);
    }
  }, [image]);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: aboutMeData.titleText,
      aboutMe: aboutMeData.description,
    },
  });

  const onSubmit = async data => {
    console.log(data);
    await axios.post('/api/about/save', {
      ...data,
      id: aboutMeData.id,
      image: typeof image === 'string' ? image : image.name,
    });
    toast({
      title: 'About Me Saved ✔',
      description: 'Your About Me page has been updated successfully.',
      variant: 'success',
    });
    router.replace(router.asPath);
    setSaveDisabled(true);
  };

  return (
    <div className="flex w-full flex-col  gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold">Your Image</p>
        <FileUploader file={image} setFile={setImage} />
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              placeholder="Hi, I'm Anna"
              id="title"
              className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
              {...register('title', {
                onChange: () => {
                  checkCanUpdate();
                },
              })}
              required
            />
          </div>
          <div>
            <label
              htmlFor="aboutMe"
              className="mb-2 block text-sm font-medium text-gray-900">
              About Me
            </label>
            <textarea
              rows={6}
              placeholder="Hello, I'm Anna, the creative soul behind Fox & Friends in my cozy corner of the world. Ever since I can remember, crochet has been my greatest passion and my most cherished form of self-expression."
              id="aboutMe"
              className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
              {...register('aboutMe', {
                onChange: () => {
                  checkCanUpdate();
                },
              })}
              required
            />
          </div>
          <Button className="w-fit" type="submit" disabled={saveDisabled}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}
