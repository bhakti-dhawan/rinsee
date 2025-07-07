import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createEmployee } from '../../api/storeApi';

const empId = localStorage.getItem('userId');
interface EmployeeFormData {
  user_id: any;
  storeId: any;
  nameprefix: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  countryCode: string;
  contactNumber: string;
  adress: string;
  profileActivation: string;
  profilePic: File | null;
  selfIdentificationPicF: File | null;
  selfIdentificationPicB: File | null;
}

interface FormErrors {
  nameprefix?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  contactNumber?: string;
  countryCode?: string;
  adress?: string;
  profilePic?: string;
  selfIdentificationPicF?: string;
  selfIdentificationPicB?: string;
}

const Employee = () => {
  const location = useLocation();
  const { storeId } = location.state;
  const [formData, setFormData] = useState<EmployeeFormData>({
    user_id: empId,
    storeId: storeId,
    nameprefix: '',
    firstName: '',
    lastName: '',
    email: '',
    role: 'employee',
    countryCode: '+91',
    contactNumber: '',
    adress: '',
    profileActivation: '2',
    profilePic: null,
    selfIdentificationPicF: null,
    selfIdentificationPicB: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const inputStyle = `w-full px-4 py-3 rounded-md bg-[#f1f5f9] text-sm text-gray-700 border border-[#e2e8f0] placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#e2e8f0]`;
  const labelStyle = `text-sm text-black font-medium mb-1 block`;
  const errorStyle = `text-red-500 text-xs mt-1`;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name Prefix validation
    if (!formData.nameprefix) {
      newErrors.nameprefix = 'Name prefix is required';
    }

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = 'First name cannot exceed 50 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = 'Last name cannot exceed 50 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Contact Number validation
    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber =
        'Please enter a valid phone number (10-15 digits)';
    }

    // Country Code validation
    if (!formData.countryCode) {
      newErrors.countryCode = 'Country code is required';
    } else if (!/^\+\d{1,4}$/.test(formData.countryCode)) {
      newErrors.countryCode = 'Please enter a valid country code (e.g., +91)';
    }

    // Address validation
    if (!formData.adress.trim()) {
      newErrors.adress = 'Address is required';
    } else if (formData.adress.length > 200) {
      newErrors.adress = 'Address cannot exceed 200 characters';
    }

    // Profile Picture validation
    if (!formData.profilePic) {
      newErrors.profilePic = 'Profile picture is required';
    } else if (formData.profilePic.size > 2 * 1024 * 1024) {
      // 2MB limit
      newErrors.profilePic = 'Profile picture must be less than 2MB';
    } else if (
      !['image/jpeg', 'image/png', 'image/gif'].includes(
        formData.profilePic.type,
      )
    ) {
      newErrors.profilePic = 'Only JPEG, PNG, or GIF images are allowed';
    }

    // ID Proof Front validation
    if (!formData.selfIdentificationPicF) {
      newErrors.selfIdentificationPicF = 'ID proof front is required';
    } else if (formData.selfIdentificationPicF.size > 2 * 1024 * 1024) {
      newErrors.selfIdentificationPicF = 'ID proof must be less than 2MB';
    } else if (
      !['image/jpeg', 'image/png', 'image/gif'].includes(
        formData.selfIdentificationPicF.type,
      )
    ) {
      newErrors.selfIdentificationPicF =
        'Only JPEG, PNG, or GIF images are allowed';
    }

    // ID Proof Back validation
    if (!formData.selfIdentificationPicB) {
      newErrors.selfIdentificationPicB = 'ID proof back is required';
    } else if (formData.selfIdentificationPicB.size > 2 * 1024 * 1024) {
      newErrors.selfIdentificationPicB = 'ID proof must be less than 2MB';
    } else if (
      !['image/jpeg', 'image/png', 'image/gif'].includes(
        formData.selfIdentificationPicB.type,
      )
    ) {
      newErrors.selfIdentificationPicB =
        'Only JPEG, PNG, or GIF images are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      // Clear error when user selects a file
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) {
      return;
    }

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          form.append(key, value);
        } else {
          form.append(key, value);
        }
      });

      await createEmployee(form);
      navigate('/stores');
    } catch (err: any) {
      setApiError(err.message || 'Failed to add employee. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-2xl border border-[#e2e8f0]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Employee
      </h2>
      {apiError && <p className="text-red-500 mb-4 text-center">{apiError}</p>}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelStyle}>Name Prefix</label>
            <select
              name="nameprefix"
              value={formData.nameprefix}
              onChange={handleChange}
              className={`${inputStyle} ${errors.nameprefix ? 'border-red-500' : ''}`}
            >
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Mrs">Mrs</option>
            </select>
            {errors.nameprefix && (
              <p className={errorStyle}>{errors.nameprefix}</p>
            )}
          </div>

          <div>
            <label className={labelStyle}>First Name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className={`${inputStyle} ${errors.firstName ? 'border-red-500' : ''}`}
              required
            />
            {errors.firstName && (
              <p className={errorStyle}>{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className={labelStyle}>Last Name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className={`${inputStyle} ${errors.lastName ? 'border-red-500' : ''}`}
              required
            />
            {errors.lastName && <p className={errorStyle}>{errors.lastName}</p>}
          </div>

          <div>
            <label className={labelStyle}>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`${inputStyle} ${errors.email ? 'border-red-500' : ''}`}
              required
            />
            {errors.email && <p className={errorStyle}>{errors.email}</p>}
          </div>

          <div>
            <label className={labelStyle}>Country Code</label>
            <input
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              placeholder="+91"
              className={`${inputStyle} ${errors.countryCode ? 'border-red-500' : ''}`}
            />
            {errors.countryCode && (
              <p className={errorStyle}>{errors.countryCode}</p>
            )}
          </div>

          <div>
            <label className={labelStyle}>Contact Number</label>
            <input
              name="contactNumber"
              type="tel"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Contact Number"
              className={`${inputStyle} ${errors.contactNumber ? 'border-red-500' : ''}`}
              required
            />
            {errors.contactNumber && (
              <p className={errorStyle}>{errors.contactNumber}</p>
            )}
          </div>

          <div>
            <label className={labelStyle}>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className={labelStyle}>Profile Activation</label>
            <select
              name="profileActivation"
              value={formData.profileActivation}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="0">Inactive</option>
              <option value="1">Pending</option>
              <option value="2">Active</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelStyle}>Address</label>
            <textarea
              name="adress"
              value={formData.adress}
              onChange={handleChange}
              placeholder="Full Address"
              className={`${inputStyle} ${errors.adress ? 'border-red-500' : ''}`}
              rows={3}
            />
            {errors.adress && <p className={errorStyle}>{errors.adress}</p>}
          </div>

          <div>
            <label className={labelStyle}>Profile Picture</label>
            <input
              type="file"
              name="profilePic"
              onChange={handleFileChange}
              className={`${inputStyle} ${errors.profilePic ? 'border-red-500' : ''}`}
              accept="image/*"
            />
            {errors.profilePic && (
              <p className={errorStyle}>{errors.profilePic}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Max size: 2MB (JPEG, PNG, GIF)
            </p>
          </div>

          <div>
            <label className={labelStyle}>ID Proof Front</label>
            <input
              type="file"
              name="selfIdentificationPicF"
              onChange={handleFileChange}
              className={`${inputStyle} ${errors.selfIdentificationPicF ? 'border-red-500' : ''}`}
              accept="image/*"
            />
            {errors.selfIdentificationPicF && (
              <p className={errorStyle}>{errors.selfIdentificationPicF}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Max size: 2MB (JPEG, PNG, GIF)
            </p>
          </div>

          <div>
            <label className={labelStyle}>ID Proof Back</label>
            <input
              type="file"
              name="selfIdentificationPicB"
              onChange={handleFileChange}
              className={`${inputStyle} ${errors.selfIdentificationPicB ? 'border-red-500' : ''}`}
              accept="image/*"
            />
            {errors.selfIdentificationPicB && (
              <p className={errorStyle}>{errors.selfIdentificationPicB}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Max size: 2MB (JPEG, PNG, GIF)
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default Employee;
