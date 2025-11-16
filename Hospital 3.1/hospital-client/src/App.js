import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreateAccount from "./Components/Login/CreateAccount";
import Login from "./Components/Login/Login";
import RequireAuth from "./Components/Login/RequireAUth";
import About from "./Components/Pages/About/About";
import BloodDonner from "./Components/Pages/Blood Donner/BloodDonner";
import Contact from "./Components/Pages/Contact/Contact";
import AddDoctor from "./Components/Pages/Dashboard/AddDoctor/AddDoctor";
import AddMedicine from "./Components/Pages/Dashboard/AddMedicine/AddMedicine";
import BookMedicine from "./Components/Pages/Dashboard/BookMedicine/BookMedicine";
import Bookings from "./Components/Pages/Dashboard/Boooking/Bookings";
import ContactUs from "./Components/Pages/Dashboard/Contact Us/ContactUs";
import ManageContacts from './Components/Pages/Dashboard/Contact.js/Manage Contact/ManageContacts';
import Dashboard from './Components/Pages/Dashboard/Dashboard';
import AddDonner from "./Components/Pages/Dashboard/Donner/AddDonner";
import ManageDonner from "./Components/Pages/Dashboard/Donner/ManageDonner";
import EditDoctor from "./Components/Pages/Dashboard/ManageDoctor/EditDoctor";
import ManageDoctors from "./Components/Pages/Dashboard/ManageDoctor/ManageDoctors";
import MyBookings from './Components/Pages/Dashboard/MyBookings/MyBookings';
import Payment from './Components/Pages/Dashboard/MyBookings/Payment';
import Profile from './Components/Pages/Dashboard/Profile/Profile';
import UpdateAbout from "./Components/Pages/Dashboard/Update About/UpdateAbout";
import Update from "./Components/Pages/Dashboard/Update/Update";
import Users from "./Components/Pages/Dashboard/User/Users";
import Appointment from "./Components/Pages/Home/Appointment/Appointment/Appointment";
import DoctorDetails from "./Components/Pages/Home/DoctorDetails/DoctorDetails";
import Home from './Components/Pages/Home/Home';
import Medicine from "./Components/Pages/Medicine/Medicine";
import Header from "./Components/Share/Header";
import Navbar from "./Components/Share/Navbar";
import NotFound from './Components/Share/NotFound';

function App() {
   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
     const handleScroll = () => {
       const scrollTop =
         window.pageYOffset || document.documentElement.scrollTop;
       setIsScrolled(scrollTop > 0);
     };

     window.addEventListener('scroll', handleScroll);

     return () => {
       window.removeEventListener('scroll', handleScroll);
     };
   }, []);
  return (
    <div className="font-robot">
      <div className="duration-1000">
        <Header />
      </div>
      <div
        className={`fixed  bg-white w-full shadow-md ${
          isScrolled ? ' fixed top-0 z-50 duration-1000' : ''
        }`}
      >
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/createAccount" element={<CreateAccount />}></Route>
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/medicine" element={<Medicine />} />

        <Route
          path="/myBooking"
          element={
            <RequireAuth>
              <MyBookings />
            </RequireAuth>
          }
        />
        <Route
          path="/blood"
          element={
            <RequireAuth>
              <BloodDonner />
            </RequireAuth>
          }
        />
        <Route
          path="appointment"
          element={
            <RequireAuth>
              <Appointment />
            </RequireAuth>
          }
        />
        <Route path="/doctorDetails/:id" element={<DoctorDetails />} />
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
          <Route index element={<Bookings />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="addDoctor" element={<AddDoctor />} />
          <Route path="addMedicine" element={<AddMedicine />} />
          <Route path="medicineBooking" element={<BookMedicine />} />
          <Route path="manageDoctor" element={<ManageDoctors />} />
          <Route path="editDoctor/:id" element={<EditDoctor />} />
          <Route path="manageContact" element={<ManageContacts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="update" element={<Update />} />
          <Route path="updateAbout" element={<UpdateAbout />} />
          <Route path="contactUs" element={<ContactUs />} />
          <Route path="user" element={<Users />} />
          <Route path="addDonner" element={<AddDonner />} />
          <Route path="manageDonner" element={<ManageDonner />} />
        </Route>
        {/* Dashboard End */}
      </Routes>
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
