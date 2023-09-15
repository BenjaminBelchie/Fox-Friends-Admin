import FilterEditor from '~/components/FilterEditor';
import { prisma } from '~/server/db';
import { InferGetServerSidePropsType } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import Lottie from 'react-lottie-player';
import lottieJson from '~/constants/animations/bear-animation.json';
import CategoryEditor from '~/components/CategoryEditor';
import AboutMe from '~/components/AboutMe/EditAboutMe';
import ViewAboutMe from '~/components/AboutMe/ViewAboutMe';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Pencil } from 'lucide-react';

export async function getServerSideProps() {
  const productFilters = await prisma.productFilters.findMany({
    include: { productFilterValues: true },
  });

  const productCategories = await prisma.productCategories.findMany();
  const aboutMeData = await prisma.aboutMeDetails.findFirst();

  return {
    props: {
      initalFilters: productFilters,
      initalCategories: productCategories,
      aboutMeData: aboutMeData,
    },
  };
}

export default function SettingsPage({
  initalFilters,
  initalCategories,
  aboutMeData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [editAboutMe, setEditAboutMe] = useState(false);
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">Settings</p>
        <Tabs defaultValue="productFilters" className="mt-4">
          <TabsList>
            <TabsTrigger value="productFilters">Product Filters</TabsTrigger>
            <TabsTrigger value="productCategories">
              Product Categories
            </TabsTrigger>
            <TabsTrigger value="aboutPage">About Page</TabsTrigger>
          </TabsList>
          <TabsContent value="productFilters">
            <FilterEditor initalFilters={initalFilters} />
          </TabsContent>
          <TabsContent value="productCategories">
            <CategoryEditor initalCategories={initalCategories} />
          </TabsContent>
          <TabsContent value="aboutPage">
            <div className="flex justify-between gap-2">
              {editAboutMe ? (
                <AboutMe aboutMeData={aboutMeData} />
              ) : (
                <ViewAboutMe aboutMeData={aboutMeData} />
              )}
              <Button
                onClick={e => {
                  setEditAboutMe(!editAboutMe);
                }}
                className="bg-yellow-500 hover:bg-yellow-400"
                size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
