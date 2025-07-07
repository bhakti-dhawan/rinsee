import React, { useState } from 'react';
import {
  Printer,
  Twitter,
  Facebook,
  Pointer as Pinterest,
  Linkedin,
} from 'lucide-react';

const Invoice = () => {
  const [status, setStatus] = useState('Inprocess');

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleUpdate = () => {
    alert(`Status updated to: ${status}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-2 sm:px-5 pt-4 pb-2 sm:pt-6 sm:pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:pb-1">
      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-2 sm:p-4">
        <div className="bg-white shadow-sm border border-gray-200 rounded">
          {/* Print and Share Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 border-b border-gray-200 gap-2 sm:gap-0">
            <div>
              <button
                className="p-2 hover:bg-gray-100 rounded transition-colors flex items-center gap-1"
                aria-label="Print invoice"
              >
                <Printer size={18} className="sm:size-5" />
                <span className="text-sm sm:text-base">Print</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm sm:text-base">SHARE</span>
              <div className="inline-flex space-x-1 sm:space-x-2">
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} className="sm:size-5" />
                </a>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} className="sm:size-5" />
                </a>
                <a
                  href="#"
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Share on Pinterest"
                >
                  <Pinterest size={18} className="sm:size-5" />
                </a>
                <a
                  href="#"
                  className="text-blue-700 hover:text-blue-900 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} className="sm:size-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Laundry Request Details */}
          <div className="p-2 sm:p-4">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <tbody>
                  {/* Mobile view - stacked rows */}
                  <div className="sm:hidden space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Date of Laundry</span>
                        <span>2023-08-20</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Posting Date</span>
                        <span>2023-08-16 13:23:36</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Top Wear</span>
                        <span>7</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Bottom Wear</span>
                        <span>5</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Woolen Cloth</span>
                        <span>8</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Others</span>
                        <span>10</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Service</span>
                        <span>pickupservice</span>
                      </div>
                      <div className="border-b border-gray-200 pb-2">
                        <div className="font-medium">Pickup Address</div>
                        <div className="text-sm">
                          A 123 XYZ Apartment New Delhi 110092
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Customer Name</span>
                        <span>Rahul Sharma</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Customer Number</span>
                        <span>+91 9876543210</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Description</span>
                        <span>NA</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="font-medium">Payment Method</span>
                        <span>Cash on Delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop view - table */}
                  <div className="hidden sm:block">
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Date of Laundry
                      </td>
                      <td className="py-2 px-2 sm:px-4">2023-08-20</td>
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Posting Date
                      </td>
                      <td className="py-2 px-2 sm:px-4">2023-08-16 13:23:36</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Top Wear
                      </td>
                      <td className="py-2 px-2 sm:px-4">7</td>
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Bottom Wear
                      </td>
                      <td className="py-2 px-2 sm:px-4">5</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Woolen Cloth
                      </td>
                      <td className="py-2 px-2 sm:px-4">8</td>
                      <td className="py-2 px-2 sm:px-4 font-medium">Others</td>
                      <td className="py-2 px-2 sm:px-4">10</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2 sm:px-4 font-medium">Service</td>
                      <td className="py-2 px-2 sm:px-4">pickupservice</td>
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Pickup Address
                      </td>
                      <td className="py-2 px-2 sm:px-4">
                        A 123 XYZ Apartment New Delhi 110092
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Customer Name
                      </td>
                      <td className="py-2 px-2 sm:px-4">Rahul Sharma</td>
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Customer Number
                      </td>
                      <td className="py-2 px-2 sm:px-4">+91 9876543210</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Description
                      </td>
                      <td className="py-2 px-2 sm:px-4">NA</td>
                      <td className="py-2 px-2 sm:px-4 font-medium">
                        Payment Method
                      </td>
                      <td className="py-2 px-2 sm:px-4">Cash on Delivery</td>
                    </tr>
                  </div>
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice Section */}
          <div className="p-2 sm:p-4">
            <h3 className="text-red-500 font-bold mb-2 sm:mb-4 text-lg sm:text-xl">
              Invoice of the Above Laundry request
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-2 sm:px-4 text-left border border-gray-200 text-sm sm:text-base">
                      #
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-left border border-gray-200 text-sm sm:text-base">
                      Clothes
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-left border border-gray-200 text-sm sm:text-base">
                      Qty
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-left border border-gray-200 text-sm sm:text-base">
                      Per Price
                    </th>
                    <th className="py-2 px-2 sm:px-4 text-left border border-gray-200 text-sm sm:text-base">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      1
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      Top Wear
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      7
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      14
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      98
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      2
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      Bottom Wear
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      5
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      22
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      110
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      3
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      Woolen Wear
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      8
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      20
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      160
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      4
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      Others
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      10
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      <span className="hidden sm:inline">
                        Other charge will be added by admin
                      </span>
                      <span className="sm:hidden">Admin charge</span>
                    </td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      200
                    </td>
                  </tr>
                  <tr className="font-medium">
                    <td
                      className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base"
                      colSpan={1}
                    >
                      Total
                    </td>
                    <td
                      className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base"
                      colSpan={1}
                    >
                      30
                    </td>
                    <td
                      className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base"
                      colSpan={2}
                    ></td>
                    <td className="py-2 px-2 sm:px-4 border border-gray-200 text-sm sm:text-base">
                      568
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Status Section */}
          <div className="p-2 sm:p-4">
            <div className="mb-2">
              <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">
                Status
              </h3>
              <select
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 sm:mb-4 text-sm sm:text-base"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="Inprocess">Inprocess</option>
                <option value="Completed">Completed</option>
                <option value="Picked up">Picked up</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={handleUpdate}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-200 text-sm sm:text-base"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
