import FilterEditor from '~/components/FilterEditor';
import { prisma } from '~/server/db';
import { InferGetServerSidePropsType } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import Lottie from 'react-lottie-player';
import lottieJson from '~/constants/animations/bear-animation.json';
import CategoryEditor from '~/components/CategoryEditor';

export async function getServerSideProps() {
  const productFilters = await prisma.productFilters.findMany({
    include: { productFilterValues: true },
  });

  const productCategories = await prisma.productCategories.findMany();

  return {
    props: {
      initalFilters: productFilters,
      initalCategories: productCategories,
    },
  };
}

export default function SettingsPage({
  initalFilters,
  initalCategories,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
            <div className="flex flex-col items-center justify-center">
              <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: 150, height: 150 }}
              />
              <p className="text-xl font-bold">
                This page is under construction
              </p>
              <p>Please enjoy this dancing bear whilst you wait.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
