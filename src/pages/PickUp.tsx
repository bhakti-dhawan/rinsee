import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchOrderPikup, updatePickupStatus } from '../api/storeApi';

const PickupOrders = () => {
  const [activeTab, setActiveTab] = useState('Pickup');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatPickupDate = (dateString) => {
    if (!dateString) return '';
    return dateString.split(' ').join('/');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await fetchOrderPikup();
        console.log('data', data);
        const requestedOrders =
          data?.data.filter((order) => order.pickUpReqStatus === 'requested') ||
          [];
        setOrders(requestedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) =>
    activeTab === 'Pickup'
      ? order.isExpress === 'No'
      : order.isExpress === 'Yes',
  );

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  const handleConfirmPickup = async (orderId) => {
    try {
      await updatePickupStatus(orderId, 'confirm');
      setOrders(orders.filter((order) => order._id !== orderId));
      navigate('/user');
    } catch (error) {
      console.error('Error confirming pickup:', error);
    }
  };

  if (loading) return <div className="text-center py-6">Loading orders...</div>;

  return (
    <div className="relative">
      <div className="rounded-sm border border-stroke bg-white px-2 sm:px-5 pt-4 pb-2 sm:pt-6 sm:pb-2.5 shadow-default xl:pb-1">
        <h4 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-black">
          Pickup Orders
        </h4>

        <div className="flex justify-center gap-2 sm:gap-4 mb-4">
          {['Pickup', 'Express Pickup'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base font-medium ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="border-b border-stroke mb-4"></div>

        <div className="flex flex-col">
          {/* Desktop Table Header */}
          <div className="hidden sm:grid sm:grid-cols-6 rounded-sm bg-gray-100 font-semibold">
            <div className="p-2 xl:p-5">Customer</div>
            <div className="p-2 text-center xl:p-5">Contact</div>
            <div className="p-2 text-center xl:p-5">Services</div>
            <div className="p-2 text-center xl:p-5">Pickup Date</div>
            <div className="p-2 text-center xl:p-5">Order Date</div>
            <div className="p-2 text-center xl:p-5">Confirmation</div>
          </div>

          {/* Mobile Table Header */}
          <div className="sm:hidden grid grid-cols-2 rounded-sm bg-gray-100 font-semibold">
            <div className="p-2">Order Details</div>
            <div className="p-2 text-center">Action</div>
          </div>

          {/* Table Rows */}
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <React.Fragment key={order._id}>
                {/* Desktop View */}
                <div
                  className={`hidden sm:grid sm:grid-cols-6 items-center ${
                    index !== filteredOrders.length - 1
                      ? 'border-b border-stroke'
                      : ''
                  }`}
                >
                  <div className="p-2 xl:p-5 truncate">
                    {order.firstName} {order.lastName}
                  </div>
                  <div className="p-2 text-center xl:p-5">
                    {order.userContact}
                  </div>
                  <div className="p-2 text-center xl:p-5 truncate">
                    {order.cartItems[0].serviceType.join(', ')}
                  </div>
                  <div className="p-2 text-center xl:p-5">
                    {formatPickupDate(order.pickUpRequesData)}
                  </div>
                  <div className="p-2 text-center xl:p-5">
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="p-2 text-center xl:p-5 flex justify-center gap-2">
                    <button
                      onClick={() => openOrderDetails(order)}
                      className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded hover:bg-blue-600 transition text-sm sm:text-base"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleConfirmPickup(order._id)}
                      className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded hover:bg-green-600 transition text-sm sm:text-base"
                    >
                      Confirm
                    </button>
                  </div>
                </div>

                {/* Mobile View */}
                <div
                  className={`sm:hidden grid grid-cols-2 items-center ${
                    index !== filteredOrders.length - 1
                      ? 'border-b border-stroke'
                      : ''
                  }`}
                >
                  <div className="p-2">
                    <div className="font-medium">
                      {order.firstName} {order.lastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.userContact}
                    </div>
                    <div className="text-sm">
                      {order.cartItems[0].serviceType.join(', ')}
                    </div>
                    <div className="text-sm text-gray-500">
                      Pickup: {formatPickupDate(order.pickUpRequesData)}
                    </div>
                    <div className="text-sm">
                      Order Date: {new Date().toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-2 text-center space-y-1">
                    <button
                      onClick={() => openOrderDetails(order)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition text-sm w-full"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleConfirmPickup(order._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition text-sm w-full"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            <div className="py-4 text-center text-gray-500">
              No {activeTab.toLowerCase()} orders found
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeOrderDetails}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold mb-4">
              Order Details - {selectedOrder.firstName} {selectedOrder.lastName}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-700">
                  Customer Information
                </h4>
                <div className="mt-2 space-y-1 pl-2">
                  <p>
                    Name: {selectedOrder.firstName} {selectedOrder.lastName}
                  </p>
                  <p>Contact: {selectedOrder.userContact}</p>
                  <p>Address: {selectedOrder.userAddress}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Order Information</h4>
                <div className="mt-2 space-y-1 pl-2">
                  <p>
                    Order Type:{' '}
                    {selectedOrder.isExpress === 'Yes'
                      ? 'Express Pickup'
                      : 'Standard Pickup'}
                  </p>
                  <p>
                    Pickup Date:{' '}
                    {formatPickupDate(selectedOrder.pickUpRequesData)}
                  </p>
                  <p>
                    Status:{' '}
                    <span className="capitalize">
                      {selectedOrder.pickUpReqStatus}
                    </span>
                  </p>
                  <p>Order Date: {new Date().toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700">Services</h4>
                <ul className="mt-2 pl-2">
                  {selectedOrder.cartItems.map((item, index) => (
                    <li key={index} className="mb-1">
                      <div className="flex justify-between">
                        <span>{item.serviceType.join(', ')}</span>
                        <span>{item.quantity} item(s)</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t flex justify-between">
                <button
                  onClick={() => handleConfirmPickup(selectedOrder._id)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                >
                  Confirm Pickup
                </button>
                <button
                  onClick={closeOrderDetails}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PickupOrders;
