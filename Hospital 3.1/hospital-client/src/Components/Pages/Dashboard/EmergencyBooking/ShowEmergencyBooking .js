import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ShowEmergencyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all emergency bookings
  useEffect(() => {
    fetch('http://localhost:5000/emergencyBooking')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load bookings');
        setLoading(false);
      });
  }, []);

  // Cancel booking
  const handleCancel = async id => {
    const confirm = window.confirm(
      'Are you sure you want to cancel this booking?',
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/emergencyBooking/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success('Booking cancelled');
        setBookings(bookings.filter(b => b._id !== id));
      }
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-32 text-lg font-semibold">
        Loading emergency bookings...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-28 px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Emergency Medical Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No emergency bookings found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="table w-full">
            <thead className="bg-red-50">
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Hospital</th>
                <th>Doctor</th>
                <th>Booked At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{booking.patientName}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.department}</td>
                  <td>{booking.hospital}</td>
                  <td>{booking.doctor}</td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                  <td>
                    <span className="badge badge-success">
                      {booking.status || 'active'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowEmergencyBooking;
