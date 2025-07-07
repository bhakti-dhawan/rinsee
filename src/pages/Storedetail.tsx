// src/components/StoreDetail.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { fetchStoreById, updateStoreById } from '../api/storeApi';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCQP1SBLN_Kl1icBTNZMtpyft80d2dVIKc',
  });

  useEffect(() => {
    if (id) {
      fetchStoreById(id)
        .then((data) => setFormData(data?.data))
        .catch((err) => setError(err.message));
    }
  }, [id]);



  const inputStyle = `w-full px-4 py-3 rounded-md bg-[#f1f5f9] text-sm text-gray-700 border border-[#e2e8f0] placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#e2e8f0]`;
  const labelStyle = `text-sm text-black font-medium mb-1 block`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'timings',
  ) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: [e.target.value],
    }));
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat().toFixed(6);
      const long = e.latLng.lng().toFixed(6);
      setFormData((prev: any) => ({
        ...prev,
        lat,
        long,
      }));
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'title',
      'city',
      'address',
      'pinCode',
      'lat',
      'long',
      'timings',
      'contactNumber',
    ];
    for (const field of requiredFields) {
      if (
        !formData[field] ||
        (Array.isArray(formData[field]) && !formData[field][0])
      ) {
        return false;
      }
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      await updateStoreById(id!, formData);
      alert('Store updated successfully!');
      navigate('/stores');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return <div className="p-6">Loading store details...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white shadow-md rounded-2xl border border-[#e2e8f0]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Update Store Information
      </h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="space-y-8">
        {/* Store Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Store Name</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className={labelStyle}>City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className={labelStyle}>Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className={labelStyle}>Pin Code</label>
            <input
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Latitude</label>
            <input
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className={labelStyle}>Longitude</label>
            <input
              name="long"
              value={formData.long}
              onChange={handleChange}
              className={inputStyle}
            />
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

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Primary Contact</label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className={labelStyle}>Alternate Contact</label>
            <input
              name="alternateContactNumber"
              value={formData.alternateContactNumber}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Store Status and Timings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Status</label>
            <input
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>
          <div>
            <label className={labelStyle}>Timings</label>
            <input
              name="timings"
              value={formData.timings?.[0]}
              onChange={(e) => handleArrayChange(e, 'timings')}
              className={inputStyle}
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className={labelStyle}>Image URLs (comma-separated)</label>
          <input
            value={formData.images?.join(', ')}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                images: e.target.value.split(',').map((url) => url.trim()),
              }))
            }
            className={inputStyle}
          />
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Store'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
