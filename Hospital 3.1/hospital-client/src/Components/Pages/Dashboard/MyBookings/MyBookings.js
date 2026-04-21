import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const MyBookings = () => {
  const [users] = useAuthState(auth);
  const [bookings, setBooking] = useState([]);
  const [fileMap, setFileMap] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showReportId, setShowReportId] = useState(null);

  const navigate = useNavigate();
  const imageHostKey = 'c70a5fc10619997bd7315f2bf28d0f3e';

  // Fetch bookings
  const fetchBookings = () => {
    if (users?.email) {
      fetch(`http://localhost:5000/myBookings/${users.email}`)
        .then(res => res.json())
        .then(data => setBooking(data))
        .catch(() => toast.error('Failed to fetch bookings'));
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [users?.email]);

  // Delete
  const handleDelete = id => {
    if (!window.confirm('Delete this booking?')) return;

    fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          setBooking(prev => prev.filter(b => b._id !== id));
          toast.success('Deleted successfully');
        }
      });
  };

  // Payment
  const handlePayment = id => navigate(`/payment/${id}`);

  // File change
  const handleFileChange = (id, file) => {
    setFileMap(prev => ({
      ...prev,
      [id]: file,
    }));
  };

  // Upload
  const handleAddFile = async id => {
    const file = fileMap[id];
    if (!file) return toast.error('Select a file first');

    setLoadingId(id);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        { method: 'POST', body: formData },
      );

      const data = await res.json();

      if (data.success) {
        const imgUrl = data.data.url;

        await fetch(`http://localhost:5000/addFile/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ report: imgUrl }),
        });

        toast.success('Report uploaded successfully');
        setFileMap(prev => ({ ...prev, [id]: null }));
        fetchBookings();
      } else {
        toast.error('Upload failed');
      }
    } catch {
      toast.error('Upload error');
    }

    setLoadingId(null);
  };

  // Meeting
  const handleJoinMeeting = booking => {
    if (!booking.meetingLink) return toast.error('No meeting link');
    window.open(booking.meetingLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-10 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Prescription</th>
              <th>Report</th>
              <th>Meeting</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b, i) => (
              <tr key={b._id}>
                <td>{i + 1}</td>

                <td>
                  <div className="flex items-center gap-2">
                    <img src={b.img} className="w-10 h-10 rounded" />
                    <span>{b.doctorName}</span>
                  </div>
                </td>

                <td>{b.appointmentDate}</td>

                {/* Prescription */}
                <td>
                  {b.prescription ? (
                    <button
                      onClick={() => setPreviewImage(b.prescription)}
                      className="btn btn-xs btn-secondary text-white"
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </td>

                {/* ✅ FIXED REPORT */}
                <td>
                  {b.report ? (
                    showReportId === b._id ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={b.report}
                          className="w-14 h-14 object-cover rounded"
                        />

                        <span className="text-green-600 font-semibold">
                          Uploaded
                        </span>

                        <button
                          onClick={() => setShowReportId(null)}
                          className="btn btn-xs bg-gray-600 text-white"
                        >
                          Hide
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowReportId(b._id)}
                        className="btn btn-xs btn-primary text-white"
                      >
                        View
                      </button>
                    )
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <input
                        type="file"
                        className="file-input file-input-xs w-[120px]"
                        onChange={e =>
                          handleFileChange(b._id, e.target.files[0])
                        }
                      />

                      <button
                        onClick={() => handleAddFile(b._id)}
                        className="btn btn-xs btn-secondary text-white"
                        disabled={loadingId === b._id}
                      >
                        {loadingId === b._id ? 'Uploading...' : 'Upload'}
                      </button>
                    </div>
                  )}
                </td>

                {/* Meeting */}
                <td>
                  {b.meetingLink ? (
                    <button
                      onClick={() => handleJoinMeeting(b)}
                      className="btn btn-xs btn-secondary text-white"
                    >
                      Join
                    </button>
                  ) : (
                    'N/A'
                  )}
                </td>

                {/* Payment */}
                <td>
                  {b.payment ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(b._id)}
                      className="btn btn-xs btn-secondary text-white"
                    >
                      Pay
                    </button>
                  )}
                </td>

                {/* Status */}
                <td>
                  {b.accept ? (
                    <span className="text-green-700">Accepted</span>
                  ) : (
                    <span className="text-yellow-600">Pending</span>
                  )}
                </td>

                {/* Delete */}
                <td>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="btn btn-xs bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td colSpan="9" className="py-6 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center"
          onClick={() => setPreviewImage(null)}
        >
          <img src={previewImage} className="max-h-[80vh] rounded" />
        </div>
      )}
    </div>
  );
};

export default MyBookings;

