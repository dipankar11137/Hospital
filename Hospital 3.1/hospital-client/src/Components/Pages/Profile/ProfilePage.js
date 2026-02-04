import { useEffect, useState } from 'react';
import {
  FaBirthdayCake,
  FaEnvelope,
  FaHospital,
  FaHouseUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTint,
  FaUserMd,
} from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useUser from '../../../hooks/useUser';

const ProfilePage = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();

  const [isBloodDonner, setIsBloodDonner] = useState(false);
  const [updating, setUpdating] = useState(false);

  // ✅ Sync state AFTER user loads
  useEffect(() => {
    if (user?.bloodDonner !== undefined) {
      setIsBloodDonner(user.bloodDonner);
    }
  }, [user]);

  const handleAddToBloodDonner = async () => {
    if (!user?._id || updating) return;

    try {
      setUpdating(true);

      const res = await fetch(
        `http://localhost:5000/blood-donner/${user._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bloodDonner: !isBloodDonner,
          }),
        },
      );

      if (!res.ok) {
        throw new Error('Failed to update donor status');
      }

      setIsBloodDonner(prev => !prev);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  // ✅ Loading guard
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-slate-600">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen pt-[65px] pb-16">
      {/* ================= HEADER ================= */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 h-64">
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[90%] max-w-5xl">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              src={
                user.img ||
                'https://cdn-icons-png.flaticon.com/512/387/387561.png'
              }
              alt="Profile"
            />

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2 justify-center md:justify-start">
                <FaUserMd className="text-blue-600" />
                {user.name}
              </h1>

              <p className="text-slate-600 mt-1">
                {user.workplace || 'Healthcare Professional'}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                {user.location || 'Location not provided'}
              </p>
            </div>

            {/* Actions */}
            <div className="text-center">
              <button
                onClick={() => navigate('/editProfile')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold mb-3"
              >
                Edit Profile
              </button>

              <br />

              <button
                disabled={updating}
                onClick={handleAddToBloodDonner}
                className={`px-5 py-2 rounded-lg font-semibold text-white transition
                  ${
                    isBloodDonner
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-green-600 hover:bg-green-700'
                  }
                  ${updating && 'opacity-60 cursor-not-allowed'}
                `}
              >
                {isBloodDonner ? 'Remove Donor' : 'Add to Blood Donor'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="mt-28 max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Personal & Professional Information
          </h2>

          <div className="space-y-4 text-slate-700">
            <p>
              <span className="font-semibold">About:</span>{' '}
              {user.bio || 'Dedicated healthcare professional.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <Info icon={<FaBirthdayCake />} label="Age" value={user.age} />
              <Info
                icon={<FaTint />}
                label="Blood Group"
                value={user.bloodGroup}
              />
              <Info
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={user.location}
              />
              <Info
                icon={<FaHospital />}
                label="Workplace"
                value={user.workplace}
              />
              <Info
                icon={<MdDateRange />}
                label="Last Donation Date"
                value={user.lastDonationDate}
              />
              <Info
                icon={<FaHouseUser />}
                label="Donation Place"
                value={user.donationPlace}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            Contact Details
          </h2>

          <Info icon={<FaEnvelope />} value={user.email} />
          <Info icon={<FaPhoneAlt />} value={user.phone} />
        </div>
      </div>
    </div>
  );
};

const Info = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 text-slate-700">
    <span className="text-blue-600">{icon}</span>
    <span>
      {label && <strong>{label}: </strong>}
      {value || 'Not provided'}
    </span>
  </div>
);

export default ProfilePage;
