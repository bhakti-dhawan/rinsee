import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import laundry-related images
import washIron from '../images/allservices/iron.png';
import dryCleanWomen from '../images/allservices/baby-clothes.png';
import dryCleanMen from '../images/allservices/bag.png';
import ironing from '../images/allservices/ironing.png';
import stainRemoval from '../images/allservices/dress.png';
import householdLaundry from '../images/allservices/sofa.png';
import premiumLaundry from '../images/allservices/running.png';
import expressService from '../images/allservices/suit.png';
import blanketCleaning from '../images/allservices/towel.png';

const AllServices: React.FC = () => {
  const navigate = useNavigate();

  // Laundry service categories data with images
  const categories = [
    {
      _id: '1',
      heading: 'Wash & Iron',
      key: 'dry_cleaning_man',
      image: washIron,
      data: [],
    },
    {
      _id: '2',
      heading: 'Dry Clean - Women',
      key: 'dry_cleaning_woman',
      image: dryCleanWomen,
      data: [],
    },
    {
      _id: '3',
      heading: 'Dry Clean - Men',
      key: 'dry_cleaning_household',
      image: dryCleanMen,
      data: [],
    },
    {
      _id: '4',
      heading: 'Ironing Only',
      key: 'wash_and_iron',
      image: ironing,
      data: [],
    },
    {
      _id: '5',
      heading: 'Stain Removal',
      key: 'wash_and_fold',
      image: stainRemoval,
      data: [],
    },
    {
      _id: '6',
      heading: 'Household Laundry',
      key: 'wash_and_shoes',
      image: householdLaundry,
      data: [],
    },
    {
      _id: '7',
      heading: 'Premium Laundry',
      key: 'bag_cleaning',
      image: premiumLaundry,
      data: [],
    },
    {
      _id: '8',
      heading: 'Express Service',
      key: 'steam_iron',
      image: expressService,
      data: [],
    },
    {
      _id: '9',
      heading: 'Blanket Cleaning',
      key: 'kids',
      image: blanketCleaning,
      data: [],
    },
  ];

  const handleCategoryClick = (category: any) => {
    navigate(`/servicedetails`, {
      state: {
        category_key: category.key,
        category_image: category.image,
        category_heading: category.heading,
      },
    });
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4 md:p-6 xl:p-7.5">
      <h1 className="text-xl font-semibold text-black dark:text-white mb-7.5 text-center">
        Our Laundry Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => (
          <div
            key={category._id}
            onClick={() => handleCategoryClick(category)}
            className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-hidden transition-shadow duration-300 flex flex-col h-full hover:shadow-lg cursor-pointer"
          >
            <div className="h-48 p-4 flex items-center justify-center bg-gray-50 dark:bg-meta-4">
              <img
                src={category.image}
                alt={category.heading}
                className="max-h-full max-w-full object-contain"
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxHeight: '100%',
                  maxWidth: '100%',
                }}
              />
            </div>
            <div className="p-4 flex-grow flex flex-col">
              <h3 className="text-lg font-semibold mb-2 text-center text-black dark:text-white">
                {category.heading}
              </h3>
              <div className="mt-auto text-center">
                <button
                  className="text-sm bg-primary text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-opacity-90"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryClick(category);
                  }}
                >
                  View Prices
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
