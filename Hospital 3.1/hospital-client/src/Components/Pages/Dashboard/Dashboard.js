import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiTwotoneMedicineBox } from 'react-icons/ai';
import { FaFileMedicalAlt, FaUserMd, FaUserPlus } from 'react-icons/fa';
import { FcAbout } from 'react-icons/fc';
import { GrUpdate } from 'react-icons/gr';
import { IoIosPeople } from 'react-icons/io';
import { PiEyedropperSampleDuotone } from 'react-icons/pi';

import {
  MdDashboard,
  MdLocalPharmacy,
  MdOutlineWifiCalling
} from 'react-icons/md';
import { Link, Outlet, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Button 10');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 pt-16">
      <div className="">
        <div className="drawer drawer-mobile">
          <input
            id="dashboard-sidebar"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <Outlet></Outlet>
          </div>

          {/* Sidebar */}
          <div className="drawer-side navigation">
            <label
              htmlFor="dashboard-sidebar"
              className="drawer-overlay"
            ></label>
            <section className="flex">
              <div
                className={`${
                  open ? 'w-60' : 'w-20'
                } bg-gradient-to-b from-indigo-700 via-indigo-600 to-blue-700 h-screen p-5 text-white pt-8 relative duration-300 shadow-xl`}
              >
                {/* Sidebar toggle button */}
                <img
                  src="https://cdn.pixabay.com/photo/2012/04/11/17/14/left-28998_1280.png"
                  className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-indigo-400 bg-white rounded-full p-1 shadow-lg ${
                    !open && 'rotate-180'
                  }`}
                  onClick={() => setOpen(!open)}
                  alt="toggle"
                />

                {/* Logo */}
                <div className="flex gap-x-4 items-center">
                  <div onClick={() => setSelectedButton('Button 10')}>
                    <Link to={'/dashboard'}>
                      <img
                        src="https://img.icons8.com/m_rounded/200/FFFFFF/settings.png"
                        className={`cursor-pointer duration-500 rounded-full ${
                          open && 'rotate-[360deg] h-20'
                        }`}
                        alt="logo"
                      />
                    </Link>
                  </div>
                </div>

                {/* Navigation buttons */}
                <div className="mt-4 flex flex-col gap-3 relative pt-0 text-sm">
                  {/* Dashboard */}
                  <div
                    onClick={() => setSelectedButton('Button 10')}
                    className={`${
                      selectedButton === 'Button 10'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <MdDashboard size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Manage Booking
                      </h2>
                    </Link>
                  </div>
                  {/* Medicine Booking */}
                  <div
                    onClick={() => setSelectedButton('Button MB')}
                    className={`${
                      selectedButton === 'Button MB'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/medicineBooking"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <MdLocalPharmacy size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Medicine Booking
                      </h2>
                    </Link>
                  </div>

                  {/* Add Doctor */}
                  <div
                    onClick={() => setSelectedButton('Button 5')}
                    className={`${
                      selectedButton === 'Button 5'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/addDoctor"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <FaUserPlus size={22} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Add Doctor
                      </h2>
                    </Link>
                  </div>
                  {/* Add Medicine */}
                  <div
                    onClick={() => setSelectedButton('Button m')}
                    className={`${
                      selectedButton === 'Button m'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/addMedicine"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <AiTwotoneMedicineBox size={22} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Add Medicine
                      </h2>
                    </Link>
                  </div>

                  {/* Manage Doctor */}
                  <div
                    onClick={() => setSelectedButton('Button 6')}
                    className={`${
                      selectedButton === 'Button 6'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/manageDoctor"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <FaUserMd size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Manage Doctor
                      </h2>
                    </Link>
                  </div>

                  {/* Update */}
                  <div
                    onClick={() => setSelectedButton('update')}
                    className={`${
                      selectedButton === 'update'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/update"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <GrUpdate size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Update
                      </h2>
                    </Link>
                  </div>

                  {/* Add Donor */}
                  {/* <div
                    onClick={() => setSelectedButton('addDonner')}
                    className={`${
                      selectedButton === 'addDonner'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/addDonner"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <MdBloodtype size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Add Donor
                      </h2>
                    </Link>
                  </div> */}

                  {/* Manage Donor */}
                  {/* <div
                    onClick={() => setSelectedButton('manageDonner')}
                    className={`${
                      selectedButton === 'manageDonner'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/manageDonner"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <MdManageHistory size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Manage Donor
                      </h2>
                    </Link>
                  </div> */}

                  {/* Manage Sample */}
                  <div
                    onClick={() => setSelectedButton('manageSample')}
                    className={`${
                      selectedButton === 'manageSample'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/showSample"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <PiEyedropperSampleDuotone size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Manage Sample
                      </h2>
                    </Link>
                  </div>

                  {/* Emergency Booking */}
                  <div
                    onClick={() => setSelectedButton('EmergencyBooking')}
                    className={`${
                      selectedButton === 'EmergencyBooking'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/emergencyBooking"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <FaFileMedicalAlt size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Emergency Booking
                      </h2>
                    </Link>
                  </div>
                  {/* About */}
                  <div
                    onClick={() => setSelectedButton('about')}
                    className={`${
                      selectedButton === 'about'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/updateAbout"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <FcAbout size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        About
                      </h2>
                    </Link>
                  </div>

                  {/* Manage Contact */}
                  <div
                    onClick={() => setSelectedButton('contact')}
                    className={`${
                      selectedButton === 'contact'
                        ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                        : 'hover:bg-indigo-500/40'
                    }`}
                  >
                    <Link
                      to="/dashboard/contactUs"
                      className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                    >
                      <MdOutlineWifiCalling size={20} />
                      <h2
                        className={`whitespace-pre duration-500 ${
                          !open && 'opacity-0 translate-x-28 overflow-hidden'
                        }`}
                      >
                        Manage Contact
                      </h2>
                    </Link>
                  </div>

                  {/* Manage User (admin only) */}
                  {user?.email === 'abc@def.com' && (
                    <div
                      onClick={() => setSelectedButton('user')}
                      className={`${
                        selectedButton === 'user'
                          ? 'bg-white text-indigo-700 w-[215px] rounded-lg shadow-md'
                          : 'hover:bg-indigo-500/40'
                      }`}
                    >
                      <Link
                        to="/dashboard/user"
                        className="group flex items-center text-[17px] w-[215px] gap-3.5 font-medium p-2 rounded-md"
                      >
                        <IoIosPeople size={20} />
                        <h2
                          className={`whitespace-pre duration-500 ${
                            !open && 'opacity-0 translate-x-28 overflow-hidden'
                          }`}
                        >
                          Manage User
                        </h2>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { FaUserMd, FaUserPlus } from 'react-icons/fa';
// import { FcAbout } from 'react-icons/fc';
// import { GrUpdate } from 'react-icons/gr';
// import { IoIosPeople } from 'react-icons/io';

// import {
//   MdBloodtype,
//   MdDashboard,
//   MdManageHistory,
//   MdOutlineWifiCalling
// } from 'react-icons/md';
// import { Link, Outlet, useLocation } from 'react-router-dom';
// import auth from '../../../firebase.init';

// const Dashboard = () => {
//   const [user] = useAuthState(auth);
//    const { pathname } = useLocation();

//   const [open, setOpen] = useState(false);
//   const [selectedButton, setSelectedButton] = useState('Button 10');

// // console.log(user.email);
//     useEffect(() => {
//       window.scrollTo(0, 0);
//     }, [pathname]);
//   return (
//     <div className="bg-white pt-16">
//       <div className="">
//         <div className="drawer drawer-mobile">
//           <input
//             id="dashboard-sidebar"
//             type="checkbox"
//             className="drawer-toggle"
//           />
//           <div className="drawer-content">
//             <Outlet></Outlet>
//           </div>
//           <div className="drawer-side navigation ">
//             <label
//               htmlFor="dashboard-sidebar"
//               className="drawer-overlay "
//             ></label>
//             <section className="flex ">
//               <div
//                 className={` ${
//                   open ? 'w-60' : 'w-20 '
//                 } bg-primary h-screen p-5 text-white pt-8 relative duration-300`}
//               >
//                 <img
//                   src="https://cdn.pixabay.com/photo/2012/04/11/17/14/left-28998_1280.png"
//                   className={`absolute cursor-pointer -right-3 top-9 w-7
//              border-2 rounded-full  ${!open && 'rotate-180'}`}
//                   onClick={() => setOpen(!open)}
//                   alt=""
//                 />
//                 <div className="flex gap-x-4 items-center">
//                   <div onClick={() => setSelectedButton('Button 10')}>
//                     {' '}
//                     <Link to={'/dashboard'}>
//                       {' '}
//                       <img
//                         src="https://www.svgrepo.com/download/7869/settings.svg"
//                         className={`cursor-pointer duration-500 rounded-full ${
//                           open && 'rotate-[360deg] h-20  '
//                         }`}
//                         alt=""
//                       />
//                     </Link>
//                   </div>
//                 </div>

//                 <div className="mt-4 flex flex-col gap-4 relative pt-10">
//                   {/* Dashboard */}
//                   <div
//                     onClick={() => setSelectedButton('Button 10')}
//                     className={
//                       selectedButton === 'Button 10'
//                         ? 'bg-white text-black w-[215px] rounded-lg'
//                         : ''
//                     }
//                   >
//                     {' '}
//                     <Link
//                       to="/dashboard"
//                       className={`  group flex items-center text-xl w-[215px] gap-3.5 font-medium p-2 hover:bg-indigo-400 rounded-md`}
//                     >
//                       <div>
//                         {React.createElement(MdDashboard, {
//                           size: '20',
//                         })}
//                       </div>
//                       <h2
//                         style={{
//                           transitionDelay: `${0 + 3}00ms`,
//                         }}
//                         className={`whitespace-pre duration-500  ${
//                           !open && 'opacity-0 translate-x-28 overflow-hidden '
//                         }`}
//                       >
//                         Manage Booking
//                       </h2>
//                     </Link>
//                   </div>

//                   {/* add doctor */}
//                   <div
//                     onClick={() => setSelectedButton('Button 5')}
//                     className={
//                       selectedButton === 'Button 5'
//                         ? 'bg-white text-black w-[215px] rounded-lg'
//                         : ''
//                     }
//                   >
//                     {' '}
//                     <Link
//                       to="/dashboard/addDoctor"
//                       className={`  group flex items-center text-xl w-[215px] gap-3.5 font-medium p-2  hover:bg-indigo-400 rounded-md`}
//                     >
//                       <div>
//                         {React.createElement(FaUserPlus, {
//                           size: '24',
//                         })}
//                       </div>
//                       <h2
//                         style={{
//                           transitionDelay: `${0 + 3}00ms`,
//                         }}
//                         className={`whitespace-pre duration-500 ${
//                           !open && 'opacity-0 translate-x-28 overflow-hidden '
//                         }`}
//                       >
//                         Add Doctor
//                       </h2>
//                     </Link>
//                   </div>

//                   {/* Manage Porduct */}
//                   <div
//                     onClick={() => setSelectedButton('Button 6')}
//                     className={
//                       selectedButton === 'Button 6'
//                         ? 'bg-white w-[215px] text-black rounded-lg '
//                         : ''
//                     }
//                   >
//                     {' '}
//                     <Link
//                       to="/dashboard/manageDoctor"
//                       className={`  group flex items-center text-xl w-[215px]  gap-3.5 font-medium p-2 hover:bg-indigo-400 rounded-md`}
//                     >
//                       <div>
//                         {React.createElement(FaUserMd, {
//                           size: '20',
//                         })}
//                       </div>
//                       <h2
//                         style={{
//                           transitionDelay: `${0 + 3}00ms`,
//                         }}
//                         className={`whitespace-pre duration-500 ${
//                           !open &&
//                           'opacity-0 translate-x-28 overflow-hidden w-[215px]'
//                         }`}
//                       >
//                         Manage Doctor
//                       </h2>
//                     </Link>
//                   </div>
//                   {/* Manage update */}
//                   <div
//                     onClick={() => setSelectedButton('update')}
//                     className={
//                       selectedButton === 'update'
//                         ? 'bg-white w-[215px] text-black rounded-lg '
//                         : ''
//                     }
//                   >
//                     {' '}
//                     <Link
//                       to="/dashboard/update"
//                       className={`  group flex items-center text-xl w-[215px]  gap-3.5 font-medium p-2 hover:bg-indigo-400 rounded-md`}
//                     >
//                       <div>
//                         {React.createElement(GrUpdate, {
//                           size: '20',
//                         })}
//                       </div>
//                       <h2
//                         style={{
//                           transitionDelay: `${0 + 3}00ms`,
//                         }}
//                         className={`whitespace-pre duration-500 ${
//                           !open &&
//                           'opacity-0 translate-x-28 overflow-hidden w-[215px]'
//                         }`}
//                       >
//                         Update
//                       </h2>
//                     </Link>
//                   </div>
//                   {/* Add Donner  */}
//                   <div
//                     onClick={() => setSelectedButton('addDonner')}
//                     className={
//                       selectedButton === 'addDonner'
//                         ? 'bg-white w-[215px] text-black rounded-lg '
//                         : ''
//                     }
//                   >
//                     {' '}
//                     <Link
//                       to="/dashboard/addDonner"
//                       className={`  group flex items-center text-xl w-[215px]  gap-3.5 font-medium p-2 hover:bg-indigo-400 rounded-md`}
//                     >
//                       <div>
//                         {React.createElement(MdBloodtype, {
//                           size: '20',
//                         })}
//                       </div>
//                       <h2
//                         style={{
//                           transitionDelay: `${0 + 3}00ms`,
//                         }}
//                         className={`whitespace-pre duration-500 ${
//                           !open &&
//                           'opacity-0 translate-x-28 overflow-hidden w-[215px]'
//                         }`}
//                       >
//                         Add Donner
//                       </h2>
//                     </Link>
//                   </div>
//                   {/* Manage donner */}
//                   <div
//                     onClick={() => setSelectedButton('manageDonner')}
//                     className={
//                       selectedButton === 'manageDonner'
//                         ? 'bg-white w-[215px] text-black rounded-lg '
//                         : ''
//                     }
//                   >
//                     {' '}
//                     <Link
//                       to="/dashboard/manageDonner"
//                       className={`  group flex items-center text-xl w-[215px]  gap-3.5 font-medium p-2 hover:bg-indigo-400 rounded-md`}
//                     >
//                       <div>
//                         {React.createElement(MdManageHistory, {
//                           size: '20',
//                         })}
//                       </div>
//                       <h2
//                         style={{
//                           transitionDelay: `${0 + 3}00ms`,
//                         }}
//                         className={`whitespace-pre duration-500 ${
//                           !open &&
//                           'opacity-0 translate-x-28 overflow-hidden w-[215px]'
//                         }`}
//                       >
//                         Manage Donner
//                       </h2>
//                     </Link>
//                   </div>
//                   {/* Manage about */}
//                   <div
//                     onClick={() => setSelectedButton('about')}
//                     className={
//                       selectedButton === 'about'
//                         ? 'bg-white w-[215px] text-black rounded-lg '
//                         : ''
//                     }
//                   >
//                     {' '}
//                     <Link
//                       to="/dashboard/updateAbout"
//                       className={`  group flex items-center text-xl w-[215px]  gap-3.5 font-medium p-2 hover:bg-indigo-400 rounded-md`}
//                     >
//                       <div>
//                         {React.createElement(FcAbout, {
//                           size: '20',
//                         })}
//                       </div>
//                       <h2
//                         style={{
//                           transitionDelay: `${0 + 3}00ms`,
//                         }}
//                         className={`whitespace-pre duration-500 ${
//                           !open &&
//                           'opacity-0 translate-x-28 overflow-hidden w-[215px]'
//                         }`}
//                       >
//                         About
//                       </h2>
//                     </Link>
//                   </div>
//                   {/* Manage Contact */}
//                   <div
//                     onClick={() => setSelectedButton('contact')}
//                     className={
//                       selectedButton === 'contact'
//                         ? 'bg-white w-[215px] text-black rounded-lg '
//                         : ''
//                     }
//                   >
//                     {' '}
//                     <Link
//                       to="/dashboard/contactUs"
//                       className={`  group flex items-center text-xl w-[215px]  gap-3.5 font-medium p-2 hover:bg-indigo-400 rounded-md`}
//                     >
//                       <div>
//                         {React.createElement(MdOutlineWifiCalling, {
//                           size: '20',
//                         })}
//                       </div>
//                       <h2
//                         style={{
//                           transitionDelay: `${0 + 3}00ms`,
//                         }}
//                         className={`whitespace-pre duration-500 ${
//                           !open &&
//                           'opacity-0 translate-x-28 overflow-hidden w-[215px]'
//                         }`}
//                       >
//                         Manage Contact
//                       </h2>
//                     </Link>
//                   </div>
//                   {/* Manage user */}
//                   {user?.email === 'abc@def.com' && (
//                     <div
//                       onClick={() => setSelectedButton('user')}
//                       className={
//                         selectedButton === 'user'
//                           ? 'bg-white w-[215px] text-black rounded-lg '
//                           : ''
//                       }
//                     >
//                       {' '}
//                       <Link
//                         to="/dashboard/user"
//                         className={`  group flex items-center text-xl w-[215px]  gap-3.5 font-medium p-2 hover:bg-indigo-400 rounded-md`}
//                       >
//                         <div>
//                           {React.createElement(IoIosPeople, {
//                             size: '20',
//                           })}
//                         </div>
//                         <h2
//                           style={{
//                             transitionDelay: `${0 + 3}00ms`,
//                           }}
//                           className={`whitespace-pre duration-500 ${
//                             !open &&
//                             'opacity-0 translate-x-28 overflow-hidden w-[215px]'
//                           }`}
//                         >
//                           Manage User
//                         </h2>
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
