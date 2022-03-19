import React, { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import QRCode from "react-qr-code";

import BaseModal from "./BaseModal";

import { ContainerModal, HeaderModal, BodyModal } from "@styles/global.style";
import IconClose from "@public/images/icon-close.svg";
import toImg from "react-svg-to-image";

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
  const [copyBtn, setCopyBtn] = useState("Copy");
  const ReactJson = dynamic(import("react-json-view"), { ssr: false });
  const handleCopy = () => {
    setCopyBtn("Copied !");
    setTimeout(() => setCopyBtn("Copy"), 1000);
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
            <div className="flex gap-x-5 items-center mt-3">
              <div className="border rounded-xl mt-2 p-3 w-full">
                <div className="flex justify-center items-center">
                  <QRCode
                    id="qr-code"
                    value={`http://localhost:3000/${referenceCode}`}
                    size={100}
                  />
                </div>

                <Link href={"/[referenceCode]"} as={`/${referenceCode}`}>
                  <a
                    target={"_blank"}
                    className="block mt-3 w-full text-center bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
                  >
                    Open Link
                  </a>
                </Link>
                <button
                  onClick={() => {
                    toImg("#qr-code", "name");
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
                    name={"payload"}
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
