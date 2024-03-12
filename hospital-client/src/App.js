import "react-day-picker/dist/style.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreateAccount from "./Components/Login/CreateAccount";
import Login from "./Components/Login/Login";
import RequireAuth from "./Components/Login/RequireAUth";
import Bookings from "./Components/Pages/Dashboard/Boooking/Bookings";
import Contact from "./Components/Pages/Dashboard/Contact.js/Contact";
import ManageContacts from './Components/Pages/Dashboard/Contact.js/Manage Contact/ManageContacts';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import MyBookings from './Components/Pages/Dashboard/MyBookings/MyBookings';
import Payment from './Components/Pages/Dashboard/MyBookings/Payment';
import Profile from './Components/Pages/Dashboard/Profile/Profile';
import Appointment from "./Components/Pages/Home/Appointment/Appointment/Appointment";
import Home from './Components/Pages/Home/Home';
import Navbar from "./Components/Share/Navbar";
import NotFound from './Components/Share/NotFound';

function App() {
  return (
    <div>
      <div className="fixed top-0 z-50 bg-white w-full shadow-md">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/appointment" element={<Appointment />}></Route>
        <Route path="/createAccount" element={<CreateAccount />}></Route>
        <Route path="/payment/:id" element={<Payment />} />

        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>

        {/* Dashboard Start */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path="booking" element={<Bookings />} />
          <Route path="myBooking" element={<MyBookings />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="manageContact" element={<ManageContacts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        {/* Dashboard End */}
      </Routes>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
