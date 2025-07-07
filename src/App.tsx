import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Overview from './pages/Overview';
import User from './pages/User';
import Store from './pages/UiElements/Store';
import Employee from './pages/UiElements/Employee';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Invoice from './pages/Invoice';
import RequestForm from './pages/RequestForm';
import StoreList from './pages/Storelist';
import StoreDetail from './pages/Storedetail';
import SellerSignUP from './pages/Authentication/empSignUp';
import EmpList from './pages/EmpList';
import OrderPickUp from './pages/OrderPickUp';
import AllServices from './pages/AllServices';
import ServiceDetails from './pages/ServiceDetails';
import SellerSignUp from './pages/Authentication/empSignUp';
import AllStores from './pages/AllStores';
import Allemployees from './pages/Allemployees';
import Allusers from './pages/Allusers';
import AddSeller from './pages/Addseller';
import StoreForm from './pages/StoreForm';
import PickUp from './pages/PickUp';
import Map from './components/Map'; // ✅

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Rinsee Dashboard" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile" />
              <Profile />
            </>
          }
        />
        <Route
          path="/overview"
          element={
            <>
              <PageTitle title="Overview  " />
              <Overview />
            </>
          }
        />
        <Route
          path="/addseller"
          element={
            <>
              <PageTitle title="AddSeller  " />
              <AddSeller />
            </>
          }
        />
        <Route
          path="/storeform"
          element={
            <>
              <PageTitle title="storeform  " />
              <StoreForm />
            </>
          }
        />
        <Route
          path="/allusers"
          element={
            <>
              <PageTitle title="AllUsers  " />
              <Allusers />
            </>
          }
        />
        <Route
          path="/pickup"
          element={
            <>
              <PageTitle title="AllUsers  " />
              <PickUp />
            </>
          }
        />
        <Route
          path="/allemployees"
          element={
            <>
              <PageTitle title="AllEmployees  " />
              <Allemployees />
            </>
          }
        />
        <Route
          path="/allstores"
          element={
            <>
              <PageTitle title="AllStores  " />
              <AllStores />
            </>
          }
        />
        <Route
          path="/invoice"
          element={
            <>
              <PageTitle title="Invoice  " />
              <Invoice />
            </>
          }
        />
        <Route
          path="/requestform"
          element={
            <>
              <PageTitle title="RequestForm  " />
              <RequestForm />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <PageTitle title="User " />
              <User />
            </>
          }
        />
        <Route
          path="/store"
          element={
            <>
              <PageTitle title="Store " />
              <Store />
            </>
          }
        />
        <Route
          path="/allservices"
          element={
            <>
              <PageTitle title="allservices " />
              <AllServices />
            </>
          }
        />
        <Route
          path="/orderpickup"
          element={
            <>
              <PageTitle title="orderpickup " />
              <OrderPickUp />
            </>
          }
        />
        <Route path="/servicedetails" element={<ServiceDetails />} />
        <Route path="/stores" element={<StoreList />} />
        <Route path="/stores/:id" element={<StoreDetail />} />
        <Route path="/emplist" element={<EmpList />} />
        <Route
          path="/employee"
          element={
            <>
              <PageTitle title="Employee " />
              <Employee />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements " />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout " />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables " />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings " />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart " />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts " />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons " />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />
        {/* ✅ Added Map route here */}
        <Route
          path="/map"
          element={
            <>
              <PageTitle title="Google Map Example" />
              <Map />
            </>
          }
        />

        <Route
          path="/auth/sellersignup"
          element={
            <>
              <PageTitle title="sellersignup " />
              <SellerSignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
