import React, { useEffect, useState } from 'react';
import { getUserOrder } from '../api/storeApi';

type Package = {
  shopName: string;
  userName: string;
  date: string;
  address: string;
  status: string;
};

const packageData: Package[] = [
  {
    shopName: 'Tech Store',
    userName: 'John Doe',
    date: 'Jan 13, 2023',
    address: '123 Main St, New York, NY',
    status: 'Paid',
  },
  {
    shopName: 'Gadget Hub',
    userName: 'Jane Smith',
    date: 'Feb 10, 2023',
    address: '456 Elm St, Los Angeles, CA',
    status: 'Unpaid',
  },
  {
    shopName: 'Digital World',
    userName: 'Mike Johnson',
    date: 'Mar 22, 2023',
    address: '789 Oak St, Chicago, IL',
    status: 'Pending',
  },
];

const OrderPickUp = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getUserOrder();
        console.log('data--', data);
        setStores(data?.data || []);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || 'Failed to load stores',
        );
      }
    };

    loadStores();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Shop Name
              </th>
              <th className="min-w-[160px] py-4 px-4 font-medium text-black dark:text-white">
                User Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[250px] py-4 px-4 font-medium text-black dark:text-white">
                Address
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Request
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Confirmation
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {stores.map((item, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <p className="text-black dark:text-white font-medium">
                    store name
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.firstName}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.pickUpRequesData}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.userAddress}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      item.status === 'Paid'
                        ? 'bg-success text-success'
                        : item.status === 'Unpaid'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                    }`}
                  >
                    {item.orderStatus}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.pickUpReqStatus}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.orderconfirm}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {/* Add your action buttons here */}
                    <button className="hover:text-gray-500 text-primary">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPickUp;
