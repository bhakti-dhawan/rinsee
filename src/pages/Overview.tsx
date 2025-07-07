import React from 'react';
import StatusCard from './StatusCard';
import LaundryPriceTable from './LaundryPriceTable';

const Overview = () => {
  const handleCardClick = (status: string) => {
    // In a real application, you would implement navigation here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-gray-50 min-h-screen">
      {/* <Header /> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <StatusCard
          count={0}
          status="new"
          onClick={() => handleCardClick('new')}
        />
        <StatusCard
          count={0}
          status="accept"
          onClick={() => handleCardClick('accept')}
        />
        <StatusCard
          count={0}
          status="inprocess"
          onClick={() => handleCardClick('inprocess')}
        />
        <StatusCard
          count={1}
          status="finish"
          onClick={() => handleCardClick('finish')}
        />
      </div>

      <LaundryPriceTable />
    </div>
  );
};

export default Overview;
