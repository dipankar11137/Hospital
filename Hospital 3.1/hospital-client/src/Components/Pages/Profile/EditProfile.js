import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  FaBirthdayCake,
  FaCamera,
  FaHospital,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTint,
  FaUserMd,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import auth from '../../../firebase.init';
import useUser from '../../../hooks/useUser';

const EditProfile = () => {
  const { user } = useUser();
  const [authUser] = useAuthState(auth);
  const email = authUser?.email;
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [img, setImg] = useState(user?.img || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [workplace, setWorkplace] = useState(user?.workplace || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [age, setAge] = useState(user?.age || '');
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || '');

  /* ======================
     Save profile changes
  ====================== */
  const handleChange = () => {
    const updatedProfile = {
      name: name || user?.name,
      img: img || user?.img,
      bio: bio || user?.bio,
      workplace: workplace || user?.workplace,
      phone: phone || user?.phone,
      location: location || user?.location,
      age: age || user?.age,
      bloodGroup: bloodGroup || user?.bloodGroup,
      email,
    };

    fetch(`http://localhost:5000/create-user/${email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    })
      .then(res => res.json())
      .then(() => navigate('/profile'));
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-[70px] px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">
        {/* ================= HEADER ================= */}
        <div className="h-40 bg-gradient-to-r from-cyan-600 to-blue-700 relative">
          <div className="absolute -bottom-14 left-6 flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  user?.img || 'https://cdn-icons-png.flaticon.com/512/387/387561.png'
                }
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
              />
              <FaCamera className="absolute bottom-1 right-1 bg-blue-600 text-white p-1 rounded-full text-xl" />
            </div>

            <div className="text-white">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FaUserMd /> Edit Your Profile
              </h1>
              <p className="text-sm opacity-90">
                Keep your healthcare information accurate and up to date
              </p>
            </div>
          </div>
        </div>

        {/* ================= FORM ================= */}
        <div className="mt-20 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaUserMd className="text-blue-600" /> Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              className="input input-bordered w-full"
            />
          </div>

          {/* Profession / Workplace */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaHospital className="text-blue-600" /> Profession / Workplace
            </label>
            <input
              type="text"
              value={workplace}
              onChange={e => setWorkplace(e.target.value)}
              placeholder="Input  Profession / Workplace"
              className="input input-bordered w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaPhoneAlt className="text-blue-600" /> Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+880 1XXXXXXXXX"
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaMapMarkerAlt className="text-blue-600" /> Location
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="City, District, Country"
              className="input input-bordered w-full"
            />
          </div>

          {/* Age */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaBirthdayCake className="text-blue-600" /> Age
            </label>
            <input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="Enter your age"
              className="input input-bordered w-full"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaTint className="text-red-600" /> Blood Group
            </label>
            <select
              value={bloodGroup}
              onChange={e => setBloodGroup(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select blood group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* Profile Image */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaCamera className="text-blue-600" /> Profile Image URL
            </label>
            <input
              type="text"
              value={img}
              onChange={e => setImg(e.target.value)}
              placeholder="https://example.com/profile-photo.jpg"
              className="input input-bordered w-full"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaInfoCircle className="text-blue-600" /> Professional Bio
            </label>
            <textarea
              rows="4"
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Brief professional background, specialization, or personal note"
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button onClick={handleChange} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
