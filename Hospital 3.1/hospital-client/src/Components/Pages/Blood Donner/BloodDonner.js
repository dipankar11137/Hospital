import { useEffect, useState } from 'react';
import Footer from '../../Share/Footer';

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

const BloodDonner = () => {
  const [donner, setDonner] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [nameFilter, setNameFilter] = useState('');
  const [bloodFilter, setBloodFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/donner')
      .then(response => response.json())
      .then(data => {
        setDonner(data);
        setFilteredData(data);
      })
      .catch(error => console.error('Error fetching donners:', error));
  }, []);

  useEffect(() => {
    let filtered = donner;

    if (nameFilter) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (bloodFilter) {
      filtered = filtered.filter(d => d.bloodGroup === bloodFilter);
    }

    if (divisionFilter) {
      filtered = filtered.filter(d => d.division === divisionFilter);
    }

    if (districtFilter) {
      filtered = filtered.filter(d => d.district === districtFilter);
    }

    setFilteredData(filtered);
  }, [nameFilter, bloodFilter, divisionFilter, districtFilter, donner]);

  const handleCall = phone => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="pt-20 mx-5">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-2 tracking-wide text-red-600 drop-shadow">
        🔎 Find a Blood Donor
      </h1>

      {/* Filter Section */}
      <div className="bg-white/40 backdrop-blur-lg p-5 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 border border-white">
        <input
          type="text"
          placeholder="Search Name"
          className="p-3 border rounded-xl w-full bg-white/80 shadow focus:ring-2 focus:ring-red-400"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
        />

        <select
          className="p-3 border rounded-xl bg-white/80 shadow focus:ring-2 focus:ring-red-400"
          value={bloodFilter}
          onChange={e => setBloodFilter(e.target.value)}
        >
          <option value="">Blood Group</option>
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <select
          className="p-3 border rounded-xl bg-white/80 shadow focus:ring-2 focus:ring-red-400"
          value={divisionFilter}
          onChange={e => {
            setDivisionFilter(e.target.value);
            setDistrictFilter('');
          }}
        >
          <option value="">Select Division</option>
          {Object.keys(divisions).map(div => (
            <option key={div} value={div}>
              {div}
            </option>
          ))}
        </select>

        <select
          className="p-3 border rounded-xl bg-white/80 shadow focus:ring-2 focus:ring-red-400"
          value={districtFilter}
          disabled={!divisionFilter}
          onChange={e => setDistrictFilter(e.target.value)}
        >
          <option value="">Select District</option>
          {divisionFilter &&
            divisions[divisionFilter].map(district => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
        </select>
      </div>

      {/* Donor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
        {filteredData
          .slice()
          .reverse()
          .map((donor, index) => (
            <div
              key={donor._id}
              className="
    rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-white 
    p-6 text-center 
    transition-all duration-300 
    hover:shadow-2xl hover:-translate-y-1 
    hover:border-red-500 cursor-pointer
  "
            >
              <img
                className="w-28 h-28 mx-auto mb-4 rounded-full ring-4 ring-red-300 shadow"
                src="https://png.pngtree.com/png-vector/20250506/ourmid/pngtree-happy-red-blood-drop-character-shows-a-peace-gesture-connected-to-png-image_16185865.png"
                alt="donor"
              />

              <h1 className="text-3xl font-bold text-red-600 mb-3">
                {donor.bloodGroup}
              </h1>

              <p className="text-lg font-semibold">👤 {donor.name}</p>
              <p className="text-base mt-1 text-gray-700">
                📍 Division: {donor.division}
              </p>
              <p className="text-base text-gray-700">
                🏙 District: {donor.district}
              </p>
              <p className="text-base text-gray-700">📞 {donor.phone}</p>
              <p className="text-base text-gray-700">✉️ {donor.email}</p>

              <button
                onClick={() => handleCall(donor.phone)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-xl mt-5 shadow-lg transition"
              >
                📱 Call Now
              </button>
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
};

export default BloodDonner;

