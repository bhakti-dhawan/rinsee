import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { signInAdmin } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signInAdmin(email, password);
      const { token, admin: user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', user.user_id);
      localStorage.setItem('role', user.role);
      localStorage.setItem(
        'userName',
        `${user.nameprefix} ${user.firstName} ${user.lastName}`,
      );
      localStorage.setItem('contactNumber', user.contactNumber);
      localStorage.setItem('email', user.email);
      navigate('/dashboard');
      window.location.reload();
    } catch (err: any) {
      console.log(err);
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Admin Login" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          {/* LEFT SIDE - Do not modify */}
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="dark:hidden h-50 w-50" // <-- Reduced size
                  src="/images/rinsee.png"
                  alt="Logo"
                />
              </Link>
              <p className="2xl:px-20">
                Welcome back! Please enter your admin credentials to access the
                dashboard.
              </p>
            </div>
          </div>
          {/* RIGHT SIDE - Form */}
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Admin Portal</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Login to Admin Dashboard
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your admin email"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

                <div className="mb-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-60"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>

                <div className="text-center">
                  <p>
                    Forgot password?{' '}
                    <Link to="/auth/forgot-password" className="text-primary">
                      Reset here
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

export default AdminLogin;
