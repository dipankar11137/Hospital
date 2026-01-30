// import { FaEnvelope, FaHospital, FaPhoneAlt, FaUserMd } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import useUser from "../../../hooks/useUser";

// const ProfilePage = () => {
//   const { user } = useUser();
//   const navigate = useNavigate();

//   const handleProfile = () => {
//     navigate("/editProfile");
//   };

//   return (
//     <div className="bg-slate-100 min-h-screen pt-[70px]">
//       {/* ================= HEADER ================= */}
//       <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 h-64">
//         {/* Profile Info */}
//         <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 w-[90%] max-w-5xl">
//           <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
//             {/* Avatar */}
//             <img
//               className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
//               src={
//                 user?.img ||
//                 "https://cdn-icons-png.flaticon.com/512/387/387561.png"
//               }
//               alt="Profile"
//             />

//             {/* Basic Info */}
//             <div className="flex-1 text-center md:text-left">
//               <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2 justify-center md:justify-start">
//                 <FaUserMd className="text-blue-600" />
//                 {user?.name || "Medical User"}
//               </h1>

//               <p className="text-slate-600 mt-1">
//                 {user?.designation || "Healthcare Professional"}
//               </p>

//               <p className="text-sm text-slate-500 mt-1">
//                 {user?.hospital || "Smart Healthcare Center"}
//               </p>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3">
//               <button
//                 onClick={handleProfile}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
//               >
//                 Edit Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= CONTENT ================= */}
//       <div className="mt-28 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* LEFT: About */}
//         <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
//           <h2 className="text-xl font-semibold text-slate-800 mb-4">
//             Professional Information
//           </h2>

//           <div className="space-y-3 text-slate-700">
//             <p>
//               <span className="font-semibold">Specialization:</span>{" "}
//               {user?.specialization || "General Medicine"}
//             </p>

//             <p>
//               <span className="font-semibold">Experience:</span>{" "}
//               {user?.experience || "5+ Years"}
//             </p>

//             <p>
//               <span className="font-semibold">About:</span>{" "}
//               {user?.bio ||
//                 "Dedicated healthcare professional committed to patient safety, ethical practice, and quality medical service."}
//             </p>
//           </div>
//         </div>

//         {/* RIGHT: Contact Card */}
//         <div className="bg-white rounded-xl shadow p-6">
//           <h2 className="text-xl font-semibold text-slate-800 mb-4">
//             Contact Details
//           </h2>

//           <div className="space-y-4 text-slate-700">
//             <div className="flex items-center gap-3">
//               <FaEnvelope className="text-blue-600" />
//               <span>{user?.email || "Not provided"}</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <FaPhoneAlt className="text-blue-600" />
//               <span>{user?.phone || "Not provided"}</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <FaHospital className="text-blue-600" />
//               <span>{user?.hospital || "Smart Healthcare Center"}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import {
  FaBirthdayCake,
  FaEnvelope,
  FaHospital,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTint,
  FaUserMd,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hooks/useUser';

const ProfilePage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="bg-slate-100 min-h-screen pt-[70px]">
      {/* ================= HEADER ================= */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 h-64">
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[90%] max-w-5xl">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              src={
                user?.img ||
                'https://cdn-icons-png.flaticon.com/512/387/387561.png'
              }
              alt="Profile"
            />

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2 justify-center md:justify-start">
                <FaUserMd className="text-blue-600" />
                {user?.name || 'Medical User'}
              </h1>

              <p className="text-slate-600 mt-1">
                {user?.workplace || 'Healthcare Professional'}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                {user?.location || 'Location not provided'}
              </p>
            </div>

            {/* Action */}
            <button
              onClick={() => navigate('/editProfile')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="mt-28 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: About */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Personal & Professional Information
          </h2>

          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-semibold">About:</span>{' '}
              {user?.bio ||
                'Dedicated healthcare professional committed to quality service and patient care.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3">
                <FaBirthdayCake className="text-blue-600" />
                <span>
                  <strong>Age:</strong> {user?.age || 'Not provided'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaTint className="text-red-600" />
                <span>
                  <strong>Blood Group:</strong>{' '}
                  {user?.bloodGroup || 'Not provided'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-600" />
                <span>
                  <strong>Location:</strong> {user?.location || 'Not provided'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaHospital className="text-blue-600" />
                <span>
                  <strong>Workplace:</strong>{' '}
                  {user?.workplace || 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Contact */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Contact Details
          </h2>

          <div className="space-y-4 text-slate-700">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <span>{user?.email || 'Not provided'}</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-600" />
              <span>{user?.phone || 'Not provided'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;


