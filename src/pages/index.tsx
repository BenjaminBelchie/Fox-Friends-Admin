import { Payment, columns } from '~/components/ProductsTable/columns';
import { DataTable } from '~/components/ProductsTable/table';
import Sidebar from '~/components/Sidebar';

type Props = () => {
  props: {
    data: Payment[];
  };
};

export const getStaticProps: Props = () => {
  return {
    props: {
      data: [
        {
          id: '728ed52f',
          price: 100,
          status: 'pending',
          title: 'Crochet Bunny',
          tags: ['crochet', 'cute', 'animal'],
        },
        {
          id: '728ed52ffdgsf',
          price: 55,
          status: 'pending',
          title: 'Crochet Rabbit',
          tags: ['crochet', 'cute', 'animal'],
        },
        {
          id: '728eddfgdfgdf52f',
          price: 60,
          status: 'pending',
          title: 'Crochet Bear',
          tags: ['crochet', 'cute', 'animal'],
        },
        {
          id: 'ewrweewgfd',
          price: 25,
          status: 'pending',
          title: 'Crochet Bunny',
          tags: ['crochet', 'cute', 'animal'],
        },
      ],
    },
  };
};

export default function Home({ data }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto mt-12">
        {/* <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total users
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              12,00
            </div>
          </div>
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total Profit
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">
              $ 450k
            </div>
          </div>
          <div className="w-full rounded-lg bg-white px-4 py-5 shadow">
            <div className="truncate text-sm font-medium text-gray-500">
              Total Orders
            </div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">20k</div>
          </div>
        </div> */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
