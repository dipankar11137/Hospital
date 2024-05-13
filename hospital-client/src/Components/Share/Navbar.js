import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const navigate = useNavigate();
  const [booking, setBooking] = useState([]);
  const logout = () => {
    signOut(auth);
  };

  useEffect(() => {
    fetch(`https://boxberry.onrender.com/carBooking/${email}`)
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [booking]);

  const handleBook = () => {
    navigate("/myOrders");
  };

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
          <li className=" hover:text-orange-600">
            <Link to="/myBooking">My Booking</Link>
          </li>
          <li className=" hover:text-orange-600">
            <Link to="/blood">Blood Donner</Link>
          </li>
          <li className=" hover:text-orange-600">
            <Link to="/contact">Contact</Link>
          </li>
        </>
      )}
    {user?.email==='abc@def.com'&&  <li className=" hover:text-orange-600">
        <Link to="/dashboard">Dashboard</Link>
      </li>}
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
          Alok Hospital
        </Link>
      </div>
      {/* <div className="navbar-center hidden lg:flex lg:pr-36 ml-40 text-indigo-900">
        <ul className="menu menu-horizontal p-0 font-semibold">{menuItems}</ul>
      </div> */}
      {/* Image */}
      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex  mr-5 text-indigo-900">
          <ul className="menu menu-horizontal p-0 font-semibold">
            {menuItems}
          </ul>
        </div>
        {user ? (
          <button
            className=" font-semibold mr-10 text-red-600"
            onClick={logout}
          >
            Sign Out
          </button>
        ) : (
          <ul className="mr-5">
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
