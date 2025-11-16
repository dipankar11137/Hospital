import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { MdLocalPharmacy } from 'react-icons/md';
import { toast } from 'react-toastify';



const BookMedicine = () => {
  const [bookings, setBookings] = useState([]);

  // ✅ Fetch booked medicines from backend
  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5000/bookMedicines');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load medicine bookings.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 🗑 Delete booking by ID
  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const res = await fetch(`http://localhost:5000/bookMedicines/${id}`, {
          method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete');
        toast.success('Booking deleted successfully');
        fetchBookings();
      } catch (error) {
        toast.error('Error deleting booking.');
      }
    }
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8 flex justify-center items-center gap-2">
        <MdLocalPharmacy className="text-green-600 text-4xl" />
        Booked Medicines
      </h1>

      {/* Show message if no bookings exist */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          No booked medicines found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookings
            .slice()
            .reverse()
            .map((med, index) => (
              <motion.div
                key={med._id || index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-gray-100"
              >
                {/* Medicine Image */}
                <div>
                  <img
                    src={
                      med.image ||
                      'https://cdn-icons-png.flaticon.com/512/2966/2966327.png'
                    }
                    alt={med.name || 'Medicine'}
                    className="h-28 mx-auto mb-4 object-contain"
                  />

                  {/* Medicine Info */}
                  <h2 className="text-lg font-semibold text-blue-700 text-center">
                    {med.name || 'Unnamed Medicine'}
                  </h2>
                  <p className="text-gray-600 text-center">
                    {med.group || 'Unknown Group'}
                  </p>
                  <p className="text-gray-500 text-sm text-center mb-2">
                    {med.type || 'Type N/A'}
                  </p>
                  <p className="text-green-600 font-bold text-center text-lg">
                    ৳ {med.price || 0}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="mt-4 flex justify-between items-center border-t pt-3">
                  <span className="text-sm text-gray-500">
                    Buyer: {med.buyerName || 'Unknown'}
                  </span>
                  <button
                    onClick={() => handleDelete(med._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1 transition-all"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default BookMedicine;
