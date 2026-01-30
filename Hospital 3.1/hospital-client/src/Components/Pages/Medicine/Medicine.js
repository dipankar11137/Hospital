import { Search } from 'lucide-react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Medicine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [ user ] = useAuthState(auth)
 


  const medicines = [
    {
      _id: 1,
      name: 'Paracetamol',
      group: 'Pain Relief',
      type: 'Tablet',
      price: 25,
      image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
    },
    {
      _id: 2,
      name: 'Amoxicillin',
      group: 'Antibiotic',
      type: 'Capsule',
      price: 50,
      image: 'https://cdn-icons-png.flaticon.com/512/4151/4151046.png',
    },
    {
      _id: 3,
      name: 'Cough Syrup',
      group: 'Cold & Flu',
      type: 'Syrup',
      price: 120,
      image: 'https://cdn-icons-png.flaticon.com/512/2927/2927614.png',
    },
    {
      _id: 4,
      name: 'Insulin',
      group: 'Diabetes',
      type: 'Injection',
      price: 400,
      image: 'https://cdn-icons-png.flaticon.com/512/941/941474.png',
    },
    {
      _id: 5,
      name: 'Cetirizine',
      group: 'Allergy',
      type: 'Tablet',
      price: 20,
      image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
    },
    {
      _id: 6,
      name: 'Azithromycin',
      group: 'Antibiotic',
      type: 'Tablet',
      price: 80,
      image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
    },
  ];

  const types = ['All', 'Tablet', 'Capsule', 'Syrup', 'Injection'];

  const filteredMedicines = medicines.filter(med => {
    const matchesType =
      filterType === 'All' ||
      med.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.group.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleBuy = medicine => {
    setSelectedMedicine(medicine);
    setQuantity(1);
    setLocation('');
    setPhone('');
    setDate('');
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!location || !phone || !date) {
      alert('Please fill in Location, Phone, and Date before purchase.');
      return;
    }

      const orderDetails = {
      medicineId: selectedMedicine._id, // <-- changed here
      medicineName: selectedMedicine.name,
      medicineGroup: selectedMedicine.group,
      medicineType: selectedMedicine.type,
      quantity,
      totalPrice: selectedMedicine.price * quantity,
      location,
      price: selectedMedicine.price,
      phone,
      date,
      name:name || user?.displayName,
      email: user?.email,
    };
  fetch('http://localhost:5000/medicineBookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderDetails),
  })
    .then(res => res.json())
    .then(data => {
      alert('Medicine purchased successfully!');
    })
    .catch(err => {
      console.error('Error purchasing medicine:', err);
      alert('Failed to purchase medicine. Please try again.');  
  });

    setSelectedMedicine(null);
  };

  return (
    <div className="py-20 px-6 md:px-16 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Medicine Store
        </h1>
        <p className="text-gray-600 mt-2">
          Search, filter, and explore different types of medicines.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2 shadow-sm">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search by medicine name or group..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full outline-none text-gray-700"
          />
        </div>

        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-primary"
        >
          {types.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Medicine Grid */}
      {filteredMedicines.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 ">
          {filteredMedicines.map(med => (
            <div
              key={med._id} // <-- changed here
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 text-center transform hover:scale-105 hover:cursor-pointer hover:border-primary border-2"
            >
              <img
                src={med.image}
                alt={med.name}
                className="h-20 mx-auto mb-4 object-contain"
              />
              <h2 className="text-lg font-semibold text-primary">{med.name}</h2>
              <p className="text-sm text-gray-600">{med.group}</p>
              <p className="text-sm text-gray-500 mb-2">{med.type}</p>

              <div className="flex justify-between items-center mt-3">
                <p className="text-primary text-xl font-semibold ">
                  ৳ {med.price}
                </p>
                <button
                  className="bg-gradient-to-r from-primary text-xs  to-primary text-white font-semibold px-3 py-1 rounded-full shadow-lg hover:from-primary hover:to-secondary transform hover:scale-105 transition-all duration-300"
                  onClick={() => handleBuy(med)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-10">
          No medicines found.
        </p>
      )}

      {/* Modal */}
      {selectedMedicine && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-11/12 md:w-1/2 p-6 relative shadow-2xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
              onClick={() => setSelectedMedicine(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Buy {selectedMedicine.name}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Price</label>
                <input
                  type="text"
                  value={selectedMedicine.price * quantity + '৳'}
                  readOnly
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={user?.displayName || 'Your name'}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="Your location"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  pattern="[0-9]{11}"
                  maxLength="11"
                  minLength="11"
                />
                <small className="text-gray-500 text-sm">
                  Enter 11-digit phone number
                </small>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r text-white font-semibold px-5 py-2 rounded-full shadow-lg bg-primary transform hover:scale-105 transition-all duration-300"
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicine;

// import { Search } from 'lucide-react';
// import { useState } from 'react';

// const Medicine = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterType, setFilterType] = useState('All');

//   const medicines = [
//     {
//       id: 1,
//       name: 'Paracetamol',
//       group: 'Pain Relief',
//       type: 'Tablet',
//       price: 25,
//       image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
//     },
//     {
//       id: 2,
//       name: 'Amoxicillin',
//       group: 'Antibiotic',
//       type: 'Capsule',
//       price: 50,
//       image: 'https://cdn-icons-png.flaticon.com/512/4151/4151046.png',
//     },
//     {
//       id: 3,
//       name: 'Cough Syrup',
//       group: 'Cold & Flu',
//       type: 'Syrup',
//       price: 120,
//       image: 'https://cdn-icons-png.flaticon.com/512/2927/2927614.png',
//     },
//     {
//       id: 4,
//       name: 'Insulin',
//       group: 'Diabetes',
//       type: 'Injection',
//       price: 400,
//       image: 'https://cdn-icons-png.flaticon.com/512/941/941474.png',
//     },
//     {
//       id: 5,
//       name: 'Cetirizine',
//       group: 'Allergy',
//       type: 'Tablet',
//       price: 20,
//       image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
//     },
//     {
//       id: 6,
//       name: 'Azithromycin',
//       group: 'Antibiotic',
//       type: 'Tablet',
//       price: 80,
//       image: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
//     },
//   ];

//   const types = ['All', 'Tablet', 'Capsule', 'Syrup', 'Injection'];

//   const filteredMedicines = medicines.filter(med => {
//     const matchesType =
//       filterType === 'All' ||
//       med.type.toLowerCase() === filterType.toLowerCase();
//     const matchesSearch =
//       med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       med.group.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesType && matchesSearch;
//   });

//   return (
//     <div className="py-20 px-6 md:px-16 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="text-center mb-10">
//         <h1 className="text-3xl md:text-4xl font-bold text-primary">
//           Medicine Store
//         </h1>
//         <p className="text-gray-600 mt-2">
//           Search, filter, and explore different types of medicines.
//         </p>
//       </div>

//       {/* Search and Filter */}
//       <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
//         {/* Search Bar */}
//         <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/2 shadow-sm">
//           <Search className="text-gray-500 mr-2" size={18} />
//           <input
//             type="text"
//             placeholder="Search by medicine name or group..."
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="w-full outline-none text-gray-700"
//           />
//         </div>

//         {/* Filter Dropdown */}
//         <select
//           value={filterType}
//           onChange={e => setFilterType(e.target.value)}
//           className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 bg-white shadow-sm text-gray-700 focus:ring-2 focus:ring-primary"
//         >
//           {types.map(type => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Medicine Grid */}
//       {filteredMedicines.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredMedicines.map(med => (
//             <div
//               key={med.id}
//               className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 text-center transform hover:scale-105"
//             >
//               <img
//                 src={med.image}
//                 alt={med.name}
//                 className="h-20 mx-auto mb-4 object-contain"
//               />
//               <h2 className="text-lg font-semibold text-primary">{med.name}</h2>
//               <p className="text-sm text-gray-600">{med.group}</p>
//               <p className="text-sm text-gray-500 mb-2">{med.type}</p>
//               <p className="text-primary font-semibold mb-3">৳ {med.price}</p>

//               {/* Buy Button */}
//               <button
//                 className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold px-5 py-2 rounded-full shadow-lg hover:from-blue-500 hover:to-green-400 transform hover:scale-105 transition-all duration-300"
//                 onClick={() => alert(`Added ${med.name} to cart`)}
//               >
//                 Buy Now
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-600 text-lg mt-10">
//           No medicines found.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Medicine;
