import Img from "@components/Img/Img";
import React, { useEffect, useRef, useState } from "react";
import { BeeDebug, Bee } from "@ethersphere/bee-js";

import formatCurrency from "@helpers/formatCurrency";

type Props = {
  orders: any;
  customer: string;
  tableNo: Number | null;
  onOrderSubmitted: (orderReference: string, payload: any) => void;
};

function Receipt({ orders, customer, tableNo, onOrderSubmitted }: Props) {
  const [summary, setSummary] = useState(null);
  const [isShowReceipt, setIsShowReceipt] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  const beeUrl = "http://localhost:1633";
  const beeDebugUrl = "http://localhost:1635";

  const beeDebug = new BeeDebug(beeDebugUrl);
  const bee = new Bee(beeUrl);

  useEffect(() => {
    let total: any = 0;
    orders.forEach((order) => {
      total += order.item.price * order.qty;
    });

    const tax = total * 0.1;
    const grandTotal = total + tax;

    setSummary({
      total,
      tax,
      grandTotal,
    });
  }, [orders]);

  const handlerSubmit = async () => {
    setOrderLoading(true);
    let orderSummary = {
      id: Date.now().toString(),
      orders,
      ...summary,
      customer,
      tableNo,
    };

    const ps = await beeDebug.getAllPostageBatch();
    let usableStamps = ps.filter((stamp) => {
      return stamp.usable;
    });
    let batchID = usableStamps[0].batchID;
    const { reference } = await bee.uploadData(
      batchID,
      JSON.stringify(orderSummary)
    );
    setOrderLoading(false);
    onOrderSubmitted(reference, orderSummary);
    console.log(orderSummary);
  };

  const carts = useRef(null);

  function clickOutside(event) {
    if (carts && !carts.current.contains(event.target)) setIsShowReceipt(false);
  }

  useEffect(() => {
    window.addEventListener("mousedown", clickOutside);
    return () => {
      window.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  return (
    <>
      <div
        className="absolute bottom-10 right-10 rounded animate-pulse"
        style={{ maxHeight: "75vh" }}
      >
        <button
          className="text-black px-4 w-auto h-12 bg-gray-100 rounded-full hover:bg-gray-300 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
          onClick={() => setIsShowReceipt(!isShowReceipt)}
        >
          <span>Checkout ({orders.length} items)</span>
        </button>
      </div>

      <div
        ref={carts}
        className="absolute bottom-24 right-10 bg-pink-50 w-64 rounded shadow-md overflow-auto no-scrollbar z-10"
        style={{ maxHeight: "75vh" }}
      >
        {isShowReceipt && (
          <>
            <h2 className="p-2 text-center">Your Orders</h2>
            <hr className="my-1" />

            <div className="items p-2">
              {orders.map((order, index) => (
                <div
                  className="flex gap-x-2 items-center border-b-2 py-2 transition ease-in-out duration-300"
                  key={index}
                >
                  <Img
                    height={75}
                    width={75}
                    alt={"item"}
                    classname="object-cover rounded-md"
                    layout={"fixed"}
                    src={order?.item?.image}
                  />
                  <div className="detail">
                    <h3 className="text-sm">{order.item?.name ?? "-"}</h3>
                    <p className="text-xs">
                      {order.qty ?? 0} x $ {formatCurrency(order.item?.price)}
                    </p>
                    <p className="text-xs font-bold mt-5">
                      ${" "}
                      {formatCurrency(
                        (order.item?.price * order.qty).toString()
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2 text-sm">
              <div className="flex justify-between">
                <h3>Total</h3>
                <p>$ {formatCurrency(summary?.total?.toString())}</p>
              </div>
              <div className="flex justify-between">
                <h3>Tax (10%)</h3>
                <p>$ {formatCurrency(summary?.tax?.toString())}</p>
              </div>
              <div className="flex justify-between">
                <h3>Grand Total</h3>
                <p className="font-bold">
                  $ {formatCurrency(summary?.grandTotal.toString())}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <button
                className={
                  "border rounded w-full py-2 text-white " +
                  (orderLoading ? "bg-gray-500" : "bg-bee-main")
                }
                onClick={handlerSubmit}
              >
                {orderLoading ? "PROCESSING .." : "ORDER"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Receipt;
