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
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">Dashboard</p>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
