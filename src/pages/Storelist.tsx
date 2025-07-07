import { useEffect, useState } from 'react';
import { fetchStores } from '../api/storeApi';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2, ArrowDownToLine, UserPlus, Users } from 'lucide-react';

interface Store {
  storeId: string;
  title: string;
  address: string;
  pinCode: string;
  totalRevenue: string;
  images: string[];
  status: 'open' | 'closed';
}

const StoreList = () => {
  const navigate = useNavigate();

  const [stores, setStores] = useState<Store[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await fetchStores();
        setStores(data?.data?.stores || []);
      } catch (err: any) {
        setError(
          err.response?.data?.message || err.message || 'Failed to load stores',
        );
      }
    };

    loadStores();
  }, []);

  const handleToggleStatus = (storeId: string) => {
    setStores((prev) =>
      prev.map((store) =>
        store.storeId === storeId
          ? { ...store, status: store.status === 'open' ? 'closed' : 'open' }
          : store,
      ),
    );
  };

  const handleDelete = (storeId: string) => {
    setStores((prev) => prev.filter((store) => store.storeId !== storeId));
  };

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow space-y-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Top Stores</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr className="text-gray-600 text-sm uppercase tracking-wider">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Revenue</th>
              <th className="px-6 py-3">Orders</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr
                key={store.storeId}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={store.images?.[0] || 'https://via.placeholder.com/40'}
                    alt={store.title}
                    className="w-10 h-10 rounded-full object-cover border bg-black"
                  />
                  <span className="font-medium text-gray-900">
                    {store.title}
                  </span>
                </td>

                <td className="px-6 py-4 text-green-600 font-semibold">
                  ₹ {store.totalRevenue || '0'}
                </td>

                <td className="px-6 py-4 text-gray-700 font-medium">
                  {Math.floor(Number(store.totalRevenue) / 10)}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-4 text-gray-500">
                    <Link to={`/stores/${store.storeId}`} title="View">
                      <Eye className="w-5 h-5 hover:text-blue-600 transition cursor-pointer" />
                    </Link>

                    <button
                      onClick={() => handleDelete(store.storeId)}
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 hover:text-red-600 transition cursor-pointer" />
                    </button>

                    <button
                      onClick={() => handleToggleStatus(store.storeId)}
                      title={
                        store.status === 'open' ? 'Deactivate' : 'Activate'
                      }
                    >
                      <ArrowDownToLine className="w-5 h-5 hover:text-green-600 transition cursor-pointer" />
                    </button>

                    <Link
                      to={`/stores/${store.storeId}/add-user`}
                      title="Add User"
                    >
                      <UserPlus className="w-5 h-5 hover:text-indigo-600 transition cursor-pointer" />
                    </Link>

                    <Link
                      to="/employee"
                      state={{ storeId: store.storeId }}
                      title="Add Employee"
                    >
                      <UserPlus className="w-5 h-5 hover:text-indigo-600 transition cursor-pointer" />
                    </Link>

                    <Link
                      to="/emplist"
                      state={{ storeId: store.storeId }}
                      title="Employee List"
                    >
                      <Users className="w-5 h-5 hover:text-purple-600 transition cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {stores.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No stores available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreList;
