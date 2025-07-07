// src/components/StoreForm.tsx

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { storeUpdate, getStoreProfile } from '../api/storeApi';
import { useNavigate } from 'react-router-dom';

type StoreFormData = {
  title: string;
  contactNumber: string;
  email: string;
  whatsAppNumber: string;
  address: string;
  city: string;
  pinCode: string;
  lat: string;
  long: string;
  timings: string;
  status: string;
  profileActivation: '1' | '2';
};

const StoreForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreFormData>({
    defaultValues: {
      title: '',
      contactNumber: '',
      email: '',
      whatsAppNumber: '',
      address: '',
      city: '',
      pinCode: '',
      lat: '',
      long: '',
      timings: '',
      status: 'open',
      profileActivation: '1',
    },
  });

  useEffect(() => {
    const fetchStoreProfile = async () => {
      try {
        const response = await getStoreProfile();
        if (response.data) {
          const apiData = response.data;
          const storeData: StoreFormData = {
            title: apiData.title || '',
            contactNumber: apiData.contactNumber || '',
            email: apiData.email || '',
            whatsAppNumber: apiData.whatsAppNumber || '',
            address: apiData.address || '',
            city: apiData.city || '',
            pinCode: apiData.pinCode || '',
            lat: apiData.lat || '',
            long: apiData.long || '',
            timings: apiData.timings?.[0] || '',
            status: apiData.status || 'open',
            profileActivation: apiData.profileActivation || '1',
          };
          reset(storeData);
        }
      } catch (error) {
        console.error('Error fetching store profile:', error);
      }
    };
    fetchStoreProfile();
  }, [reset]);

  const onSubmit = async (data: StoreFormData) => {
    try {
      const formattedData = {
        ...data,
        profileActivation: '1',
        timings: [data.timings],
      };
      const response = await storeUpdate(formattedData);
      console.log('Store updated successfully:', response);
      alert('Store updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update store.');
    }
  };

  const inputStyle = `w-full px-4 py-3 rounded-md bg-[#f1f5f9] text-sm text-gray-700 border border-[#e2e8f0] placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#e2e8f0] dark:bg-meta-4 dark:border-strokedark dark:text-white`;
  const labelStyle = `text-sm text-black font-medium mb-1 block`;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-2xl border border-[#e2e8f0]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Create / Update Store
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Store Name</label>
            <input
              {...register('title', { required: 'Store name is required' })}
              className={inputStyle}
              placeholder="Enter store name"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelStyle}>Contact Number</label>
            <input
              {...register('contactNumber', {
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Contact number must be 10 digits',
                },
              })}
              className={inputStyle}
              placeholder="Enter contact number"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              })}
              className={inputStyle}
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelStyle}>WhatsApp Number</label>
            <input
              {...register('whatsAppNumber', {
                required: 'WhatsApp number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Must be a valid 10-digit number',
                },
              })}
              className={inputStyle}
              placeholder="Enter WhatsApp number"
            />
            {errors.whatsAppNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.whatsAppNumber.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Address</label>
            <input
              {...register('address', { required: 'Address is required' })}
              className={inputStyle}
              placeholder="Enter full address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelStyle}>City</label>
            <input
              {...register('city', { required: 'City is required' })}
              className={inputStyle}
              placeholder="Enter city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Pin Code</label>
            <input
              {...register('pinCode', {
                required: 'Pin code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Pin code must be 6 digits',
                },
              })}
              className={inputStyle}
              placeholder="Enter 6-digit pin code"
            />
            {errors.pinCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pinCode.message}
              </p>
            )}
          </div>

          <div>
            <label className={labelStyle}>Latitude</label>
            <input
              {...register('lat', {
                required: 'Latitude is required',
                pattern: {
                  value: /^-?\d+(\.\d+)?$/,
                  message: 'Invalid latitude format',
                },
              })}
              className={inputStyle}
              placeholder="Enter latitude (e.g., 28.6139)"
            />
            {errors.lat && (
              <p className="text-red-500 text-sm mt-1">{errors.lat.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Longitude</label>
            <input
              {...register('long', {
                required: 'Longitude is required',
                pattern: {
                  value: /^-?\d+(\.\d+)?$/,
                  message: 'Invalid longitude format',
                },
              })}
              className={inputStyle}
              placeholder="Enter longitude (e.g., 77.2090)"
            />
            {errors.long && (
              <p className="text-red-500 text-sm mt-1">{errors.long.message}</p>
            )}
          </div>

          <div>
            <label className={labelStyle}>Store Timings</label>
            <input
              {...register('timings', { required: 'Timings are required' })}
              className={inputStyle}
              placeholder="e.g., 10AM to 8PM"
            />
            {errors.timings && (
              <p className="text-red-500 text-sm mt-1">
                {errors.timings.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className={labelStyle}>Status</label>
            <select
              {...register('status', { required: 'Status is required' })}
              className={inputStyle}
            >
              <option value="">Select status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreForm;
