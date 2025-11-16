import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoNotifications } from 'react-icons/io5';
import { Link } from "react-router-dom";
import auth from "../../firebase.init";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [booking, setBooking] = useState([]);
  const [users, setUsers] = useState([]);
  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`http://localhost:5000/user/${email}`)
      .then(res => res.json())
      .then(data => setUsers(data[0]));
  }, [email]);

  useEffect(() => {
    fetch(`http://localhost:5000/myBookings/${email}`)
      .then(res => res.json())
      .then(data => setBooking(data));
  }, [booking, email]);

// console.log(users);
  const menuItems = (
    <>
      <li className=" hover:text-orange-600">
        <Link to="/about">About</Link>
      </li>
      <li className=" hover:text-orange-600">
        <Link to="/appointment">Book A Appointment</Link>
      </li>
      {user && (
        <>
          {!users?.admin && (
            <li className=" hover:text-orange-600">
              <Link to="/myBooking">My Booking</Link>
            </li>
          )}

          <li className=" hover:text-orange-600">
            <Link to="/blood">Blood Donner</Link>
          </li>
          <li className=" hover:text-orange-600">
            <Link to="/medicine">Medicine</Link>
          </li>
          <li className=" hover:text-orange-600">
            <Link to="/contact">Contact</Link>
          </li>
          {!users?.admin && (
            <li className=" hover:text-orange-600 indicator">
              <Link to="/myBooking">
                <span className="indicator-item badge badge-sm  bg-red-500 text-white mt-1 mr-3 px-[4px] ">
                  {booking?.length}
                </span>
                <IoNotifications className="text-xl " />
              </Link>
            </li>
          )}
        </>
      )}

      {(user?.email === 'abc@def.com' || users?.admin) && (
        <li className="hover:text-orange-600">
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )}
      {/* {user?.email === 'abc@def.com' || users?.admin && (
        <li className=" hover:text-orange-600">
          <Link to="/dashboard">Dashboard</Link>
        </li>
      )} */}
    </>
  );
  return (
    <div className="  navbar   text-black ">
      <div className="navbar-start ">
        <div className="dropdown">
          <label tabIndex="0" className="btn btn-ghost lg:hidden">
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
        </div>
        <Link
          to="/"
          className="btn btn-ghost  font-bold lg:text-3xl  sm:text-sm text-indigo-700 font-serif  uppercase"
        >
          <img className="h-12 mr-2" src="" alt="" />
          Smart Healthcare
        </Link>
      </div>

      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex  mr-3 text-indigo-900">
          <ul className="menu menu-horizontal p-0 font-semibold">
            {menuItems}
          </ul>
        </div>
        <div className=" flex items-center gap-2 mr-10 ">
          <h1 className="text-xs">{users?.name}</h1>
          <img
            className="h-8 w-8 rounded-full"
            src="https://png.pngtree.com/png-vector/20220813/ourmid/pngtree-vector-icon-with-rounded-edges-in-soft-blue-tones-representing-a-user-vector-png-image_19492744.png"
            alt=""
          />
        </div>
        {user ? (
          <button className=" font-semibold mr-8 text-red-600" onClick={logout}>
            SignOut
          </button>
        ) : (
          <ul className="mr-5 font-semibold text-indigo-900">
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
