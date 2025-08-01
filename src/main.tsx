declare global {
  interface Window {
    google: any;
  }
}
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import AuthApp from './AuthApp';
// import SignIn from './pages/Authentication/SignIn';
import './css/style.css';
import './css/satoshi.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
// import SignUp from './pages/Authentication/SignUp';
// import SellerSignUP from './pages/Authentication/empSignUp';

// Check if a token exists in localStorage
const token = localStorage.getItem('token');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      {token ? <App /> : <AuthApp />}
      {/* {token ? <App /> : <SignUp />} */}
    </Router>
  </React.StrictMode>,
);
