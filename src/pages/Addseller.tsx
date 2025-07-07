import React from 'react';
import { useForm } from 'react-hook-form';
import { addSellerSignup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const PhoneForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // console.log('Form Data:', data);
    // alert(
    //   `Country Code: ${data.countryCode}, Contact Number: ${data.contactNumber}`,
    // );

    try {
      const { countryCode, contactNumber } = data;
      const payload = { countryCode, contactNumber };
      const response = await addSellerSignup(payload);
      // console.log('response', response);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Store already exists.');
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark max-w-xl mx-auto mt-10 p-8">
      {/* Info line */}
      <p className="text-sm text-black dark:text-white mb-4">
        <strong>Note:</strong> This form is being filled by the{' '}
        <span className="text-primary font-medium">Admin</span> to register a
        new <span className="text-green-600 font-medium">Seller</span>.
      </p>

      <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">
        Seller Contact Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Country Code */}
        <div>
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Country Code
          </label>
          <input
            type="text"
            placeholder="+91"
            {...register('countryCode', {
              required: 'Country code is required',
              pattern: {
                value: /^\+\d{1,4}$/,
                message: 'Enter a valid country code (e.g., +91)',
              },
            })}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-4 pr-4 text-black dark:text-white dark:bg-form-input dark:border-form-strokedark outline-none focus:border-primary"
          />
          {errors.countryCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.countryCode.message}
            </p>
          )}
        </div>

        {/* Contact Number */}
        <div>
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Contact Number
          </label>
          <input
            type="tel"
            placeholder="9876543210"
            {...register('contactNumber', {
              required: 'Contact number is required',
              pattern: {
                value: /^[0-9]{7,15}$/,
                message: 'Enter a valid contact number',
              },
            })}
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-4 pr-4 text-black dark:text-white dark:bg-form-input dark:border-form-strokedark outline-none focus:border-primary"
          />
          {errors.contactNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.contactNumber.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PhoneForm;
