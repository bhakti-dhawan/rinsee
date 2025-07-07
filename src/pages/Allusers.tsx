import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../api/storeApi';
import UserOne from '../images/allservices/userIcon.png';
import UserTwo from '../images/allservices/userIcon.png';
import UserThree from '../images/allservices/userIcon.png';
import UserFour from '../images/allservices/userIcon.png';

const userImages = [UserOne, UserTwo, UserThree, UserFour];

const AllUsers = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchAllUsers();
        setEmployees(data?.data || []);
      } catch (err) {
        setError('Failed to fetch employees');
      } finally {
        setLoading(false);
      }
    };

    getEmployees();
  }, []);

  if (loading) return <p className="text-center py-6">Loading...</p>;
  if (error) return <p className="text-center py-6 text-red-500">{error}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          All Users
        </h4>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-4 flex items-center">
          <p className="font-medium">User</p>
        </div>
        <div className="col-span-4 flex items-center">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-4 flex items-center">
          <p className="font-medium">Contact</p>
        </div>
      </div>

      {/* Data Rows */}
      {employees.map((employee, key) => {
        const randomImage = userImages[key % userImages.length];

        return (
          <div
            className="grid grid-cols-12 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5"
            key={key}
          >
            {/* User Column */}
            <div className="col-span-4 flex items-center">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img
                    src={employee.profilePic || randomImage}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">
                    {employee.firstName} {employee.lastName}
                  </p>
                  {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                    {employee.role || 'User'}
                  </p> */}
                </div>
              </div>
            </div>

            {/* Email Column */}
            <div className="col-span-4 flex items-center">
              <p className="text-sm text-black dark:text-white truncate">
                {employee.email}
              </p>
            </div>

            {/* Contact Column */}
            <div className="col-span-4 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {employee.contactNumber || 'N/A'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
