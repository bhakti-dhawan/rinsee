import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { signIn, verifyOtp } from '../../api/auth';

const SignIn: React.FC = () => {
  const [testotp, setTestotp] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [contactNumber, setContactNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'send' | 'verify'>('send');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlesignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await signIn({ countryCode, contactNumber });
      setTestotp(res?.data?.otp);
      setStep('verify');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await verifyOtp({ countryCode, contactNumber, otp });
      console.log('res', res);
      const resData = res?.data?.data;

      localStorage.setItem('token', resData?.token);
      localStorage.setItem('userId', resData?._id);
      localStorage.setItem('role', resData?.role);
      // localStorage.setItem(
      //   'userName',
      //   `${user.nameprefix} ${user.firstName} ${user.lastName}`,
      // );
      localStorage.setItem('contactNumber', resData?.contactNumber);
      // localStorage.setItem('email', user.email);

      console.log('token', resData?.token);
      console.log('userId', resData?._id);
      console.log('role', resData?.role);
      console.log('contactNumber', resData?.contactNumber);

      if (resData?.profileActivation == 1) {
        navigate('/');
      } else {
        navigate('/storeform');
      }
      window.location.reload();
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Sign In" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
              <Link className="mb-5.5 inline-block" to="/">
                <img
                  className="dark:hidden"
                  src="/images/rinsee.png"
                  alt="Logo"
                  height="200px"
                  width="200px"
                />
              </Link>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>
            </div>
          </div>

          <div className="w-full xl:w-1/2 border-l dark:border-strokedark p-4 sm:p-12.5 xl:p-17.5">
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              {step === 'send' ? 'Sign In with Mobile' : 'Enter OTP'}
            </h2>

            <form onSubmit={step === 'send' ? handlesignIn : handleVerifyOtp}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Mobile Number
                </label>
                <div className="flex items-center rounded-lg border border-stroke bg-transparent pl-4 pr-4 dark:bg-form-input dark:border-form-strokedark">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={step === 'verify'}
                    className="bg-transparent py-4 pr-2 text-black dark:text-white outline-none"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+81">🇯🇵 +81</option>
                  </select>
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    disabled={step === 'verify'}
                    placeholder="Enter your mobile number"
                    className="w-full bg-transparent py-4 pl-4 text-black dark:text-white outline-none"
                  />
                </div>
              </div>

              {step === 'verify' && (
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    OTP <span className="text-red-500">{testotp}</span>
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black dark:text-white dark:bg-form-input dark:border-form-strokedark outline-none focus:border-primary"
                  />
                </div>
              )}

              {error && (
                <div className="mb-4 text-red-500 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                {loading
                  ? step === 'send'
                    ? 'Sending OTP...'
                    : 'Verifying...'
                  : step === 'send'
                    ? 'Sign In'
                    : 'Verify OTP'}
              </button>

              {/* <div className="mt-4 text-center text-sm text-black dark:text-white">
                Don’t have an account?{' '}
                <Link
                  to="/auth/SellerSignUP"
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
