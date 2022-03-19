import React, { useEffect, useState } from 'react';

import BaseModal from './BaseModal';
import formatCurrency from '@helpers/formatCurrency';

import { ContainerModal, HeaderModal, BodyModal } from '@styles/global.style';
import IconClose from '@public/images/icon-close.svg';
import Img from '@components/Img/Img';

interface ModalProps {
  isOpen: boolean;
  shouldCloseOnOverlayClick?: boolean;
  data: any;
  onRequestClose: () => void;
}

export default function DetailMenuItemModal({
  isOpen,
  shouldCloseOnOverlayClick,
  data,
  onRequestClose,
}: ModalProps) {
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
            <p>DETAIL ITEM</p>
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
            <Img
              src={`${
                data?.image ? data?.image : '/images/default-locker.png'
              }`}
              alt={data?.name}
              width={'50%'}
              height={'50%'}
              classname="rounded-md"
            />
            <div className="flex items-center justify-between">
              <div className="detail">
                <h2 className="font-medium text-base my-2">{data?.name}</h2>
                <h3 className="text-lg font-bold">
                  $ {formatCurrency(data?.price ?? 0)}
                </h3>
                <h4>{data?.description}</h4>
              </div>
            </div>
          </div>
        </BodyModal>
      </ContainerModal>
    </BaseModal>
  );
}
