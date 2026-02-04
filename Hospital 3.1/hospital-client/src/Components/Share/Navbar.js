import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useUser from '../../hooks/useUser';

const Navbar = () => {
  const { user } = useUser();
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate();

  const email = user?.email;

  /* =====================
     Logout
  ===================== */
  const logout = () => {
    signOut(auth);
    navigate('/login');
  };

  /* =====================
     Fetch bookings
  ===================== */
  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost:5000/myBookings/${email}`)
      .then(res => res.json())
      .then(data => setBooking(data))
      .catch(console.error);
  }, [email]);

  /* =====================
     Menu Items
  ===================== */
  const menuItems = (
    <>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/appointment">Appointments</Link>
      </li>

      {user && (
        <>
          <li>
            <Link to="/myBooking">My Bookings</Link>
          </li>
          <li>
            <Link to="/blood">Blood Donor</Link>
          </li>
          <li>
            <Link to="/medicine">Medicine</Link>
          </li>
          <li>
            <Link to="/sampleCollection">Sample Collection</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </>
      )}

      {(user?.email === 'abc@def.com' || user?.admin) && (
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* ================= LEFT ================= */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-white rounded-xl w-52"
            >
              {menuItems}
            </ul>
          </div>

          <Link
            to="/"
            className="text-2xl font-bold text-blue-700 tracking-wide"
          >
            Smart Healthcare
          </Link>
        </div>

        {/* ================= CENTER (Desktop) ================= */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 font-medium text-slate-700">
            {menuItems}
          </ul>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="navbar-end flex items-center gap-5">
          {/* Notifications */}
          {user && (
            <Link to="/myBooking" className="relative">
              <IoNotificationsOutline className="text-2xl text-slate-600 hover:text-blue-600" />
              {booking.length > 0 && (
                <span className="absolute -top-3 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {booking.length}
                </span>
              )}
            </Link>
          )}

          {/* User Info */}
          {user && (
            <div
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 cursor-pointer hover:bg-slate-100 px-3 py-1 rounded-lg"
            >
              {/* <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.name}
                </p>
              </div> */}

              {user?.img ? (
                <img
                  src={user.img}
                  alt="User"
                  className="h-9 w-9 rounded-full object-cover border"
                />
              ) : (
                <div className="h-9 w-9 rounded-full bg-slate-200 flex items-center justify-center">
                  <FaUser className="text-slate-600" />
                </div>
              )}
            </div>
          )}

          {/* Auth Button */}
          {user ? (
            <button
              onClick={logout}
              className="text-red-600 font-semibold hover:text-red-700"
            >
              LogOut
            </button>
          ) : (
            <Link
              to="/login"
              className="font-semibold text-blue-700 hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

// import { signOut } from "firebase/auth";
// import { useEffect, useState } from "react";
// import { FaUser } from 'react-icons/fa';
// import { IoNotifications } from 'react-icons/io5';
// import { Link, useNavigate } from "react-router-dom";
// import auth from "../../firebase.init";
// import useUser from "../../hooks/useUser";

// const Navbar = () => {
//   const { user } = useUser();
//   const [booking, setBooking] = useState([]);
//   const [users, setUsers] = useState([]);
//   const navigator = useNavigate();
//   const logout = () => {
//     signOut(auth);
//   };
//   const email = users?.email;

//   useEffect(() => {
//     fetch(`http://localhost:5000/myBookings/${email}`)
//       .then(res => res.json())
//       .then(data => setBooking(data));
//   }, [booking, email]);

//   const handleProfile = (id) => {
//     navigator(`/profile`);
//   };

// // console.log(users);
//   const menuItems = (
//     <>
//       <li className=" hover:text-orange-600">
//         <Link to="/about">About</Link>
//       </li>
//       <li className=" hover:text-orange-600">
//         <Link to="/appointment">Appointment Booking</Link>
//       </li>
//       {user && (
//         <>
//           {!users?.admin && (
//             <li className=" hover:text-orange-600">
//               <Link to="/myBooking">My Booking</Link>
//             </li>
//           )}

//           <li className=" hover:text-orange-600">
//             <Link to="/blood">Blood Donner</Link>
//           </li>
//           <li className=" hover:text-orange-600">
//             <Link to="/medicine">Medicine Corner</Link>
//           </li>
//           <li className=" hover:text-orange-600">
//             <Link to="/contact">Contact</Link>
//           </li>
//           {!users?.admin && (
//             <li className=" hover:text-orange-600 indicator">
//               <Link to="/myBooking">
//                 <span className="indicator-item badge badge-sm  bg-red-500 text-white mt-1 mr-3 px-[4px] ">
//                   {booking?.length}
//                 </span>
//                 <IoNotifications className="text-xl " />
//               </Link>
//             </li>
//           )}
//         </>
//       )}

//       {(user?.email === 'abc@def.com' || users?.admin) && (
//         <li className="hover:text-orange-600">
//           <Link to="/dashboard">Dashboard</Link>
//         </li>
//       )}
//       {/* {user?.email === 'abc@def.com' || users?.admin && (
//         <li className=" hover:text-orange-600">
//           <Link to="/dashboard">Dashboard</Link>
//         </li>
//       )} */}
//     </>
//   );
//   return (
//     <div className="  navbar   text-black ">
//       <div className="navbar-start ">
//         <div className="dropdown">
//           <label tabIndex="0" className="btn btn-ghost lg:hidden">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h8m-8 6h16"
//               />
//             </svg>
//           </label>
//         </div>
//         <Link
//           to="/"
//           className="btn btn-ghost  font-semibold lg:text-3xl  sm:text-sm text-primary   uppercase"
//         >
//           <img className="h-12 mr-2" src="" alt="" />
//           Smart Healthcare
//         </Link>
//       </div>

//       <div className="navbar-end">
//         <div className="navbar-center hidden lg:flex  mr-3 text-primary">
//           <ul className="menu menu-horizontal p-0 font-semibold font-meStyle text-primary">
//             {menuItems}
//           </ul>
//         </div>
//         <div onClick={()=>handleProfile(user._id)} className=" flex items-center gap-2 mr-10 text-slate-700 cursor-pointer">
//           <h1 className=" font-semibold">{user?.name}</h1>
//           {
//             user?.img ? <img className="h-8 w-8 rounded-full " src={user?.img} alt="User Avatar" /> :
//             <FaUser className="h-6 w-6   " />
//           }
//         </div>
//         {user ? (
//           <button className=" font-semibold mr-8 text-red-600" onClick={logout}>
//             LogOut
//           </button>
//         ) : (
//           <ul className="mr-5 font-semibold text-indigo-900">
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
