import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  FaBirthdayCake,
  FaCalendarAlt,
  FaCamera,
  FaClinicMedical,
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

const divisions = {
  Dhaka: [
    'Dhaka',
    'Gazipur',
    'Kishoreganj',
    'Manikganj',
    'Munshiganj',
    'Narayanganj',
    'Narsingdi',
    'Tangail',
    'Gopalganj',
    'Madaripur',
    'Rajbari',
    'Shariatpur',
    'Faridpur',
  ],
  Chattogram: [
    'Chattogram',
    'Cox’s Bazar',
    'Cumilla',
    'Brahmanbaria',
    'Chandpur',
    'Feni',
    'Lakshmipur',
    'Noakhali',
    'Khagrachhari',
    'Rangamati',
    'Bandarban',
  ],
  Rajshahi: [
    'Rajshahi',
    'Natore',
    'Pabna',
    'Sirajganj',
    'Bogura',
    'Joypurhat',
    'Naogaon',
    'Chapainawabganj',
  ],
  Khulna: [
    'Khulna',
    'Jessore',
    'Satkhira',
    'Bagerhat',
    'Jhenaidah',
    'Magura',
    'Narail',
    'Kushtia',
    'Meherpur',
    'Chuadanga',
  ],
  Barishal: [
    'Barishal',
    'Bhola',
    'Jhalokati',
    'Patuakhali',
    'Pirojpur',
    'Barguna',
  ],
  Sylhet: ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj'],
  Rangpur: [
    'Rangpur',
    'Kurigram',
    'Gaibandha',
    'Nilphamari',
    'Lalmonirhat',
    'Dinajpur',
    'Thakurgaon',
    'Panchagarh',
  ],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
};

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
  const [lastDonationDate, setLastDonationDate] = useState(
    user?.lastDonationDate || '',
  );
  const [donationPlace, setDonationPlace] = useState(user?.donationPlace || '');


  const [division, setDivision] = useState(user?.division || '');
  const [district, setDistrict] = useState(user?.district || '');

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
     lastDonationDate: lastDonationDate || user?.lastDonationDate,
     donationPlace: donationPlace || user?.donationPlace,
     division: division || user?.division,
     district: district || user?.district,
     email,
   };

    fetch(`http://localhost:5000/create-user/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProfile),
    })
      .then(res => res.json())
      .then(() => navigate('/profile'))
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-[70px] px-4 pb-16">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow overflow-hidden">
        {/* Header */}
        <div className="h-40 bg-gradient-to-r from-cyan-600 to-blue-700 relative">
          <div className="absolute -bottom-14 left-6 flex items-center gap-4">
            <div className="relative">
              <img
                src={
                  img || 'https://cdn-icons-png.flaticon.com/512/387/387561.png'
                }
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover"
              />
              <FaCamera className="absolute bottom-1 right-1 bg-blue-600 text-white p-1 rounded-full text-xl" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold flex items-center gap-2 pb-4">
                <FaUserMd /> Edit Your Profile
              </h1>
              <p className="text-sm opacity-90">
                Keep your healthcare & donation information updated
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="mt-20 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaUserMd className="text-blue-600" /> Full Name
            </label>
            <input
              placeholder={user?.name ? user?.name : 'Enter your name'}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Workplace */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaHospital className="text-blue-600" /> Profession / Workplace
            </label>
            <input
              placeholder={
                user?.workplace ? user?.workplace : 'Enter your workplace'
              }
              type="text"
              value={workplace}
              onChange={e => setWorkplace(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaPhoneAlt className="text-blue-600" /> Phone Number
            </label>
            <input
              placeholder={
                user?.phone ? user?.phone : 'Enter your phone number'
              }
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaMapMarkerAlt className="text-blue-600" /> Location
            </label>
            <input
              placeholder={
                user?.location ? user?.location : 'Enter your location'
              }
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Age */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaBirthdayCake className="text-blue-600" /> Age
            </label>
            <input
              placeholder={user?.age ? user?.age : 'Enter your age'}
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
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
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>

          {/* Last Donation Date */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaCalendarAlt className="text-red-600" /> Last Blood Donation
              Date
            </label>
            <input
              type="date"
              value={lastDonationDate}
              onChange={e => setLastDonationDate(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Donation Place */}
          <div>
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaClinicMedical className="text-red-600" /> Donation Place
            </label>
            <input
              placeholder={
                user?.donationPlace
                  ? user?.donationPlace
                  : 'Enter donation place'
              }
              type="text"
              value={donationPlace}
              onChange={e => setDonationPlace(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Division */}
          <div>
            <label className="label font-semibold mb-1">Division</label>
            <select
              className="select select-bordered w-full"
              value={division}
              onChange={e => {
                setDivision(e.target.value);
                setDistrict(''); // reset district
              }}
            >
              <option value="">Select Division</option>
              {Object.keys(divisions).map(div => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="label font-semibold mb-1">District</label>
            <select
              className="select select-bordered w-full"
              value={district}
              onChange={e => setDistrict(e.target.value)}
              disabled={!division}
            >
              <option value="">Select District</option>
              {division &&
                divisions[division].map(dis => (
                  <option key={dis} value={dis}>
                    {dis}
                  </option>
                ))}
            </select>
          </div>

          {/* Profile Image URL */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaCamera className="text-blue-600" /> Profile Image URL
            </label>
            <input
              placeholder={user?.img ? user?.img : 'Enter profile image URL'}
              type="text"
              value={img}
              onChange={e => setImg(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 font-semibold mb-1">
              <FaInfoCircle className="text-blue-600" /> Professional Bio
            </label>
            <textarea
              placeholder={
                user?.bio ? user?.bio : 'Enter your professional bio'
              }
              rows="4"
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button onClick={handleChange} className="btn btn-accent">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
