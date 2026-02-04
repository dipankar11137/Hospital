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
const getMonthDifference = dateString => {
  if (!dateString) return 0;
  const last = new Date(dateString);
  const now = new Date();
  if (last > now) return 0;

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
  const navigation = useNavigate();

  /* ================= FETCH USERS ================= */
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => {
        const donorsOnly = (data || []).filter(d => d.bloodDonner === true);
        setDonors(donorsOnly);
        setFiltered(donorsOnly);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* ================= APPLY FILTERS ================= */
  useEffect(() => {
    let result = donors;

    if (nameFilter)
      result = result.filter(d =>
        d.name.toLowerCase().includes(nameFilter.toLowerCase()),
      );
    if (bloodFilter) result = result.filter(d => d.bloodGroup === bloodFilter);
    if (divisionFilter)
      result = result.filter(d => d.division === divisionFilter);
    if (districtFilter)
      result = result.filter(d => d.district === districtFilter);

    setFiltered(result);
  }, [nameFilter, bloodFilter, divisionFilter, districtFilter, donors]);

  /* ================= ACTIONS ================= */
  const handleCall = phone => (window.location.href = `tel:${phone}`);

  const handlePayNow =  id => {
   navigation(`/paymentDonner/${id}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-700">
        Loading donors...
      </div>
    );

  return (
    <div>
    <div className="pt-20 px-5 md:px-5 lg:px-20 pb-40">
      <h1 className="text-4xl font-bold text-center mb-8 text-red-600">
        🔎 Find a Blood Donor
      </h1>

      {/* ================= FILTER SECTION ================= */}
      <div className="bg-white px-6 pb-6 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-4 gap-5 mb-12">
        <input
          type="text"
          placeholder="Search by Name"
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
        />

        <select
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          value={bloodFilter}
          onChange={e => setBloodFilter(e.target.value)}
        >
          <option value="">Blood Group</option>
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
            <option key={bg}>{bg}</option>
          ))}
        </select>

        <select
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
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
          className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filtered
          .slice()
          .reverse()
          .map(donor => {
            const months = getMonthDifference(donor.lastDonationDate);
            const eligible = months >= 3;
            const paid = donor.payment === true;

            return (
              <div
                key={donor._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300"
              >
                <img
                  src={donor.img || 'https://via.placeholder.com/80'}
                  alt={donor.name}
                  className="w-20 h-20 rounded-full ring-4 ring-red-400 mb-4 object-cover"
                />
                <h2 className="text-xl font-bold text-red-600 mb-1">
                  {donor.bloodGroup}
                </h2>
                <p className="font-semibold mb-3">{donor.name}</p>
                <p className="text-gray-500 text-sm mb-1">
                  📅 Last Donation: {donor.lastDonationDate || 'N/A'}
                </p>
                <p className=" mb-1">{donor.location}</p>

                {!eligible && (
                  <span className="bg-gray-200 py-2 px-4 rounded-lg font-semibold">
                    ⏳ Not Eligible
                  </span>
                )}

                {eligible && !paid && (
                  <button
                    onClick={() => handlePayNow(donor._id)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-bold transition-colors duration-300"
                  >
                    💳 Pay Now
                  </button>
                )}

                {paid && (
                  <>
                    <p className="mt-2 font-semibold text-gray-700">
                      📞 {donor.phone}
                    </p>
                    <button
                      onClick={() => handleCall(donor.phone)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-2 font-bold transition-colors duration-300"
                    >
                      📱 Call Now
                    </button>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
      <Footer/>

    </div>

  );
};

export default BloodDonor;

// import { useEffect, useState } from 'react';
// import Footer from '../../Share/Footer';

// const divisions = {
//   Dhaka: [
//     'Dhaka',
//     'Gazipur',
//     'Kishoreganj',
//     'Manikganj',
//     'Munshiganj',
//     'Narayanganj',
//     'Narsingdi',
//     'Tangail',
//     'Gopalganj',
//     'Madaripur',
//     'Rajbari',
//     'Shariatpur',
//     'Faridpur',
//   ],
//   Chattogram: [
//     'Chattogram',
//     'Cox’s Bazar',
//     'Cumilla',
//     'Brahmanbaria',
//     'Chandpur',
//     'Feni',
//     'Lakshmipur',
//     'Noakhali',
//     'Khagrachhari',
//     'Rangamati',
//     'Bandarban',
//   ],
//   Rajshahi: [
//     'Rajshahi',
//     'Natore',
//     'Pabna',
//     'Sirajganj',
//     'Bogura',
//     'Joypurhat',
//     'Naogaon',
//     'Chapainawabganj',
//   ],
//   Khulna: [
//     'Khulna',
//     'Jessore',
//     'Satkhira',
//     'Bagerhat',
//     'Jhenaidah',
//     'Magura',
//     'Narail',
//     'Kushtia',
//     'Meherpur',
//     'Chuadanga',
//   ],
//   Barishal: [
//     'Barishal',
//     'Bhola',
//     'Jhalokati',
//     'Patuakhali',
//     'Pirojpur',
//     'Barguna',
//   ],
//   Sylhet: ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj'],
//   Rangpur: [
//     'Rangpur',
//     'Kurigram',
//     'Gaibandha',
//     'Nilphamari',
//     'Lalmonirhat',
//     'Dinajpur',
//     'Thakurgaon',
//     'Panchagarh',
//   ],
//   Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
// };

// const BloodDonner = () => {
//   const [donner, setDonner] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const [nameFilter, setNameFilter] = useState('');
//   const [bloodFilter, setBloodFilter] = useState('');
//   const [divisionFilter, setDivisionFilter] = useState('');
//   const [districtFilter, setDistrictFilter] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:5000/donner')
//       .then(response => response.json())
//       .then(data => {
//         setDonner(data);
//         setFilteredData(data);
//       })
//       .catch(error => console.error('Error fetching donners:', error));
//   }, []);

//   useEffect(() => {
//     let filtered = donner;

//     if (nameFilter) {
//       filtered = filtered.filter(d =>
//         d.name.toLowerCase().includes(nameFilter.toLowerCase())
//       );
//     }

//     if (bloodFilter) {
//       filtered = filtered.filter(d => d.bloodGroup === bloodFilter);
//     }

//     if (divisionFilter) {
//       filtered = filtered.filter(d => d.division === divisionFilter);
//     }

//     if (districtFilter) {
//       filtered = filtered.filter(d => d.district === districtFilter);
//     }

//     setFilteredData(filtered);
//   }, [nameFilter, bloodFilter, divisionFilter, districtFilter, donner]);

//   const handleCall = phone => {
//     window.location.href = `tel:${phone}`;
//   };

//   return (
//     <div className="pt-20 mx-5">
//       {/* Title */}
//       <h1 className="text-4xl font-bold text-center mb-2 tracking-wide text-red-600 drop-shadow">
//         🔎 Find a Blood Donor
//       </h1>

//       {/* Filter Section */}
//       <div className="bg-white/40 backdrop-blur-lg p-5 rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 border border-white">
//         <input
//           type="text"
//           placeholder="Search Name"
//           className="p-3 border rounded-xl w-full bg-white/80 shadow focus:ring-2 focus:ring-red-400"
//           value={nameFilter}
//           onChange={e => setNameFilter(e.target.value)}
//         />

//         <select
//           className="p-3 border rounded-xl bg-white/80 shadow focus:ring-2 focus:ring-red-400"
//           value={bloodFilter}
//           onChange={e => setBloodFilter(e.target.value)}
//         >
//           <option value="">Blood Group</option>
//           {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
//             <option key={bg} value={bg}>
//               {bg}
//             </option>
//           ))}
//         </select>

//         <select
//           className="p-3 border rounded-xl bg-white/80 shadow focus:ring-2 focus:ring-red-400"
//           value={divisionFilter}
//           onChange={e => {
//             setDivisionFilter(e.target.value);
//             setDistrictFilter('');
//           }}
//         >
//           <option value="">Select Division</option>
//           {Object.keys(divisions).map(div => (
//             <option key={div} value={div}>
//               {div}
//             </option>
//           ))}
//         </select>

//         <select
//           className="p-3 border rounded-xl bg-white/80 shadow focus:ring-2 focus:ring-red-400"
//           value={districtFilter}
//           disabled={!divisionFilter}
//           onChange={e => setDistrictFilter(e.target.value)}
//         >
//           <option value="">Select District</option>
//           {divisionFilter &&
//             divisions[divisionFilter].map(district => (
//               <option key={district} value={district}>
//                 {district}
//               </option>
//             ))}
//         </select>
//       </div>

//       {/* Donor Cards */}
//       <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-20">
//         {filteredData
//           .slice()
//           .reverse()
//           .map((donor, index) => (
//             <div
//               key={donor._id}
//               className="h-[340px]
//     rounded-2xl shadow-xl bg-white/70 backdrop-blur-md border border-white
//     p-6 text-center
//     transition-all duration-300
//     hover:shadow-2xl hover:-translate-y-1
//     hover:border-red-500 cursor-pointer
//     flex flex-col"
//             >
//               <img
//                 className="w-14 h-14 mx-auto mb-4 rounded-full ring-4 ring-red-300 shadow"
//                 src="https://st2.depositphotos.com/5266903/9158/i/450/depositphotos_91586400-stock-photo-blood-donation-icon.jpg"
//                 alt="donor"
//               />

//               <h1 className="text-xl font-bold text-red-600 mb-1">
//                 {donor.bloodGroup}
//               </h1>

//               <p className="text-lg font-semibold">👤 {donor.name}</p>

//               <div className="text-sm mt-2">
//                 <p className="text-gray-700">📍 Division: {donor.division}</p>
//                 <p className="text-gray-700">🏙 District: {donor.district}</p>
//                 <p className="text-gray-700">📞 {donor.phone}</p>
//                 <p className="text-gray-700">✉️ {donor.email}</p>
//               </div>

//               {/* Push button to bottom */}
//               <button
//                 onClick={() => handleCall(donor.phone)}
//                 className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-xl mt-auto shadow-lg transition"
//               >
//                 📱 Call Now
//               </button>
//             </div>
//           ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default BloodDonner;
