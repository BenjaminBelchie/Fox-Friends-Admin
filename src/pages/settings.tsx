import { generateUUID } from '~/utils/generateId';
import FilterEditor from '~/components/FilterEditor';
import { prisma } from '~/server/db';
import { InferGetServerSidePropsType } from 'next';

// const initalFilters = [
//   {
//     filterType: 'Size',
//     productFilterValues: [{ value: 'xl' }, { value: 'l' }],
//     id: generateUUID(),
//   },
//   {
//     filterType: 'Colour',
//     productFilterValues: [{ value: 'Green' }, { value: 'Red' }],
//     id: generateUUID(),
//   },
// ];

export async function getServerSideProps() {
  const productFilters = await prisma.productFilters.findMany({
    include: { productFilterValues: true },
  });
  return {
    props: {
      initalFilters: productFilters,
    },
  };
}

export default function SettingsPage({
  initalFilters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">Settings</p>
        <FilterEditor initalFilters={initalFilters} />
      </div>
    </div>
  );
}
