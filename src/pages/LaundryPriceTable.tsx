import React from 'react';

const laundryPrices = [
  { category: 'Top Wear Laundry Price', price: 12 },
  { category: 'Bootom Wear Laundry Price', price: 22 },
  { category: 'Woolen Cloth Laundry Price', price: 20 },
  {
    category: 'Other Price',
    price:
      'Other Price depend upon cloth variety(other than above three category)',
  },
];

const LaundryPriceTable: React.FC = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="border rounded-md overflow-hidden shadow-sm mt-6">
        <div className="bg-blue-100 p-3 text-lg font-medium text-gray-800 border-b">
          <span className="text-blue-600">Laundry</span> Price(Per Unit)
        </div>
        <table className="w-full">
          <tbody>
            {laundryPrices.map((item, index) => (
              <tr key={index} className="border-b last:border-b-0">
                <td className="p-4 font-medium text-gray-700">
                  {item.category}
                </td>
                <td className="p-4 text-gray-600">
                  {typeof item.price === 'number' ? item.price : item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaundryPriceTable;
