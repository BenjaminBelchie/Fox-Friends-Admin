import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';

export default function NewProducts() {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  return (
    <div className="flex">
      <div className=" w-full">
        <p className="border-b pb-3 text-5xl font-medium">New Product</p>
        <div className="mt-4">
          <form>
            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="product-title"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Product Title
                </label>
                <input
                  type="text"
                  id="product-title"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Crochet Bear"
                />
              </div>
              <div>
                <label
                  htmlFor="product-title"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Short Description
                </label>
                <textarea
                  id="product-title"
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Introducing our Handmade Crochet Bear, a charming and huggable companion that brings warmth and nostalgia to your life. Crafted with love and care, each bear is meticulously crocheted by skilled artisans, ensuring a unique and one-of-a-kind creation."
                />
              </div>
              <div>
                <label
                  htmlFor="product-title"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Long Description
                </label>
                <textarea
                  id="product-title"
                  rows={4}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Introducing our Handmade Crochet Bear, a charming and huggable companion that brings warmth and nostalgia to your life. Crafted with love and care, each bear is meticulously crocheted by skilled artisans, ensuring a unique and one-of-a-kind creation. Made from soft, high-quality yarn, this crochet bear boasts a cozy texture that invites cuddles and embraces. Its intricate details, from the adorable button eyes to the carefully stitched nose, give it a delightful personality that appeals to all ages. Whether you're looking for a cherished gift for a loved one or a whimsical addition to your home decor, our Handmade Crochet Bear is a heartwarming choice. Capture the essence of handmade craftsmanship and the comfort of a classic teddy bear with our meticulously designed crochet creation. Cherish the beauty of tradition and the joy of a truly special companion with our Handmade Crochet Bear."
                />
              </div>
              <div>
                <label
                  htmlFor="product-price-icon"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                  Product Price
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                    <svg
                      className="h-4 w-4 text-gray-500 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M18.85187,19.47723a.30631.30631,0,0,0-.39649-.15A8.07605,8.07605,0,0,1,15.60645,20a5.59582,5.59582,0,0,1-1.86768-.39746,9.68262,9.68262,0,0,0-2.90051-.597.1641.1641,0,0,1-.14826-.23449A8.6317,8.6317,0,0,0,11.60645,15c0-.1723-.005-.33441-.00824-.5h3.7387a.26958.26958,0,0,0,.26954-.26959V11.76953A.26953.26953,0,0,0,15.33691,11.5H11.59a.272.272,0,0,1-.26551-.23358c-.0946-.64075-.20154-1.23389-.30444-1.79572a19.22134,19.22134,0,0,1-.41266-3.32824A2.09021,2.09021,0,0,1,12.30048,4.023a2.00082,2.00082,0,0,1,2.15313,1.20715.31.31,0,0,0,.36127.19892L17.888,4.63739c.38922-.10028.4931-.28076.44-.44885A6.00454,6.00454,0,0,0,11.45349.109,6.19508,6.19508,0,0,0,6.61414,6.48425a24.04461,24.04461,0,0,0,.47131,3.70618q.11664.6384.22534,1.30957H5.876a.26957.26957,0,0,0-.26959.26953v2.46088A.26962.26962,0,0,0,5.876,14.5H7.59c.00415.16937.01642.32257.01642.5,0,2.4668-2.49512,4.73438-3.2627,5.373a2.05669,2.05669,0,0,0-.48389,2.5625L3.8858,22.98a2.05264,2.05264,0,0,0,2.38227.92719A17.50783,17.50783,0,0,1,10.60645,23a5.59576,5.59576,0,0,1,1.86767.39746A9.33243,9.33243,0,0,0,15.60645,24a12.01013,12.01013,0,0,0,4.605-1.07471.30844.30844,0,0,0,.14673-.423Z" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="product-price-icon"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="49.99"
                  />
                </div>
              </div>
              <div>
                {files ? (
                  <div className=" px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8 xl:gap-x-8">
                      {files &&
                        Array.from(files).map(image => (
                          <div>
                            <img
                              className="h-64 object-cover duration-700 ease-in-out group-hover:opacity-75	"
                              src={URL.createObjectURL(image)}
                            />
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
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
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
              <Button className="w-fit">Add Product</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
