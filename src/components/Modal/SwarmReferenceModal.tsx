import React, { useState } from 'react';
import Link from 'next/link';

import { FaCopy } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';

import BaseModal from './BaseModal';

import { ContainerModal, HeaderModal, BodyModal } from '@styles/global.style';
import IconClose from '@public/images/icon-close.svg';
import toImg from 'react-svg-to-image';
import Loading from '@components/Loading/Loading';

interface ModalProps {
  isOpen: boolean;
  shouldCloseOnOverlayClick?: boolean;
  referenceCode: string;
  payload: any;
  onRequestClose: () => void;
}

export default function SwarmReferenceModal({
  isOpen,
  shouldCloseOnOverlayClick,
  referenceCode,
  payload,
  onRequestClose,
}: ModalProps) {
  const [copyBtn, setCopyBtn] = useState('Copy');
  const ReactJson = dynamic(import('react-json-view'), { ssr: false });
  const handleCopy = () => {
    setCopyBtn('Copied !');
    setTimeout(() => setCopyBtn('Copy'), 1000);
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
            <p className="font-bold">YOUR PAGE IS READY</p>
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
            <Loading />

            <p className="text-center">This is your Reference Code</p>

            <div className="w-full border rounded-xl h-24 mt-2">
              <p className="break-words mx-3 my-3 text-lg font-bold">
                {referenceCode}
              </p>
            </div>

            <div className="w-full mt-2 flex justify-center">
              <CopyToClipboard text={referenceCode}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline inline-flex"
                  onClick={handleCopy}
                >
                  <FaCopy className="text-white" /> &nbsp; {copyBtn}
                </button>
              </CopyToClipboard>
            </div>

            <div className="flex gap-x-5 items-center mt-3">
              <div className="border rounded-xl mt-2 p-3 w-full">
                <div className="flex justify-center items-center">
                  <QRCode
                    id="qr-code"
                    value={`http://localhost:3000/${referenceCode}`}
                    size={100}
                  />
                </div>

                <Link href={'/[referenceCode]'} as={`/${referenceCode}`}>
                  <a
                    target={'_blank'}
                    className="block mt-3 w-full text-center bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                  >
                    Open Link
                  </a>
                </Link>
                <button
                  onClick={() => {
                    toImg('#qr-code', `${payload.header.restaurantName}-menu`);
                  }}
                  className="block mt-3 w-full text-center bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                >
                  Download QR
                </button>
              </div>

              {false && (
                <div className="mt-5">
                  <p className="mb-2">Uploaded data to SWARM Preview :</p>
                  <ReactJson
                    src={payload}
                    collapseStringsAfterLength={25}
                    name={'payload'}
                    collapsed={true}
                  />
                </div>
              )}
            </div>
          </div>
        </BodyModal>
      </ContainerModal>
    </BaseModal>
  );
}
