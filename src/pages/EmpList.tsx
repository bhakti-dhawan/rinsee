import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchEmpListByStoreId } from '../api/storeApi';
import axios from 'axios';

const EmployeeList = () => {
  const { state } = useLocation();
  const storeId = state?.storeId;
  const [employees, setEmployees] = useState([]);

  // const [stores, setStores] = useState<Store[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      console.log('storeId', storeId);
      try {
        const data = await fetchEmpListByStoreId(storeId);
        console.log('employeelist data', data?.data.employees);
        setEmployees(data?.data.employees || []);
      } catch (err: any) {
        console.log('errrrorrr');
        setError(
          err.response?.data?.message || err.message || 'Failed to load stores',
        );
      }
    };

    loadStores();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employees List</h2>
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-gray-2 dark:bg-meta-4">
              <tr>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-black dark:text-white">
                  Profile
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-black dark:text-white">
                  Name
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-black dark:text-white">
                  Email
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-black dark:text-white">
                  Contact
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-black dark:text-white">
                  Country
                </th>
                <th className="p-2.5 xl:p-5 text-sm font-medium uppercase text-black dark:text-white">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {employees && employees.length > 0 ? (
                employees.map((emp) => (
                  <tr
                    key={emp.user_id}
                    className="border-t border-stroke dark:border-strokedark"
                  >
                    <td className="p-2.5 xl:p-5">
                      <img
                        src={emp.profilePic}
                        className="w-10 h-10 rounded-full"
                        alt="Profile"
                      />
                    </td>
                    <td className="p-2.5 xl:p-5 text-black dark:text-white">
                      {emp.nameprefix} {emp.firstName} {emp.lastName}
                    </td>
                    <td className="p-2.5 xl:p-5 text-black dark:text-white">
                      {emp.email}
                    </td>
                    <td className="p-2.5 xl:p-5 text-black dark:text-white">
                      {emp.contactNumber}
                    </td>
                    <td className="p-2.5 xl:p-5 text-black dark:text-white">
                      {emp.countryCode}
                    </td>
                    <td className="p-2.5 xl:p-5 text-black dark:text-white">
                      {emp.role}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="p-4 text-center text-gray-500 dark:text-gray-400"
                  >
                    No employee data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
