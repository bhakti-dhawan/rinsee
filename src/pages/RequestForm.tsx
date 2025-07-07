import React, { useState } from 'react';

const RequestForm = () => {
  const [formData, setFormData] = useState({
    pickupDate: '',
    topwear: '',
    bottomwear: '',
    woolenCloth: '',
    others: '',
    serviceType: '',
    contactPerson: '',
    description: '',
  });

  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (name: string) => setFocused(name);
  const handleBlur = () => setFocused(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted successfully!');
  };

  const inputStyle = `w-full px-4 py-3 rounded-md bg-[#f1f5f9] text-sm text-gray-700 border border-[#e2e8f0] placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#e2e8f0] dark:bg-meta-4 dark:border-strokedark dark:text-white`;
  const labelStyle = `text-sm text-black font-medium mb-1 block`;

  const serviceOptions = [
    { value: '', label: 'Select Service type' },
    { value: 'wash', label: 'Wash' },
    { value: 'iron', label: 'Iron' },
    { value: 'wash_iron', label: 'Wash & Iron' },
    { value: 'dry_clean', label: 'Dry Clean' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Laundry Service
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-6 space-y-4">
            {/* Date Picker */}
            <div className="relative">
              <label className={labelStyle}>Pick up / Drop Date</label>
              <div
                className={`relative rounded-md border ${
                  focused === 'pickupDate'
                    ? 'border-blue-500 ring-1 ring-blue-500'
                    : 'border-gray-300'
                }`}
              >
                <input
                  type="date"
                  name="pickupDate"
                  className={inputStyle}
                  value={formData.pickupDate}
                  onChange={handleChange}
                  onFocus={() => handleFocus('pickupDate')}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Text Inputs */}
            {[
              {
                name: 'topwear',
                label: 'Topwear',
                placeholder: 'Topwear(Shirt,Top,Shirt)',
              },
              {
                name: 'bottomwear',
                label: 'Bottomwear',
                placeholder: 'Bottomwear(Lower,Jeans,Leggings)',
              },
              {
                name: 'woolenCloth',
                label: 'Woolen Cloth',
                placeholder: 'Woolen Cloth',
              },
              { name: 'others', label: 'Others', placeholder: 'Others' },
              {
                name: 'contactPerson',
                label: 'Contact Person',
                placeholder: 'Contact Person',
              },
              {
                name: 'description',
                label: 'Description',
                placeholder: 'Description(if any)',
              },
            ].map((field) => (
              <div key={field.name}>
                <label className={labelStyle}>{field.label}</label>
                <input
                  type="text"
                  name={field.name}
                  className={inputStyle}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  onFocus={() => handleFocus(field.name)}
                  onBlur={handleBlur}
                />
              </div>
            ))}

            {/* Service Type Select */}
            <div>
              <label className={labelStyle}>Service Type</label>
              <div className="relative">
                <select
                  className={inputStyle}
                  value={formData.serviceType}
                  onChange={handleChange}
                  onFocus={() => handleFocus('serviceType')}
                  onBlur={handleBlur}
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 transition-colors duration-200 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
