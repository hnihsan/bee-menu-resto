import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Img from '@components/Img/Img';
import formatCurrency from '@helpers/formatCurrency';

type Props = {};

const RestoPage = () => {
  const router = useRouter();
  const { referenceCode } = router.query;

  const [response, setResponse] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  useEffect(() => {
    console.log(referenceCode);

    setResponse({
      restaurantName: `Nico's Food`,
      categories: [
        {
          index: 1,
          category: 'tea',
        },
        {
          index: 2,
          category: 'Menu',
        },
      ],
      products: [
        {
          category: 'tea',
          name: 'White',
          price: '123',
          description: 'Desc',
          image: '/images/default-image.png',
        },
        {
          category: 'Tea',
          name: 'black',
          price: '123',
          description: '123',
          image:
            'blob:http://localhost:3000/c545ce9e-54fc-462f-9415-921be5160fd1',
        },
        {
          category: 'Menu',
          name: '123',
          price: '123',
          description: '412',
          image:
            'blob:http://localhost:3000/c545ce9e-54fc-462f-9415-921be5160fd1',
        },
      ],
      backgroundColor: '#13e0fb',
    });
  }, [referenceCode]);

  return (
    <div
      className="relative background-wrapper py-10"
      style={{ backgroundColor: response?.backgroundColor ?? '#ffb72b' }}
    >
      <div className="container bg-orange-400 text-white drop-shadow-md rounded-lg w-1/2 flex justify-center py-5 font-bold">
        <h2>{response?.restaurantName ?? 'RESTAURANT NAME'}</h2>
      </div>
      <div className="container bg-white drop-shadow-md rounded-lg mt-4 p-8">
        {response?.products.length > 0 ? (
          <div className={'flex gap-x-5 w-full'}>
            <aside
              className="w-2/12 overflow-auto "
              style={{ maxHeight: '70vh' }}
            >
              <ul className="list-none">
                {response?.categories.map(({ category }, index) => (
                  <li
                    key={index}
                    className={`p-3 first-letter:uppercase  cursor-pointer text-hover-bee-main transition-all duration-75 ${
                      selectedCategoryIndex === index
                        ? 'border rounded bg-bee-main text-white hover:text-white'
                        : ''
                    }`}
                    onClick={() => setSelectedCategoryIndex(index)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </aside>
            <div
              className="w-10/12  overflow-auto p-4 border-l"
              style={{ maxHeight: '70vh', height: '70vh' }}
            >
              <div className="grid grid-cols-4 gap-4">
                {response?.products
                  .filter(
                    (product) =>
                      product.category.toLowerCase() ===
                      response?.categories[
                        selectedCategoryIndex
                      ].category.toLowerCase()
                  )
                  .map((product, index) => (
                    <div
                      key={index}
                      className="border rounded-md hover:shadow-md relative"
                    >
                      <figure className="bg-white rounded-md">
                        <div className="relative">
                          <Img
                            src={product.image}
                            height="100%"
                            width="100%"
                            alt={''}
                            classname="object-cover rounded-tl-md rounded-tr-md"
                          />

                          <div className="meta">
                            <p className="mt-3 px-3 text-lg text-white">
                              $ {formatCurrency(product.price)}
                            </p>
                          </div>
                        </div>

                        <figcaption className="p-4 text-black text-center">
                          <h2 className="text-gray-900 text-center text-sm">
                            {product.name}
                          </h2>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <h2 className="text-center">Please create add menu first</h2>
        )}
      </div>
    </div>
  );
};

export default RestoPage;
