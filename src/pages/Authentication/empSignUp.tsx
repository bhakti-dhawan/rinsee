import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { empSignUpApi } from '../../api/auth';
import { useNavigate } from 'react-router-dom';

const StoreSignUp: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nameprefix: 'Mr',
    firstName: '',
    lastName: '',
    countryCode: '+91',
    contactNumber: '',
    email: '',
    role: 'store',
    address: '',
  });

  const [files, setFiles] = useState({
    profilePic: null as File | null,
    selfIdentificationPicF: null as File | null,
    selfIdentificationPicB: null as File | null,
  });

  const profilePicRef = useRef<HTMLInputElement>(null);
  const idFrontRef = useRef<HTMLInputElement>(null);
  const idBackRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof files,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    // Append form data
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    // Append files
    if (files.profilePic) data.append('profilePic', files.profilePic);
    if (files.selfIdentificationPicF)
      data.append('selfIdentificationPicF', files.selfIdentificationPicF);
    if (files.selfIdentificationPicB)
      data.append('selfIdentificationPicB', files.selfIdentificationPicB);

    try {
      // Replace with your actual API endpoint
      const response = await empSignUpApi(data);
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Store Sign Up" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="dark:hidden"
                  src="/images/rinsee.png"
                  alt="Logo"
                  height="20px"
                  width="20px"
                />
              </Link>
              <p className="2xl:px-20">
                Join our platform as a store partner and expand your business
                reach.
              </p>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">
                Start your store partnership
              </span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Store Registration
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Name Section */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Name Prefix
                  </label>
                  <div className="relative">
                    <select
                      name="nameprefix"
                      value={formData.nameprefix}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    >
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                {/* Contact Section */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Contact Number
                  </label>
                  <div className="flex">
                    <div className="relative w-1/4 mr-2">
                      <input
                        type="text"
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="relative w-3/4">
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter your contact number"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 px-6 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    rows={3}
                    required
                  />
                </div>

                {/* File Uploads */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Profile Picture
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      ref={profilePicRef}
                      onChange={(e) => handleFileChange(e, 'profilePic')}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => profilePicRef.current?.click()}
                      className="mr-4 rounded-lg border border-stroke bg-gray py-2 px-4 text-black hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-opacity-50"
                    >
                      Choose File
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {files.profilePic
                        ? files.profilePic.name
                        : 'No file chosen'}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Identification Front
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      ref={idFrontRef}
                      onChange={(e) =>
                        handleFileChange(e, 'selfIdentificationPicF')
                      }
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => idFrontRef.current?.click()}
                      className="mr-4 rounded-lg border border-stroke bg-gray py-2 px-4 text-black hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-opacity-50"
                    >
                      Choose File
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {files.selfIdentificationPicF
                        ? files.selfIdentificationPicF.name
                        : 'No file chosen'}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Identification Back
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      ref={idBackRef}
                      onChange={(e) =>
                        handleFileChange(e, 'selfIdentificationPicB')
                      }
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => idBackRef.current?.click()}
                      className="mr-4 rounded-lg border border-stroke bg-gray py-2 px-4 text-black hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:text-white dark:hover:bg-opacity-50"
                    >
                      Choose File
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {files.selfIdentificationPicB
                        ? files.selfIdentificationPicB.name
                        : 'No file chosen'}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Register Store
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreSignUp;
