/* eslint-disable @next/next/no-img-element */
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
      header: {
        logo: 'blob:http://localhost:3000/6d73e2d9-3315-41b1-abb5-8dac3e9bc60e',
        restaurantName: "Nico's Resto",
      },
      categories: [
        {
          index: 1,
          category: 'tea',
        },
        {
          index: 2,
          category: 'coffee',
        },
      ],
      products: [
        {
          image:
            'blob:http://localhost:3000/e5f9e2a9-4b97-4a7c-960e-ba25402eaf9c',
          category: 'tea',
          name: 'asdf',
          price: '12',
          description: 'asdfasdf',
        },
        {
          image:
            'blob:http://localhost:3000/0549822b-8799-40c7-bfaf-35b75e4b8012',
          category: 'coffee',
          name: 'coffee',
          price: '1',
          description: '123',
        },
      ],
      backgroundColor: {
        container1: '#fdffa9',
        container2: '#ffffff',
      },
    });
  }, [referenceCode]);

  return (
    <>
      <header className="bg-bee-main body-font py-2 shadow-md sticky">
        <div className="container flex items-center justify-center gap-x-3">
          <img
            src={response?.header?.logo ?? '/images/default-image.png'}
            width={'75px'}
            height={'75px'}
            alt={'upload'}
            className={`rounded-full`}
          />
          <span className="text-xl text-white font-bold">
            {response?.header?.restaurantName}
          </span>
        </div>
      </header>

      <main
        className="relative background-wrapper py-10"
        style={{
          backgroundColor: response?.backgroundColor.container1 ?? '#ffb72b',
        }}
      >
        <div
          className="container  drop-shadow-md rounded-lg mt-4 p-8"
          style={{
            backgroundColor: response?.backgroundColor.container2 ?? '#ffffff',
          }}
        >
          <h2 className="text-3xl font-bold text-center">Menu</h2>
          <hr className="my-3" />
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
      </main>
    </>
  );
};

export default RestoPage;
