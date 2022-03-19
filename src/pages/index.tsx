/* eslint-disable @next/next/no-img-element */
import Img from "@components/Img/Img";
import React, { useEffect, useRef, useState } from "react";
import formatCurrency from "@helpers/formatCurrency";
import CreateMenuModal from "@components/Modal/CreateMenuModal";
import ChangeBackgroundModal from "@components/Modal/ChangeBackgroundModal";
import SwarmReferenceModal from "@components/Modal/SwarmReferenceModal";
import DetailMenuItemModal from "@components/Modal/DetailMenuItemModal";
import { Bee, BeeDebug } from "@ethersphere/bee-js";

type Props = {};

export default function Home({}: Props) {
  const beeUrl = "http://localhost:1633";
  const beeDebugUrl = "http://localhost:1635";
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [reference, setReference] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalColorOpen, setIsModalColorOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [uploadingLogo, setuploadingLogo] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState({
    container1: "#fdffa9",
    container2: "#ffb72b",
  });
  const [isModalSwarmOpen, setIsModalSwarmOpen] = useState(false);

  // NOTE categories
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  // NOTE restaurant name
  const [restaurantName, setRestaurantName] = useState(
    "Enter Your Restaurant Name"
  );
  const [isEditRestaurantName, setIsEditRestaurantName] = useState(false);

  const handlerMenuSubmit = (item: any) => {
    if (!item.image) {
      item.image = "/images/default-image.png";
    }
    setProducts([...products, item]);
    const isCategoryExist = categories.filter(
      ({ category }) => category.toLowerCase() === item.category.toLowerCase()
    ).length;

    if (!isCategoryExist) {
      setCategories([
        ...categories,
        {
          index: categories.length,
          category: item.category,
        },
      ]);
    }
  };

  const handleKeyDownRestaurantName = (e) => {
    if (e.key === "Enter") {
      setIsEditRestaurantName(false);
    }
  };

  const handleCreatePage = async () => {
    setIsLoadingCreate(true);

    const ps = await beeDebug.getAllPostageBatch();
    let usableStamps = ps.filter((stamp) => {
      return stamp.usable;
    });

    // Upload Logo
    let logoBatchID = usableStamps[0].batchID;
    let submittedPayload = payload;
    if (imageFile) {
      try {
        const { reference } = await bee.uploadFile(logoBatchID, imageFile);
        const imageLink = `${beeUrl}/bzz/${reference}`;
        submittedPayload.header.logo = imageLink;
      } catch (e) {
        // setError(e)
        console.log(e);
      }
    }

    // Upload Payload
    let payloadBatchID = usableStamps[1].batchID;
    const { reference } = await bee.uploadData(
      payloadBatchID,
      JSON.stringify(submittedPayload)
    );
    setReference(reference);
    setIsLoadingCreate(false);
    setIsModalSwarmOpen(true);
  };

  // NOTE Logo
  const previewImage = useRef(null);
  const buttonUpload = useRef(null);
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const handlerPreviewImage = (e) => {
    const [file] = e.target.files;
    if (file) {
      const urlObject = URL.createObjectURL(file);
      setPreviewImageSrc(urlObject);
      previewImage.current.src = urlObject;
      setImageFile(file);
    }
  };

  // NOTE payload
  const [payload, setPayload] = useState(null);
  useEffect(() => {
    setPayload({
      header: {
        logo: previewImageSrc,
        restaurantName,
      },
      categories,
      products,
      backgroundColor,
    });
  }, [restaurantName, categories, products, backgroundColor, previewImageSrc]);

  const [isModalDetailShow, setIsModalDetailShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const bee = new Bee(beeUrl);
  const beeDebug = new BeeDebug(beeDebugUrl);

  return (
    <div
      className="relative background-wrapper py-10"
      style={{ backgroundColor: backgroundColor.container1 }}
    >
      <div className="container border p-3 rounded-md bg-gray-100 text-gray-500">
        <h2 className="mb-2">Enter your restaurant name and logo</h2>

        <div
          className="text-white drop-shadow-md rounded-lg w-full flex justify-center py-5 font-bold"
          style={{ backgroundColor: backgroundColor.container2 }}
        >
          <div className="flex gap-x-3 items-center w-full justify-center">
            <div
              className="cursor-pointer"
              onClick={() => {
                buttonUpload.current.click();
              }}
            >
              <img
                ref={previewImage}
                src="/images/default-image.png"
                width={"75px"}
                height={"75px"}
                alt={"upload"}
                className={`rounded-full ${previewImageSrc ? "" : "hidden"}`}
              />

              <input
                ref={buttonUpload}
                type="file"
                accept="image/*"
                onChange={handlerPreviewImage}
                className="hidden"
              />

              <img
                src="/images/default-image.png"
                alt=""
                className={`w-12 h-12 rounded bg-white  ${
                  previewImageSrc ? "hidden" : ""
                }`}
              />
            </div>

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
              <h2
                className="cursor-pointer"
                onClick={() => setIsEditRestaurantName(true)}
              >
                {restaurantName}
              </h2>
            )}
          </div>
        </div>
      </div>
      <div className="container bg-white drop-shadow-md rounded-lg mt-4 p-8 ">
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
          <div className={"flex gap-x-5 w-full"}>
            <aside
              className="w-2/12 overflow-auto "
              style={{ maxHeight: "70vh" }}
            >
              <ul className="list-none">
                {categories.map(({ category }, index) => (
                  <li
                    key={index}
                    className={`p-3 first-letter:uppercase  cursor-pointer text-hover-bee-main transition-all duration-75 border rounded-md mb-2 shadow ${
                      selectedCategoryIndex === index
                        ? "border rounded bg-bee-main text-white hover:text-white"
                        : ""
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
              style={{ maxHeight: "70vh", height: "70vh" }}
            >
              <div className="grid grid-cols-3 gap-4">
                {products
                  .filter(
                    (product) =>
                      product.category.toLowerCase() ===
                      categories[selectedCategoryIndex]?.category?.toLowerCase()
                  )
                  .map((product, index) => (
                    <div
                      key={index}
                      className="border rounded-md shadow-md hover:shadow-lg relative cursor-pointer"
                      onClick={() => {
                        setIsModalDetailShow(true);
                        setSelectedItem(product);
                      }}
                    >
                      <figure className="bg-white rounded-md">
                        <div className="relative">
                          <Img
                            src={product.image}
                            height="100%"
                            width="100%"
                            alt={""}
                            classname="object-cover rounded-tl-md rounded-tr-md"
                          />

                          <div className="meta">
                            <p className="mt-3 px-3 text-lg text-white">
                              $ {formatCurrency(product.price)}
                            </p>
                          </div>
                        </div>

                        <figcaption className="p-4 text-black">
                          <h2 className="text-gray-900 text-center font-bold">
                            {product.name}
                          </h2>
                          <h3 className="text-gray-900 text-sm mt-3 truncate ">
                            {product.description}
                          </h3>
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
          style={{ maxHeight: "75vh" }}
        >
          <button
            className="text-white px-4 w-auto h-12 bg-orange-400 rounded-full hover:bg-orange-500 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
            onClick={() => handleCreatePage()}
          >
            <span>{isLoadingCreate ? "Creating page .." : "Create Page"}</span>
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

      {reference !== null && (
        <SwarmReferenceModal
          isOpen={isModalSwarmOpen}
          referenceCode={reference}
          onRequestClose={() => {
            setIsModalSwarmOpen(false);
            setReference(null);
          }}
          payload={payload}
        />
      )}

      <DetailMenuItemModal
        isOpen={isModalDetailShow}
        data={selectedItem}
        onRequestClose={() => setIsModalDetailShow(false)}
      />
    </div>
  );
}
