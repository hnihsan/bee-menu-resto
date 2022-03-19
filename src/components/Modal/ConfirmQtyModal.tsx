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
  category: string;
  orders: any;
  onSubmit: (paylaod: any) => void;
  onRequestClose: () => void;
}

export default function ConfirmQtyModal({
  isOpen,
  shouldCloseOnOverlayClick,
  data,
  category,
  orders,
  onSubmit,
  onRequestClose,
}: ModalProps) {
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setQty(1);
    setNotes('');

    if (orders.length > 0) {
      const isExist = orders.filter((order) => {
        return order.item.name === data.name;
      }).length;

      if (isExist) {
        const index = orders.findIndex(
          (order) => order.item.name === data.name
        );

        setQty(orders[index].qty);
        setNotes(orders[index].notes);
      }
    }
  }, [isOpen, orders, data]);

  useEffect(() => {
    setTotal(qty * data.price);
  }, [qty, data]);

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
      setTotal(data?.price * qty);
    }
  };

  const increment = () => {
    setQty(qty + 1);
    setTotal(data?.price * qty);
  };

  const handleNotes = (event) => {
    setNotes(event.target.value);
  };

  const handlerSubmit = () => {
    const payload = {
      category: category,
      item: data,
      qty,
      subtotal: total,
      notes: notes,
    };

    onSubmit(payload);
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
            <p>CONFIRMATION ORDER</p>
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
                  <span className="ml-1 text-xs">x {qty}</span>
                </h3>

                <div className="custom-number-input h-10 w-32 mt-3 flex items-center gap-x-5">
                  <label className="w-full text-gray-700 text-sm font-semibold">
                    Qty
                  </label>
                  <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                    <button
                      onClick={decrement}
                      data-action="decrement"
                      className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                      value={qty}
                      readOnly
                    />
                    <button
                      onClick={increment}
                      data-action="increment"
                      className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
              </div>
              <h4 className="text-lg font-bold">
                $ {formatCurrency(total.toString())}
              </h4>
            </div>
            <textarea
              className="mt-3 h-24 w-full border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300"
              placeholder="Add notes to your order . . ."
              value={notes}
              onChange={handleNotes}
            />
            <button
              className="mt-5 border p-4 w-full rounded text-white bg-bee-main font-bold"
              onClick={handlerSubmit}
            >
              CONFIRM
            </button>
          </div>
        </BodyModal>
      </ContainerModal>
    </BaseModal>
  );
}
