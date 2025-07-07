import React from 'react';
import { ChevronRight } from 'lucide-react';

interface StatusCardProps {
  count: number;
  status: 'new' | 'accept' | 'inprocess' | 'finish';
  onClick?: () => void;
}

const statusConfig = {
  new: {
    label: 'New Request',
    bgColor: 'bg-yellow-400',
    hoverColor: 'hover:bg-yellow-500',
  },
  accept: {
    label: 'Accept!',
    bgColor: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
  inprocess: {
    label: 'Inprocess!',
    bgColor: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  finish: {
    label: 'Finish!',
    bgColor: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
  },
};

const StatusCard: React.FC<StatusCardProps> = ({ count, status, onClick }) => {
  const { label, bgColor, hoverColor } = statusConfig[status];

  return (
    <div
      className={`${bgColor} ${hoverColor} rounded shadow-md p-4 text-white transition-all duration-200 cursor-pointer`}
      onClick={onClick}
    >
      <div className="text-2xl font-bold mb-3">
        {count} {label}
      </div>
      <div className="flex justify-between items-center">
        <span>View Details</span>
        <ChevronRight size={18} />
      </div>
    </div>
  );
};

export default StatusCard;
