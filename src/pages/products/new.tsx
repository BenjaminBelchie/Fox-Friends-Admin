import NewProductForm from '~/components/Forms/Products/NewProductForm';

export default function NewProducts() {
  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">New Product</p>
        <div className="mt-4">
          <NewProductForm />
        </div>
      </div>
    </div>
  );
}
