import React, { useState, useEffect } from 'react';
import { fetchOrderPikup } from '../api/storeApi';

function UserSection() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [selectedUser, setSelectedUser] = useState(null);
  const [discountValue, setDiscountValue] = useState(5);
  const [discountType, setDiscountType] = useState('percent');
  const [billingMethod, setBillingMethod] = useState('piece');
  const [weightInKg, setWeightInKg] = useState(1);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const priceConfig = {
    piece: 50,
    kg: 100,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchOrderPikup();
        if (response.success) {
          // Assuming the API returns an array of orders
          // If it returns a single order, wrap it in an array
          const ordersData = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setOrders(ordersData);
        } else {
          console.error('Failed to fetch orders:', response.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const pendingOrders = orders.filter(
    (order) => order.orderStatus.toLowerCase() === 'pending',
  );
  const completeOrders = orders.filter(
    (order) => order.orderStatus.toLowerCase() === 'complete',
  );

  const ordersToShow = activeTab === 'Pending' ? pendingOrders : completeOrders;

  const openBillModal = (order) => {
    setSelectedUser(order);
    setDiscountValue(5);
    setDiscountType('percent');
    setBillingMethod('piece');
    setWeightInKg(1);
  };

  const closeBillModal = () => setSelectedUser(null);

  const calculateSummary = (order) => {
    let total = 0;

    // Calculate total based on cart items
    if (billingMethod === 'piece') {
      total = order.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.perAmmount,
        0,
      );
    } else if (billingMethod === 'kg') {
      total = weightInKg * priceConfig.kg;
    }

    const discount =
      discountType === 'percent'
        ? (total * discountValue) / 100
        : Math.min(discountValue, total);

    const finalAmount = total - discount;
    return { total, discount, finalAmount };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="rounded-sm border border-stroke bg-white px-2 sm:px-5 pt-4 pb-2 sm:pt-6 sm:pb-2.5 shadow-default xl:pb-1">
        <h4 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold text-black">
          Order Status
        </h4>

        <div className="flex justify-center gap-2 sm:gap-4 mb-4">
          {['Pending', 'Complete'].map((tab) => (
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

        {ordersToShow.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No {activeTab.toLowerCase()} orders found
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Table Header - Hidden on mobile, shown on sm and up */}
            <div className="hidden sm:grid sm:grid-cols-6 rounded-sm bg-gray-100 font-semibold">
              <div className="p-2 xl:p-5">Name</div>
              <div className="p-2 text-center xl:p-5">Contact</div>
              <div className="p-2 text-center xl:p-5">Service</div>
              <div className="p-2 text-center xl:p-5">Items</div>
              <div className="p-2 text-center xl:p-5">Order Date</div>
              <div className="p-2 text-center xl:p-5">Action</div>
            </div>

            {/* Mobile Table Header - Shown only on mobile */}
            <div className="sm:hidden grid grid-cols-2 rounded-sm bg-gray-100 font-semibold">
              <div className="p-2">Order Details</div>
              <div className="p-2 text-center">Action</div>
            </div>

            {/* Table Rows */}
            {ordersToShow.map((order, index) => (
              <React.Fragment key={order._id}>
                {/* Desktop View */}
                <div
                  className={`hidden sm:grid sm:grid-cols-6 items-center ${
                    index !== ordersToShow.length - 1
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
                    {order.cartItems
                      .map((item) => item.serviceType.join(', '))
                      .join(', ')}
                  </div>
                  <div className="p-2 text-center xl:p-5">
                    {order.cartItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    )}
                  </div>
                  <div className="p-2 text-center xl:p-5">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="p-2 text-center xl:p-5">
                    <button
                      onClick={() => openBillModal(order)}
                      className="bg-blue-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded hover:bg-blue-600 transition text-sm sm:text-base"
                    >
                      Generate Bill
                    </button>
                  </div>
                </div>

                {/* Mobile View */}
                <div
                  className={`sm:hidden grid grid-cols-2 items-center ${
                    index !== ordersToShow.length - 1
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
                      {order.cartItems
                        .map((item) => item.serviceType.join(', '))
                        .join(', ')}{' '}
                      •{' '}
                      {order.cartItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}{' '}
                      items
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-2 text-center">
                    <button
                      onClick={() => openBillModal(order)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition text-sm"
                    >
                      Bill
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeBillModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold mb-4">
              Bill Summary for {selectedUser.firstName} {selectedUser.lastName}
            </h3>

            {/* Billing Method */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Billing Method:</label>
              <div className="flex flex-wrap gap-4">
                {['piece', 'kg'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="radio"
                      value={type}
                      checked={billingMethod === type}
                      onChange={() => setBillingMethod(type)}
                      className="mr-2"
                    />
                    {type === 'piece' ? 'Per Piece' : 'Per Kg'}
                  </label>
                ))}
              </div>
              {billingMethod === 'kg' && (
                <div className="mt-2">
                  <label className="block font-medium">Weight (kg):</label>
                  <input
                    type="number"
                    value={weightInKg}
                    onChange={(e) => setWeightInKg(Number(e.target.value))}
                    min="0.1"
                    step="0.1"
                    className="p-2 border rounded w-full"
                  />
                </div>
              )}
            </div>

            {/* Discount Input */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Discount:</label>
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="percent"
                    checked={discountType === 'percent'}
                    onChange={() => setDiscountType('percent')}
                    className="mr-2"
                  />
                  Percentage
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="fixed"
                    checked={discountType === 'fixed'}
                    onChange={() => setDiscountType('fixed')}
                    className="mr-2"
                  />
                  Fixed Amount
                </label>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(Number(e.target.value))}
                  min="0"
                  className="p-2 border rounded w-full"
                />
                <span className="ml-2">
                  {discountType === 'percent' ? '%' : '₹'}
                </span>
              </div>
            </div>

            {/* Bill Summary */}
            {(() => {
              const { total, discount, finalAmount } =
                calculateSummary(selectedUser);
              return (
                <div className="space-y-2 text-sm border-t pt-4">
                  <p>
                    <strong>Services:</strong>{' '}
                    {selectedUser.cartItems
                      .map((item) => item.serviceType.join(', '))
                      .join(', ')}
                  </p>
                  <p>
                    <strong>Total Items:</strong>{' '}
                    {selectedUser.cartItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    )}
                  </p>
                  <p>
                    <strong>Total:</strong> ₹{total}
                  </p>
                  <p>
                    <strong>Discount:</strong> ₹{discount}
                  </p>
                  <p className="font-bold text-blue-600">
                    Final Amount: ₹{finalAmount}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserSection;
