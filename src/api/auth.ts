import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3000/api';
const API_BASE_URL = 'http://194.164.151.48/rinsee/api';

 const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example Sign-In API
export const signInAdmin = async (email: string, password: string) => {
  const response = await api.post(API_BASE_URL+'/admin/login', { email, password });
  return response.data;
};
 

export const signIn = async (payload: { countryCode: string; contactNumber: string }) => {
  const response = await axios.post(API_BASE_URL+ '/store/login', payload);
  return response.data;
};

export const verifyOtp = (payload: { countryCode: any; contactNumber: any; otp: any }) => {
  console.log("payload",payload)
  // console.log("contactNumber",contactNumber)
  // console.log("contactNumber",otp)
  return axios.post( API_BASE_URL+ '/store/verifyOtp', payload); // adjust endpoint accordingly
};

export const empSignUpApi = async (payload: any) => {
  const response = await api.post(`${API_BASE_URL}/auth/signUp`, payload , {
      headers: {
          'Content-Type': 'multipart/form-data',
      },
      data: payload,
  });
  return response.data;
};
 
export const addSellerSignup = async (payload: any) => {
  const response = await api.post(`${API_BASE_URL}/store/createStore`, payload, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

