/* eslint-disable @next/next/no-img-element */

import React, { useRef, useState } from "react";

import BaseModal from "./BaseModal";

import { ContainerModal, HeaderModal, BodyModal } from "@styles/global.style";
import IconClose from "@public/images/icon-close.svg";
import { Bee, BeeDebug } from "@ethersphere/bee-js";

interface ModalProps {
  isOpen: boolean;
  shouldCloseOnOverlayClick?: boolean;
  onSubmit: (paylaod: any) => void;
  onRequestClose: () => void;
}

export default function CreateMenuModal({
  isOpen,
  shouldCloseOnOverlayClick,
  onSubmit,
  onRequestClose,
}: ModalProps) {
  const beeUrl = "http://localhost:1633";
  const beeDebugUrl = "http://localhost:1635";
  const previewImage = useRef(null);
  const buttonUpload = useRef(null);

  const [previewImageSrc, setPreviewImageSrc] = useState("");
  const [item, setItem] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlerSubmit = async () => {
    setUploading(true);
    let submittedItem = {};
    if (imageFile) {
      try {
        const ps = await beeDebug.getAllPostageBatch();
        let usableStamps = ps.filter((stamp) => {
          return stamp.usable;
        });
        let batchID = usableStamps[0].batchID;

        const { reference } = await bee.uploadFile(batchID, imageFile);
        const imageLink = `${beeUrl}/bzz/${reference}`;
        submittedItem = { ...item, image: imageLink };
      } catch (e) {
        // setError(e)
        console.log(e);
      } finally {
        setUploading(false);
      }
    }

    onSubmit(submittedItem);
    onRequestClose();
  };

  const handlerPreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [file] = e.target.files;
    if (file) {
      const urlObject = URL.createObjectURL(file);
      setPreviewImageSrc(urlObject);
      previewImage.current.src = urlObject;
      setImageFile(file);
    }
  };

  const bee = new Bee(beeUrl);
  const beeDebug = new BeeDebug(beeDebugUrl);

  return (
    <BaseModal
      maxWidth={640}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={onRequestClose}
    >
      <ContainerModal>
        <HeaderModal>
          <div className="flex items-center justify-between">
            <p>ADD MENU</p>
            <button
              className="flex justify-center items-center w-4 h-w-4"
              onClick={onRequestClose}
            >
              <IconClose />
            </button>
          </div>
        </HeaderModal>
        <BodyModal>
          <div className="container">
            {/* Image */}
            <div className="flex justify-center items-center">
              <div
                className="border rounded-lg border-gray-100 p-6 cursor-pointer"
                onClick={() => {
                  buttonUpload.current.click();
                }}
              >
                <div className={`no-image ${previewImageSrc ? "hidden" : ""}`}>
                  <div className="flex justify-center items-center">
                    <img
                      src="/images/default-image.png"
                      width={"110px"}
                      height={"110px"}
                      alt={"upload"}
                    />
                  </div>

                  <p className="text-gray-300 text-sm mt-3">
                    Upload File to preview your item image
                  </p>
                </div>

                <img
                  ref={previewImage}
                  src="/images/default-image.png"
                  width={"100%"}
                  height={"100%"}
                  alt={"upload"}
                  className={`rounded-md ${previewImageSrc ? "" : "hidden"}`}
                />

                <input
                  ref={buttonUpload}
                  type="file"
                  accept="image/*"
                  onChange={handlerPreviewImage}
                  className="hidden"
                />
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="category" className="text-gray-300 ">
                Category
              </label>
              <input
                id="category"
                type="text"
                className="border border-gray-300 mt-2 text-sm rounded-md block w-full focus:border-black focus-visible:outline-none py-2 px-4 text-black "
                placeholder="enter menu category"
                onChange={(e) => setItem({ ...item, category: e.target.value })}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-x-3">
              <div className="mt-3 md:w-1/2">
                <label htmlFor="name" className="text-gray-300 ">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="border border-gray-300 mt-2 text-sm rounded-md block w-full focus:border-black focus-visible:outline-none py-2 px-4 text-black "
                  placeholder="enter item name"
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                />
              </div>
              <div className="mt-3 md:w-1/2">
                <label htmlFor="price" className="text-gray-300 ">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.1"
                  min="0.1"
                  className="border border-gray-300 mt-2 text-sm rounded-md block w-full focus:border-black focus-visible:outline-none py-2 px-4 text-black "
                  placeholder="enter item price"
                  onChange={(e) => setItem({ ...item, price: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-3">
              <label htmlFor="description" className="text-gray-300 ">
                Description
              </label>
              <textarea
                id="description"
                placeholder="enter item description"
                className="border border-gray-300 mt-2 text-sm rounded-md block w-full focus:border-black focus-visible:outline-none py-2 px-4 text-black "
                onChange={(e) =>
                  setItem({ ...item, description: e.target.value })
                }
              ></textarea>
            </div>

            <div className="mt-3">
              <button
                className="px-10 py-3 border cursor-pointer hover:bg-orange-400 hover:text-white hover:font-bold rounded-full transition-all duration-200"
                onClick={handlerSubmit}
              >
                {uploading ? "Saving ..." : "Save"}
              </button>
            </div>
          </div>
        </BodyModal>
      </ContainerModal>
    </BaseModal>
  );
}
