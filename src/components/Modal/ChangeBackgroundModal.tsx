/* eslint-disable @next/next/no-img-element */

import React, { useRef, useState } from 'react';

import BaseModal from './BaseModal';

import { ContainerModal, HeaderModal, BodyModal } from '@styles/global.style';
import IconClose from '@public/images/icon-close.svg';

interface ModalProps {
  isOpen: boolean;
  currentColor: any;
  shouldCloseOnOverlayClick?: boolean;
  onSubmit: (color: any) => void;
  onRequestClose: () => void;
}

export default function ChangeBackgroundModal({
  isOpen,
  shouldCloseOnOverlayClick,
  currentColor,
  onSubmit,
  onRequestClose,
}: ModalProps) {
  const [colors, setColors] = useState(currentColor);

  const handlerSubmit = () => {
    onSubmit(colors);
    onRequestClose();
  };
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
            <p>CHANGE BACKGROUND COLOR</p>
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
            <div className="mt-3">
              <label htmlFor="category" className="text-gray-300 ">
                Pick Background Color
              </label>
              <input
                id="category"
                type="color"
                value={colors.container1}
                className="border h-10 border-gray-300 mt-2 text-sm rounded-md block w-full focus:border-black focus-visible:outline-none py-2 px-4 text-black "
                onChange={(e) =>
                  setColors({ ...colors, container1: e.target.value })
                }
              />
            </div>
            <div className="mt-3">
              <label htmlFor="category" className="text-gray-300 ">
                Pick Header Color
              </label>
              <input
                id="category"
                type="color"
                value={colors.container2}
                className="border h-10 border-gray-300 mt-2 text-sm rounded-md block w-full focus:border-black focus-visible:outline-none py-2 px-4 text-black "
                onChange={(e) => {
                  setColors({ ...colors, container2: e.target.value });
                }}
              />
            </div>

            <button
              className="mt-3 px-10 py-3 border cursor-pointer hover:bg-orange-400 hover:text-white hover:font-bold rounded-full transition-all duration-200"
              onClick={handlerSubmit}
            >
              Apply
            </button>
          </div>
        </BodyModal>
      </ContainerModal>
    </BaseModal>
  );
}
