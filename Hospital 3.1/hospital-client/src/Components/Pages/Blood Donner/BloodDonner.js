
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Share/Footer';

/* ================= DIVISIONS ================= */
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

/* ================= DATE HELPER ================= */
const images = [
  'https://t3.ftcdn.net/jpg/02/15/57/22/360_F_215572243_4HMbV2462b7m3nlRHwHxatX3fRLCfLTa.jpg',
  'https://cdn.apollohospitals.com/cancer-centre/2024/05/blood-donation.jpg',
];
const getMonthDifference = dateString => {
  if (!dateString) return 999; // assume eligible if no date

  const last = new Date(dateString);
  const now = new Date();

  let months =
    (now.getFullYear() - last.getFullYear()) * 12 +
    (now.getMonth() - last.getMonth());

  if (now.getDate() < last.getDate()) months -= 1;

  return months;
};

const BloodDonor = () => {
  const [donors, setDonors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [nameFilter, setNameFilter] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  const navigate = useNavigate();

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetch('http://localhost:5000/donner')
      .then(res => res.json())
      .then(data => {
        // FIX: no bloodDonner field
        setDonors(data || []);
        setFiltered(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, []);

  /* ================= APPLY FILTERS ================= */
  useEffect(() => {
    let result = donors;

    if (nameFilter) {
      result = result.filter(d =>
        d.name?.toLowerCase().includes(nameFilter.toLowerCase()),
      );
    }

    if (bloodFilter) {
      result = result.filter(d => d.bloodGroup === bloodFilter);
    }

    if (divisionFilter) {
      result = result.filter(d => d.division === divisionFilter);
    }

    if (districtFilter) {
      result = result.filter(d => d.district === districtFilter);
    }

    setFiltered(result);
  }, [nameFilter, bloodFilter, divisionFilter, districtFilter, donors]);

  /* ================= ACTIONS ================= */
  const handleCall = phone => {
    window.location.href = `tel:${phone}`;
  };

  const handlePayNow = id => {
    navigate(`/paymentDonner/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading donors...
      </div>
    );
  }

  return (
    <div>
      <div className="pt-20 px-5 lg:px-20 pb-40">
        <h1 className="text-4xl font-bold text-center mb-2 text-red-600">
          🔎 Find a Blood Donor
        </h1>

        {/* ================= FILTER SECTION ================= */}
        <div className="bg-white p-6 rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
          <input
            type="text"
            placeholder="Search by Name"
            className="p-3 border rounded-xl"
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
          />

          <select
            className="p-3 border rounded-xl"
            value={bloodFilter}
            onChange={e => setBloodFilter(e.target.value)}
          >
            <option value="">Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
              <option key={bg}>{bg}</option>
            ))}
          </select>

          <select
            className="p-3 border rounded-xl"
            value={divisionFilter}
            onChange={e => {
              setDivisionFilter(e.target.value);
              setDistrictFilter('');
            }}
          >
            <option value="">Division</option>
            {Object.keys(divisions).map(div => (
              <option key={div}>{div}</option>
            ))}
          </select>

          <select
            className="p-3 border rounded-xl"
            value={districtFilter}
            disabled={!divisionFilter}
            onChange={e => setDistrictFilter(e.target.value)}
          >
            <option value="">District</option>
            {divisionFilter &&
              divisions[divisionFilter].map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        {/* ================= DONOR CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filtered.length === 0 && (
            <p className="text-center col-span-full text-gray-500">
              No donors found 😔
            </p>
          )}

          {[...filtered].reverse().map((donor,index) => {
            const months = getMonthDifference(donor.lastDonationDate);
            const eligible = months >= 3;
            const paid = donor.payment === true;

            return (
              <div
                key={donor._id}
                className="bg-white rounded-2xl shadow-lg p-6 pb-0 px-0 border border-gray-200 flex flex-col justify-between h-full"
              >
                {/* TOP CONTENT */}
                <div className='p-4 pb-0'>
                  <img
                    src={donor.img || images[index % images.length]}
                    alt={donor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />

                  <h2 className="text-xl font-bold text-red-600">
                    {donor.bloodGroup}
                  </h2>

                  <p className="font-semibold">{donor.name}</p>

                  <p className="text-sm text-gray-500">
                    Last Donate: {donor.lastDonationDate || 'No data'}
                  </p>

                  <p className="text-sm">
                    📍 {donor.district}, {donor.division}
                  </p>
                </div>

                {/* BOTTOM ACTION AREA */}
                <div className="mt-4">
                  {!eligible && (
                    <span className="block bg-red-600 text-white py-2 text-center rounded">
                      ⚠️ Not Eligible
                    </span>
                  )}

                  {eligible && !paid && (
                    <button
                      onClick={() => handlePayNow(donor._id)}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
                    >
                      💳 Pay Now
                    </button>
                  )}

                  {paid && (
                    <>
                      <p className=" pl-4">📞 {donor.phone}</p>
                      <button
                        onClick={() => handleCall(donor.phone)}
                        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                      >
                        📱 Call
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BloodDonor;

