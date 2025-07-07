import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { CreateStore } from '../../api/storeApi';

const userID = localStorage.getItem('userId');

interface StoreFormData {
  userId: any;
  title: string;
  city: string;
  address: string;
  status: string;
  lat: string;
  long: string;
  pinCode: string;
  timings: string[];
  contactNumber: string;
  alternateContactNumber: string;
  images: string[];
}

const AddStoreForm = () => {
  const [formData, setFormData] = useState<StoreFormData>({
    userId: userID,
    title: '',
    city: '',
    address: '',
    status: 'open',
    lat: '',
    long: '',
    pinCode: '',
    timings: [''],
    contactNumber: '',
    alternateContactNumber: '',
    images: [],
  });

  const [errors, setErrors] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [files, setFiles] = useState({
    profilePic: null as File | null,
    selfIdentificationPicF: null as File | null,
    selfIdentificationPicB: null as File | null,
  });

  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAmJixElxZzVtD26BWhCaGC1S3HMHsGDLc',
  });

  const inputStyle = `w-full px-4 py-3 rounded-md bg-[#f1f5f9] text-sm text-gray-700 border border-[#e2e8f0] placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#e2e8f0] dark:bg-meta-4 dark:border-strokedark dark:text-white`;
  const labelStyle = `text-sm text-black font-medium mb-1 block`;
  const profilePicRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if ((name === 'title' || name === 'city') && /\d/.test(value)) return;
    if (name === 'contactNumber' || name === 'alternateContactNumber') {
      if (!/^\d*$/.test(value) || value.length > 10) return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Pick<StoreFormData, 'timings'>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [e.target.value],
    }));
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat().toFixed(6);
      const long = e.latLng.lng().toFixed(6);
      setFormData((prev) => ({
        ...prev,
        lat,
        long,
      }));
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof files,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFiles((prev) => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const long = position.coords.longitude.toFixed(6);
          setFormData((prev) => ({
            ...prev,
            lat,
            long,
          }));
        },
        (error) => {
          console.error('Error fetching location:', error);
          setError(
            'Failed to get current location. Please allow location access.',
          );
        },
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Store name is required.';
    } else if (/\d/.test(formData.title)) {
      newErrors.title = 'Store name should not contain numbers.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    } else if (/\d/.test(formData.city)) {
      newErrors.city = 'City should not contain numbers.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode = 'Pin code is required.';
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Pin code must be exactly 6 digits.';
    }

    if (!formData.lat || isNaN(Number(formData.lat))) {
      newErrors.lat = 'Valid latitude is required.';
    }
    if (!formData.long || isNaN(Number(formData.long))) {
      newErrors.long = 'Valid longitude is required.';
    }

    if (!formData.timings[0]?.trim()) {
      newErrors.timings = 'Timings are required.';
    }

    if (!formData.status.trim()) {
      newErrors.status = 'Status is required.';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required.';
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be exactly 10 digits.';
    }

    if (
      formData.alternateContactNumber &&
      !/^\d{10}$/.test(formData.alternateContactNumber)
    ) {
      newErrors.alternateContactNumber =
        'Alternate contact must be exactly 10 digits.';
    }

    if (!files.profilePic) {
      newErrors.images = 'Please upload a profile image.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await CreateStore(formData);
      navigate('/stores');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-2xl border border-[#e2e8f0]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Store Information
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Store Name</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter store name"
              className={inputStyle}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label className={labelStyle}>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className={inputStyle}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className={inputStyle}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label className={labelStyle}>Pin Code</label>
            <input
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              placeholder="Enter pin code"
              className={inputStyle}
            />
            {errors.pinCode && (
              <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleFetchLocation}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition mb-4"
        >
          Use Current Location
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Latitude</label>
            <input
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              placeholder="Latitude"
              className={inputStyle}
            />
            {errors.lat && (
              <p className="text-red-500 text-sm mt-1">{errors.lat}</p>
            )}
          </div>
          <div>
            <label className={labelStyle}>Longitude</label>
            <input
              name="long"
              value={formData.long}
              onChange={handleChange}
              placeholder="Longitude"
              className={inputStyle}
            />
            {errors.long && (
              <p className="text-red-500 text-sm mt-1">{errors.long}</p>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-lg overflow-hidden">
          {isLoaded ? (
            <GoogleMap
              center={{
                lat: parseFloat(formData.lat) || 28.6139,
                lng: parseFloat(formData.long) || 77.209,
              }}
              zoom={12}
              mapContainerStyle={{ width: '100%', height: '300px' }}
              onClick={handleMapClick}
            >
              {formData.lat && formData.long && (
                <Marker
                  position={{
                    lat: parseFloat(formData.lat),
                    lng: parseFloat(formData.long),
                  }}
                />
              )}
            </GoogleMap>
          ) : (
            <p>Loading map...</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Primary Contact</label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={inputStyle}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber}
              </p>
            )}
          </div>
          <div>
            <label className={labelStyle}>WhatsApp Number</label>
            <input
              name="alternateContactNumber"
              value={formData.alternateContactNumber}
              onChange={handleChange}
              placeholder="Enter alternate number"
              className={inputStyle}
            />
            {errors.alternateContactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.alternateContactNumber}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Status</label>
            <input
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="Store status (e.g. open)"
              className={inputStyle}
            />
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>
          <div>
            <label className={labelStyle}>Timings</label>
            <input
              name="timings"
              value={formData.timings[0]}
              onChange={(e) => handleArrayChange(e, 'timings')}
              placeholder="e.g., 10AM - 8PM"
              className={inputStyle}
            />
            {errors.timings && (
              <p className="text-red-500 text-sm mt-1">{errors.timings}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-2.5 block font-medium text-black dark:text-white">
            Image Upload
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
              {files.profilePic ? files.profilePic.name : 'No file chosen'}
            </span>
          </div>
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images}</p>
          )}
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Store
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStoreForm;
