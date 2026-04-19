import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const MyBookings = () => {
  const [users] = useAuthState(auth);
  const [bookings, setBooking] = useState([]);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const imageHostKey = 'c70a5fc10619997bd7315f2bf28d0f3e';
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch user's bookings
  useEffect(() => {
    if (users?.email) {
      fetch(`http://localhost:5000/myBookings/${users.email}`)
        .then(res => res.json())
        .then(data => setBooking(data))
        .catch(() => toast.error('Failed to fetch bookings'));
    }
  }, [users?.email]);

  // Delete booking
  const handleDelete = id => {
    const proceed = window.confirm(
      'Are you sure you want to delete this booking?',
    );
    if (!proceed) return;

    fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          const remaining = bookings.filter(booking => booking._id !== id);
          setBooking(remaining);
          toast.success('Booking deleted successfully');
        }
      })
      .catch(() => toast.error('Failed to delete booking'));
  };

  // Payment navigation
  const handlePayment = id => {
    navigate(`/payment/${id}`);
  };

  // Upload report file
  const handleAddFile = async id => {
    if (!file) return alert('Please select a file first!');

    const formData = new FormData();
    formData.append('image', file);

    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;

    try {
      const response = await fetch(url, { method: 'POST', body: formData });
      const imageData = await response.json();

      if (imageData.success) {
        const imgUrl = imageData.data.url;

        const res = await fetch(`http://localhost:5000/addFile/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ report: imgUrl }),
        });

        await res.json();
        alert('File uploaded and saved successfully!');
        setFile(null);
      } else {
        alert('Image upload failed!');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong while uploading the file.');
    }
  };

  // Join meeting
  const handleJoinMeeting = booking => {
    if (!booking.meetingLink) return toast.error('No meeting link set!');
    window.open(booking.meetingLink, '_blank'); // open in new tab
    toast.info(`Meeting Time: ${booking.meetingTime || 'Not set'}`);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-20 ">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="table w-full text-center">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="bg-slate-600">#</th>
              <th className="bg-slate-600">Doctor</th>
              <th className="bg-slate-600">Department</th>
              <th className="bg-slate-600">Date</th>
              <th className="bg-slate-600">Slot</th>
              <th className="bg-slate-600">Next Meet</th>
              <th className="bg-slate-600">Prescription</th>
              <th className="bg-slate-600">Add Report</th>
              <th className="bg-slate-600">Meeting</th>
              <th className="bg-slate-600">Payment</th>
              <th className="bg-slate-600">Status</th>
              <th className="bg-slate-600">Complete</th>
              <th className="bg-slate-600">Remove</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .slice()
              .reverse()
              .map((booking, index) => (
                <tr key={booking._id} className="text-slate-800">
                  <td className="bg-slate-50">{index + 1}</td>

                  <td className="bg-slate-50 border-r">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={booking.img}
                        alt={booking.doctorName}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <span className="font-semibold">
                        {booking.doctorName}
                      </span>
                    </div>
                  </td>

                  <td className="bg-slate-50 border-r">{booking.department}</td>
                  <td className="bg-slate-50 border-r">
                    {booking.appointmentDate}
                  </td>
                  <td className="bg-slate-50 border-r">{booking.slot}</td>
                  <td className="bg-slate-50 border-r">
                    {booking.nextDate} Days Later
                  </td>
                  {/* Prescription */}
                  <td className="bg-slate-50 border-r">
                    {booking.prescription ? (
                      <img
                        src={booking.prescription}
                        alt="prescription"
                        className="w-14 h-14 object-cover rounded mx-auto mb-1 cursor-pointer hover:scale-105 transition"
                        onClick={() => setPreviewImage(booking.prescription)}
                      />
                    ) : (
                      <span className="text-gray-500">Not submitted</span>
                    )}
                  </td>
                  {previewImage && (
                    <div
                      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                      onClick={() => setPreviewImage(null)}
                    >
                      <div
                        className="bg-white p-4 rounded-lg max-w-3xl w-full"
                        onClick={e => e.stopPropagation()}
                      >
                        <h2 className="text-center font-semibold mb-3">
                          Prescription Preview
                        </h2>

                        <img
                          src={previewImage}
                          alt="preview"
                          className="w-full max-h-[70vh] object-contain rounded"
                        />

                        <div className="flex justify-center gap-3 mt-4">
                          {/* Download Button */}
                          <a
                            href={previewImage}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-sm btn-primary text-white"
                          >
                            Download
                          </a>

                          {/* Close Button */}
                          <button
                            onClick={() => setPreviewImage(null)}
                            className="btn btn-sm  text-white"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* report */}
                  <td className="bg-slate-50 border-r">
                    {booking.report ? (
                      <span className="text-green-600 font-semibold">
                        Submitted
                      </span>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="file-input file-input-xs file-input-bordered w-[100px]"
                          onChange={e => setFile(e.target.files[0])}
                        />
                        <button
                          onClick={() => handleAddFile(booking._id)}
                          className="btn btn-xs btn-secondary"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Meeting link and time */}
                  <td className="bg-slate-50 border-r">
                    {booking.meetingLink ? (
                      <div className="flex flex-col items-center gap-1">
                        <button
                          onClick={() => handleJoinMeeting(booking)}
                          className="btn btn-xs btn-warning text-white flex items-center gap-1"
                        >
                          Join Meeting
                        </button>
                        <span className="text-sm text-gray-700">
                          {booking.meetingTime || 'Time not set'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Not set</span>
                    )}
                  </td>

                  <td className="bg-slate-50 border-r">
                    {booking.payment ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayment(booking._id)}
                        className="btn btn-xs btn-secondary text-white"
                      >
                        Pay
                      </button>
                    )}
                  </td>

                  <td className="bg-slate-50 border-r">
                    {booking.accept ? (
                      <span className="text-green-800 font-semibold">
                        Accepted
                      </span>
                    ) : (
                      <span className="text-orange-700 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="bg-slate-50 border-r">
                    {booking.complete ? (
                      <span className="text-green-800 font-semibold">
                        Complete
                      </span>
                    ) : (
                      <span className="text-orange-700 font-semibold">
                        Processing
                      </span>
                    )}
                  </td>

                  <td className="bg-slate-50">
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="btn btn-xs bg-red-600 hover:bg-red-500 text-white"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center py-6 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
