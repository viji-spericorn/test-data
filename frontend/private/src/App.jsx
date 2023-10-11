// import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/home';
import './components/styles/index.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
// import Truck from './components/Trucks';
import Contact from './components/ContactUs';
import Gallery from './components/Gallery';
import LoginPage from './components/Login';
import Dashboard from './components/Dashboard';
import { useEffect, useState } from 'react';
import AnimatedCursor from 'react-animated-cursor';
// import { ToastContainer, toast } from 'react-toastify';
import Blobity from 'blobity';
import { useDispatch, useSelector } from 'react-redux';
import {
  Permissionsockets,
  resetErrorMessage,
  resetSuccessMessage,
  setProfile,
} from './actions';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';
// import SignUp from './components/testPage';
// import SignUpModal from './components/SignUp';
import MainTest from './components/MainTest';
import { io } from 'socket.io-client';
// import PaymentDetails from './components/PaymentDetails';
import Trucks from './components/Truck';
import RouteForm from './components/routes';
import Permissions from './components/Permissions';
import ListingPage from './components/truckListing';
import CheckoutForm from './components/checkout';
import DriverForm from './components/Driver';
import RoutesForm from './components/RoutesListing';

// const notify = () => toast('Here is your toast.');

// const toastConfig = {
//   position: 'top-right',
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: 'dark',
// };
const socket = io.connect('http://localhost:4000');
function App() {
  const dispatch = useDispatch();
  const { successMessage, errorMessage, loader, designations } = useSelector(
    (state) => state.commonReducer
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage);
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    socket.on('GetPermissions', (data) => {
      console.log('GetPermissions', data);
      dispatch(Permissionsockets(data));
    });
  }, [socket]);

  useEffect(() => {
    dispatch(setProfile());
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="App">
        {/* <AnimatedCursor
          innerSize={8}
          outerSize={8}
          color="193, 11, 111"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          trailingSpeed={8}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link',
          ]}
        /> */}
      </div>
      <div className="App" onScroll={(e) => console.log('scrolled', e)}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          {/* <Route exact path="/trucks" element={<Truck />}></Route> */}
          <Route exact path="/contactUs" element={<Contact />}></Route>
          <Route exact path="/gallery" element={<Gallery />}></Route>
          <Route exact path="/auth/login" element={<LoginPage />}></Route>
          <Route exact path="/auth/signup" element={<MainTest />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="/driverDetails" element={<DriverForm />}></Route>
          <Route exact path="/truck" element={<Trucks />}></Route>
          <Route exact path="/routes" element={<RouteForm />}></Route>
          <Route exact path="/truckList" element={<ListingPage />}></Route>
          <Route exact path="/routeList" element={<RoutesForm />}></Route>

          <Route
            exact
            path="/permissions"
            element={<Permissions socket={socket} />}
          ></Route>

          <Route
            exact
            path="/payment_details"
            element={<CheckoutForm />}
          ></Route>
        </Routes>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default App;
