import Img from '@components/Img/Img';
import React, { useEffect, useState } from 'react';
import formatCurrency from '@helpers/formatCurrency';
import CreateMenuModal from '@components/Modal/CreateMenuModal';
import ChangeBackgroundModal from '@components/Modal/ChangeBackgroundModal';
import SwarmReferenceModal from '@components/Modal/SwarmReferenceModal';

type Props = {};

export default function Home({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalColorOpen, setIsModalColorOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState({
    container1: '#fdffa9',
    container2: '#ffffff',
  });
  const [isModalSwarmOpen, setIsModalSwarmOpen] = useState(false);

  // NOTE categories
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  // NOTE restaurant name
  const [restaurantName, setRestaurantName] = useState(
    'Enter Your Restaurant Name'
  );
  const [isEditRestaurantName, setIsEditRestaurantName] = useState(false);

  const handlerMenuSubmit = (item: any) => {
    if (!item.image) {
      item.image = '/images/default-image.png';
    }
    setProducts([...products, item]);

    const isCategoryExist = categories.filter(
      ({ category }) => category.toLowerCase() === item.category.toLowerCase()
    ).length;

    if (!isCategoryExist) {
      setCategories([
        ...categories,
        {
          index: categories.length + 1,
          category: item.category,
        },
      ]);
    }
  };

  const [payload, setPayload] = useState(null);

  useEffect(() => {
    setPayload({
      restaurantName,
      categories,
      products,
      backgroundColor,
    });
  }, [restaurantName, categories, products, backgroundColor]);

  const handleKeyDownRestaurantName = (e) => {
    if (e.key === 'Enter') {
      setIsEditRestaurantName(false);
    }
  };

  return (
    <div
      className="relative background-wrapper py-10"
      style={{ backgroundColor: backgroundColor.container1 }}
    >
      <div className="absolute right-12 bg-white drop-shadow-md rounded-lg p-6 animate-pulse">
        <h2>PREVIEW MODE</h2>
      </div>

      <div
        className="container bg-orange-400 text-white drop-shadow-md rounded-lg w-1/2 flex justify-center py-5 font-bold cursor-pointer"
        onClick={() => setIsEditRestaurantName(true)}
      >
        {isEditRestaurantName ? (
          <input
            type="text"
            className="mx-3 text-center border border-gray-300  text-sm rounded-md block w-full focus:border-black focus-visible:outline-none py-2 px-4 text-black "
            value={restaurantName}
            placeholder={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            onKeyDown={handleKeyDownRestaurantName}
          />
        ) : (
          <h2>{restaurantName}</h2>
        )}
      </div>
      <div
        className="container bg-white drop-shadow-md rounded-lg mt-4 p-8"
        style={{ backgroundColor: backgroundColor.container2 }}
      >
        <div className="flex gap-x-3">
          <button
            className="hover:bg-orange-500 hover:text-white transition duration-300 border  px-4 py-3 rounded-full mb-3"
            onClick={() => {
              setIsModalColorOpen(true);
            }}
          >
            Change Background Color
          </button>
          <button
            className="hover:bg-orange-500 hover:text-white transition duration-300 border  px-4 py-3 rounded-full mb-3"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add Menu
          </button>
        </div>

        {products.length > 0 ? (
          <div className={'flex gap-x-5 w-full'}>
            <aside
              className="w-2/12 overflow-auto "
              style={{ maxHeight: '70vh' }}
            >
              <ul className="list-none">
                {categories.map(({ category }, index) => (
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
                {products
                  .filter(
                    (product) =>
                      product.category.toLowerCase() ===
                      categories[selectedCategoryIndex].category.toLowerCase()
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

      {products.length > 0 && (
        <div
          className="absolute bottom-10 right-10 rounded"
          style={{ maxHeight: '75vh' }}
        >
          <button
            className="text-white px-4 w-auto h-12 bg-orange-400 rounded-full hover:bg-orange-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
            onClick={() => {
              setIsModalSwarmOpen(true);
            }}
          >
            <span>Create Page</span>
          </button>
        </div>
      )}

      <CreateMenuModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handlerMenuSubmit}
        shouldCloseOnOverlayClick={false}
      />

      <ChangeBackgroundModal
        isOpen={isModalColorOpen}
        onRequestClose={() => setIsModalColorOpen(false)}
        currentColor={backgroundColor}
        onSubmit={(color) => {
          setBackgroundColor(color);
        }}
        shouldCloseOnOverlayClick={true}
      />

      <SwarmReferenceModal
        isOpen={isModalSwarmOpen}
        referenceCode="asdf"
        onRequestClose={() => setIsModalSwarmOpen(false)}
        payload={payload}
      />
    </div>
  );
}
