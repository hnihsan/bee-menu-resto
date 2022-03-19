import Img from '@components/Img/Img';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import formatCurrency from '@helpers/formatCurrency';
import ConfirmQtyModal from '@components/Modal/ConfirmQtyModal';
import Receipt from '@parts/Receipt';
import SwarmReferenceModal from '@components/Modal/SwarmReferenceModal';
type Props = {};

export default function Home({}: Props) {
  const [selectedCurrentIndex, setSelectedCurrentIndex] = useState(0);
  const datas = [
    {
      category: 'coffee',
      items: [
        {
          name: 'Long Black',
          price: '8',
          image:
            'https://gateway-proxy-bee-7-0.gateway.ethswarm.org/bzz/5abacee1baae3bc810b9213728db2d9d43674bfa1f5472315ebef75cb6e0d3ce/',
        },
        {
          name: 'Caramel Macchiato',
          price: '10',
          image:
            'https://gateway-proxy-bee-8-0.gateway.ethswarm.org/bzz/cac57098810ea60163e02fcfe017c207fd86ae99cff4001645fa171e6c4db5c7/',
        },
        {
          name: 'Cold Brew',
          price: '8',
          image:
            'https://gateway-proxy-bee-3-0.gateway.ethswarm.org/bzz/327630f7255c28418cac74235a4e2ed26e686aadda433a8cceeb815b497b2dd7/',
        },
        {
          name: 'Vanilla / Hazelnut / Caramel Latte',
          price: '10',
          image:
            'https://gateway-proxy-bee-5-0.gateway.ethswarm.org/bzz/a166cf2368528e75a0bb067c2641cfa6e0652e73b8a9919691e1c08453812645/',
        },
        {
          name: 'Mocha',
          price: '9',
          image:
            'https://gateway-proxy-bee-9-0.gateway.ethswarm.org/bzz/9c655539b6e599717ad241aaeed6714141d8f363877382ba00515f3ae2fcc83e/',
        },
        {
          name: 'Americano',
          price: '8',
          image:
            'https://gateway-proxy-bee-4-0.gateway.ethswarm.org/bzz/fd13139e112ad218a0c6d11f77c8ae370e01f0f59a36a390206b01f0c409c9dd/',
        },
      ],
    },
    {
      category: 'teas',
      items: [
        {
          name: 'Black Tea',
          price: '7',
          image:
            'https://gateway-proxy-bee-2-0.gateway.ethswarm.org/bzz/f7ce35d89b4404d4b1230511c31566704add994e95f4e21ea291c15a206bda78/',
        },
        {
          name: 'Green Tea',
          price: '7',
          image:
            'https://gateway-proxy-bee-1-0.gateway.ethswarm.org/bzz/a8d06e2dd8189704d674d846eda871919d95eece82c1641bcefd91145e51c424/',
        },
        {
          name: 'Jasmine Tea',
          price: '7',
          image:
            'https://gateway-proxy-bee-3-0.gateway.ethswarm.org/bzz/593c63e1657c5d0d5dbf37131ae44eb0ec8166b3233026fcd9c1f1942b3e093f/',
        },
        {
          name: 'Oolong Tea',
          price: '7',
          image:
            'https://gateway-proxy-bee-8-0.gateway.ethswarm.org/bzz/c35bb740435378f5bb4222d6111861816ed82ea3842c33c33c3053e28cf851c2/',
        },
      ],
    },
    {
      category: 'juices',
      items: [
        {
          name: 'Mango Passion Fruit',
          price: '8',
          image:
            'https://gateway-proxy-bee-2-0.gateway.ethswarm.org/bzz/a293c51025afe75dc6c98945577ab33776779a5d0005f240ad8cc6251b038669/',
        },
        {
          name: 'Raspberry Black Currant',
          price: '8',
          image:
            'https://gateway-proxy-bee-1-0.gateway.ethswarm.org/bzz/f837296b3ba8ef8d286cc211fe65676f2b77732dfc59f61eedc6c76877b3ece7/',
        },
      ],
    },
    {
      category: 'breakfasts',
      items: [
        {
          name: 'Blueberry / Strawberry Waffle',
          price: '10',
          image:
            'https://gateway-proxy-bee-8-0.gateway.ethswarm.org/bzz/fe619e36209844c621453e9fbea6eef4a3a786c4ccab638b9da14b79b1890481/',
        },
        {
          name: 'Scrambled Egg & Bacon',
          price: '15',
          image:
            'https://gateway-proxy-bee-2-0.gateway.ethswarm.org/bzz/8c90a5c6b3378bd1bc1c1ccc403d05b4ca1c4a02cfa7ef0996f56affed7c0c1c/',
        },
        {
          name: 'All-in-one Sandwich',
          price: '15',
          image:
            'https://gateway-proxy-bee-7-0.gateway.ethswarm.org/bzz/3a282c0fd97005214938a889931829683d517ef86f6347619d7229934bb4ae52/',
        },
        {
          name: 'Salad',
          price: '10',
          image:
            'https://gateway-proxy-bee-1-0.gateway.ethswarm.org/bzz/5a2e92b3681b4756195dfc6ea7c195146f4c2481ba60b8502de7e51cbc286a3c/',
        },
        {
          name: 'Full English Breakfast',
          price: '20',
          image:
            'https://gateway-proxy-bee-3-0.gateway.ethswarm.org/bzz/885832813ae859eeb9145ff0cd696774aaf27691ce93ad1c4511e37c4b7ced0b/',
        },
      ],
    },
  ];
  const tablesNumbers = [...Array(25).keys()];
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemCategory, setSelectedItemCategory] = useState('coffee');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [orders, setOrders] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('customer');
  const [payload, setPayload] = useState([]);
  const [orderReference, setOrderReference] = useState('');
  const [openSwarmModal, setOpenSwarmModal] = useState(false);

  const handleConfirmItem = (item: any) => {
    const isExist = orders.filter((order) => {
      return order.item.name === item.item.name;
    }).length;

    if (isExist) {
      const index = orders.findIndex(
        (order) => order.item.name === item.item.name
      );

      orders[index].qty = item.qty;
    } else {
      setOrders((oldOrders) => [...oldOrders, item]);
    }
  };

  const handleTabSwitch = (event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedTab(event.currentTarget.getAttribute('data-tabs'));
    setTabIndex(+event.currentTarget.getAttribute('data-tabIndex'));
  };

  const handleCustomerInput = (event) => {
    setCustomerName(event.currentTarget.value);
  };

  const handleSubmitCustomer = (event) => {
    setTabIndex(1);
    setSelectedTab('tables');
  };

  return (
    <div>
      <div className="container bg-white drop-shadow-md rounded-lg mt-16 w-1/2 flex justify-center">
        <div className="w-full max-w-lg">
          <ul id="tabs" className="inline-flex w-full px-1 pt-2 ">
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 0 ? '-mb-px border-b-4 border-bee-main' : '')
              }
            >
              <a
                className="tabs-navigation"
                data-tabindex="0"
                data-tabs="customer"
                onClick={handleTabSwitch}
              >
                Customer Info
              </a>
            </li>
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 1 ? '-mb-px border-b-4 border-bee-main' : '')
              }
            >
              {' '}
              &gt;{' '}
            </li>
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 1 ? '-mb-px border-b-4 border-bee-main' : '')
              }
            >
              <a
                className="tabs-navigation"
                data-tabindex="1"
                data-tabs="tables"
                onClick={handleTabSwitch}
              >
                Choose Table
              </a>
            </li>
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 2 ? '-mb-px border-b-4 border-bee-main' : '')
              }
            >
              {' '}
              &gt;{' '}
            </li>
            <li
              className={
                'px-4 py-2 font-semibold text-gray-800 rounded-t opacity-50' +
                (tabIndex >= 2 ? '-mb-px border-b-4 border-bee-main' : '')
              }
            >
              <a
                className="tabs-navigation"
                data-tabindex="2"
                data-tabs="menus"
                onClick={handleTabSwitch}
              >
                Main Menu
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container bg-white drop-shadow-md rounded-lg mt-4 p-8">
        <div
          className={
            'flex justify-center ' +
            (selectedTab === 'customer' ? '' : 'hidden')
          }
          id="customerID"
        >
          <div className="w-full max-w-md">
            <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Welcome to Bee Cafe, what can we call you?
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Enter your name"
                  value={customerName}
                  onChange={handleCustomerInput}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleSubmitCustomer}
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={selectedTab === 'tables' ? '' : 'hidden'} id="tableNo">
          <div
            className="w-12/12 overflow-auto p-4"
            style={{ maxHeight: '70vh', height: '70vh' }}
          >
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {tablesNumbers.map((item, index) => (
                <div
                  className={
                    'relative border rounded-md cursor-pointer hover:shadow-md ' +
                    (selectedTable == item + 1 &&
                      'border-4 border-bee-main rounded-lg font-bold')
                  }
                  style={{
                    height: '150px',
                    width: '150px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => {
                    setSelectedTable(item + 1);
                  }}
                  key={index}
                >
                  <button
                    className={
                      'absolute flex items-center justify-center gap-2 transition-all bg-bee-main w-8 h-8 rounded-br-lg top-0 left-0 ' +
                      (selectedTable == item + 1 ? '' : 'hidden')
                    }
                  >
                    <div className="justify-center flex items-center w-20 h-20 z-10">
                      <FaCheck className="text-white" />
                    </div>
                  </button>
                  <h1>{item + 1}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={
            'flex gap-x-5 w-full ' + (selectedTab === 'menus' ? '' : 'hidden')
          }
          id="menuOrders"
        >
          <aside
            className="w-2/12 overflow-auto "
            style={{ maxHeight: '70vh' }}
          >
            <ul className="list-none">
              {datas.map(({ category }, index) => (
                <li
                  key={index}
                  className={`p-3 first-letter:uppercase  cursor-pointer text-hover-bee-main transition-all duration-75 ${
                    selectedCurrentIndex === index
                      ? 'border rounded bg-bee-main text-white hover:text-white'
                      : ''
                  }`}
                  onClick={() => setSelectedCurrentIndex(index)}
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
              {datas[selectedCurrentIndex]?.items?.length > 0 ? (
                datas[selectedCurrentIndex].items.map((item, index) => (
                  <div
                    className="border rounded-md cursor-pointer hover:shadow-md relative"
                    onClick={() => {
                      setSelectedItem(item);
                      setSelectedItemCategory(
                        datas[selectedCurrentIndex].category
                      );
                      setIsModalOpen(true);
                    }}
                    key={index}
                  >
                    <figure className="bg-white rounded-md">
                      <div className="relative">
                        {orders.filter((order) => order.item.name === item.name)
                          .length > 0 && (
                          <div className="absolute w-10 h-10 z-10">
                            <Img
                              src="/images/icon-checklist.png"
                              height="100%"
                              width="100%"
                              alt={item?.name ?? '-'}
                              classname="object-cover rounded-tl-md rounded-tr-md"
                            />
                          </div>
                        )}

                        <Img
                          src={item?.image}
                          height="100%"
                          width="100%"
                          alt={item?.name ?? '-'}
                          classname="object-cover rounded-tl-md rounded-tr-md"
                        />

                        <div className="meta">
                          <p className="mt-3 px-3 text-lg text-white">
                            $ {formatCurrency(item?.price)}
                          </p>
                        </div>
                      </div>

                      <figcaption className="p-4 text-black text-center">
                        <h2 className="text-gray-900 text-center text-sm">
                          {item?.name ?? '-'}
                        </h2>
                      </figcaption>
                    </figure>
                  </div>
                ))
              ) : (
                <h2>Sorry, no item available</h2>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedItem && (
        <ConfirmQtyModal
          orders={orders}
          data={selectedItem}
          category={selectedItemCategory}
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onSubmit={(payload) => {
            handleConfirmItem(payload);
          }}
          shouldCloseOnOverlayClick={true}
        />
      )}

      {orders.length > 0 && (
        <Receipt
          customer={customerName}
          tableNo={selectedTable}
          orders={orders}
          onOrderSubmitted={(orderReference, payload) => {
            setOrderReference(orderReference);
            setPayload(payload);
            setOpenSwarmModal(true);
            setOrders([]);
          }}
        />
      )}


      <SwarmReferenceModal
        isOpen={openSwarmModal}
        shouldCloseOnOverlayClick={false}
        referenceCode={orderReference}
        payload={payload}
        onRequestClose={() => setOpenSwarmModal(false)}
      />
    </div>
  );
}
