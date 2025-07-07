import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CreateOrUpdate,
  getServicesById,
  deleteServiceById,
  serviceUpdate,
} from '../api/storeApi';

type ServiceItem = {
  _id?: string;
  title: string;
  subTitle: string;
  price: number;
  unit: string;
};

type ServiceCategory = {
  _id: string;
  heading: string;
  key: string;
  data: ServiceItem[];
};

const ServiceDetails: React.FC = () => {
  const [category, setCategories] = useState<any>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);
  // State for form inputs
  const [newItem, setNewItem] = useState<any>({
    title: '',
    subTitle: '',
    price: 0,
    unit: 'per item',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Log all navigation state data to console
  useEffect(() => {
    console.log('Navigation state received:', location.state);
    const {
      category_key = '',
      category_heading = '',
      category_image = '',
      store_id = '',
      store_name = '',
    } = location.state || {};

    console.log('Detailed navigation data:');
    console.log('Category Key:', category_key);
    console.log('Category img:', category_image);
    console.log('Category Heading:', category_heading);
    console.log('Store ID:', store_id);
    console.log('Store Name:', store_name);
  }, [location.state]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getServicesById(
          location.state.store_id,
          'dry_cleaning_woman',
        );
        console.log(
          'API getServicesById Response:------------------------',
          response,
        );

        if (response.success && response.data.length >= 0) {
          // Find the category that matches the category_key from navigation
          const allCategories = response.data;
          // const matchedCategory =
          //   allCategories.find(
          //     (cat: ServiceCategory) =>
          //       cat.key === location.state?.category_key,
          //   ) || allCategories[0];

          // console.log('Matched Category:', matchedCategory);
          setCategories(allCategories);
        } else {
          setError(response.message || 'No services available');
        }
      } catch (err) {
        // setError('An error occurred while fetching services');
        alert(err?.response?.data?.message);
        // console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [location.state?.category_key]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleEditItem = (item: ServiceItem, index: any) => {
    setCurrentItem(item);
    setCurrentItemIndex(index); // Store the index
    setNewItem({
      title: item.title,
      subTitle: item.subTitle,
      price: item.price,
      unit: item.unit,
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let updatedData = [...category];
      let currentId: string | undefined;
      if (currentItem) {
        currentId = currentItem['_id'];
      }
      updatedData = updatedData.filter((item) => item._id == currentId);
      // if (isEditing && currentItem) {
      //   updatedData = updatedData.map((item) =>
      //     item._id === currentItem._id
      //       ? { ...newItem, _id: currentItem._id }
      //       : item,
      //   );
      // } else {
      //   updatedData.push({ ...newItem });
      // }

      const updatedCategory = [...category];
      if (!isEditing) {
        updatedCategory.push(newItem);
      }

      // return;

      // console.log('Submitting data:', {
      //   storeId: location.state?.store_id || 'default_store_id',
      //   items: [
      //     {
      //       heading: category.heading,
      //       key: category.key,
      //       data: updatedData,
      //     },
      //   ],
      // });
      let response;
      if (isEditing && currentItem && currentItemIndex !== null) {
        console.log(
          'currentItemIndex=========',
          location.state?.store_id + currentItemIndex,
        );
        response = await serviceUpdate(
          location.state?.store_id,
          location.state?.category_key,
          currentItemIndex,
          newItem,
        );
      } else {
        response = await CreateOrUpdate({
          storeId: location.state?.store_id,
          items: [
            {
              heading: location.state?.category_heading,
              key: location.state?.category_key,
              data: [newItem],
            },
          ],
        });
      }

      if (response.success) {
        console.log('Success response:', response);
        alert(
          isEditing ? 'Item updated successfully!' : 'Item added successfully!',
        );
        setCategories(updatedCategory);
        resetForm();
      } else {
        throw new Error(response.message || 'Operation failed');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      console.error('Submission error:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewItem({ title: '', subTitle: '', price: 0, unit: 'per item' });
    setIsEditing(false);
    setCurrentItem(null);
  };

  const handleDeleteItem = async (item: any, index: any) => {
    setCurrentItem(item);
    setCurrentItemIndex(index); // Store the index
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        setLoading(true);
        const response = await deleteServiceById(
          location.state?.store_id,
          location.state?.category_key,
          currentItemIndex ?? index,
        );
        if (response.success) {
          // const updatedData = category.data.filter(
          //   (item: ServiceItem) => item._id !== itemId,
          // );
          // setCategories({
          //   ...category,
          //   data: updatedData,
          // });
          window.location.reload(); // 🔁 Refresh the page
          alert('Item deleted successfully!');
        } else {
          throw new Error(response.message || 'Deletion failed');
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An error occurred';
        console.error('Deletion error:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Services
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full mb-4 md:mb-0 md:mr-6 flex items-center justify-center">
            <img
              src={location.state.category_image}
              alt={location.state.category_heading}
              className="max-h-full max-w-full object-contain"
              style={{
                width: '120px', // Increased width
                height: '120px', // Increased height
                borderRadius: '50%', // Makes the image round
                objectFit: 'cover', // Ensures the image covers the area while maintaining aspect ratio
                maxHeight: '100%',
                maxWidth: '100%',
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {location.state.category_heading || 'Loading...'}
            </h1>
            {location.state?.store_name && (
              <p className="text-gray-600 mt-2">
                For store: {location.state.store_name}
              </p>
            )}
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Pricing</h2>
          {loading && category?.length == 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {category?.map((item: any, index: any) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <span className="text-gray-700">{item.title}</span>
                    {item.subTitle && (
                      <span className="text-gray-500 text-sm ml-2">
                        ({item.subTitle})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-4">
                      Rs. {item.price.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleEditItem(item, index)}
                      className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => item._id && handleDeleteItem(item, index)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Service Item' : 'Add New Service Item'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                name="subTitle"
                value={newItem.subTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={newItem.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Unit</label>
              <input
                type="text"
                name="unit"
                value={newItem.unit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                disabled={loading}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={loading}
            >
              {loading
                ? 'Processing...'
                : isEditing
                  ? 'Update Item'
                  : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceDetails;
