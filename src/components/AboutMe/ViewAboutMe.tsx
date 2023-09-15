import { AboutMeDetails } from '@prisma/client';
import Image from 'next/image';
import { supabaseProductImagePrefix } from '~/constants/imagePrefixes';

type Props = {
  aboutMeData: AboutMeDetails;
};

export default function ViewAboutMe({ aboutMeData }: Props) {
  return (
    <div className="flex w-full flex-col items-center gap-7 pt-6 md:flex-row md:items-start">
      <div className="flex flex-col gap-4">
        <Image
          className="w-70 h-70 rounded-md"
          height={350}
          width={350}
          src={supabaseProductImagePrefix + aboutMeData.image}
          alt="Rounded avatar"
        />
        <div className="flex justify-center gap-2">
          <a href="https://www.etsy.com/uk/?ref=lgo" target="_blank">
            <img src="/etsy-logo.svg" height={25} width={25} />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <img src="/instagram-logo.svg" height={25} width={25} />
          </a>
          <a href="https://www.facebook.com/" target="_blank">
            <img src="/facebook-logo.svg" height={25} width={25} />
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-bold tracking-tight text-gray-900">
          {aboutMeData.titleText}
        </p>
        <p className="max-w-2xl">{aboutMeData.description}</p>
      </div>
    </div>
  );
}
