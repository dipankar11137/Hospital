import html2canvas from 'html2canvas';
import { useEffect, useState } from 'react';
import { FaUserMd } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useUser from '../../../hooks/useUser';
const formatDate = inputDate => {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const MyPatients = () => {
  const { user, loading } = useUser();

  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
 


  const [filterDate, setFilterDate] = useState('');
  const navigate = useNavigate();

  // modal
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [notes, setNotes] = useState('');
  const [test, setTest] = useState('');

  const [medicines, setMedicines] = useState([{ name: '', instruction: '' }]);

  const imageHostKey = 'c70a5fc10619997bd7315f2bf28d0f3e';
  const today = new Date().toISOString().split('T')[0];

   const [date, setDate] = useState(today);

  // filter
  useEffect(() => {
    if (filterDate) {
      setFilteredBookings(
        bookings.filter(b => b.appointmentDate === filterDate),
      );
    } else {
      setFilteredBookings(bookings);
    }
  }, [filterDate, bookings]);

  const handleOpenModal = data => {
    setSelected(data);
    setShowModal(true);
    setIsEdit(false);
    setMedicines([{ name: '', instruction: '' }]);
    setNotes('');
    setTest('');
  };

  // open modal (EDIT)
  const handleEdit = data => {
    setSelected(data);
    setShowModal(true);
    setIsEdit(true);

    setMedicines(data.medicines || [{ name: '', instruction: '' }]);
    setNotes(data.notes || '');
    setTest(data.test || '');
  };

  const handleCloseModal = () => setShowModal(false);

  // filter
     const fetchBookings = async () => {
        try {
          const res = await fetch('http://localhost:5000/bookings');
          const data = await res.json();
          setBookings(data);
          setFilteredBookings(data);
        } catch {
          toast.error('Failed to load bookings');
        }
      };

      useEffect(() => {
        fetchBookings();
      }, []);

    // useEffect(() => {
    //   let filtered = [...bookings];

    //    if (date) {
    //      const formatted = formatDate(date);
    //      filtered = filtered.filter(b => b.appointmentDate === formatted);
    //    }

    //   setFilteredBookings(filtered);
  // }, [date, bookings]);
  
useEffect(() => {
  let filtered = [...bookings];

  // ✅ Convert input date → same format as appointmentDate
  const selectedDate = date ? formatDate(date) : null;

  // ✅ Filter by date
  if (selectedDate) {
    filtered = filtered.filter(b => b.appointmentDate === selectedDate);
  }

  // ✅ Filter by logged-in doctor/patient name
  if (user?.name) {
    filtered = filtered.filter(
      b => b.doctorName?.toLowerCase() === user.name.toLowerCase(),
    );
  }

  setFilteredBookings(filtered);
}, [date, bookings, user]);



    // ✅ Loading guard
    if (loading || !user) {
      return (
        <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-slate-600">
          Loading profile...
        </div>
      );
    }

  // medicine handlers
  const addMedicine = () =>
    setMedicines([...medicines, { name: '', instruction: '' }]);

  const handleChange = (i, field, value) => {
    const updated = [...medicines];
    updated[i][field] = value;
    setMedicines(updated);
  };

  // submit
  const handleSubmit = async () => {
    const element = document.getElementById('prescription-card');

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
    });

    const base64 = canvas.toDataURL('image/png').split(',')[1];

    const formData = new FormData();
    formData.append('image', base64);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
      { method: 'POST', body: formData },
    );

    const data = await res.json();

    await fetch(`http://localhost:5000/bookingsId/${selected._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prescription: data.data.url,
        medicines,
        notes,
        test,
        date: today,
      }),
    });

    toast.success(isEdit ? 'Prescription Updated' : 'Prescription Saved');
    setShowModal(false);
    fetchBookings();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="pt-16 px-6">
      <div className="relative bg-gradient-to-r from-cyan-600 to-blue-700 h-64">
        <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[90%] max-w-5xl">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <img
              className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
              src={
                user?.img ||
                'https://cdn-icons-png.flaticon.com/512/387/387561.png'
              }
              alt="Profile"
            />

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2 justify-center md:justify-start">
                <FaUserMd className="text-blue-600" />
                {user?.name}
              </h1>

              <p className="text-slate-600 mt-1">
                {user?.workplace || 'Healthcare Professional'}
              </p>

              <p className="text-sm text-slate-500 mt-1">
                {user?.location || 'Location not provided'}
              </p>
            </div>

            {/* Actions */}
            <div className="text-center">
              <button
                onClick={() => navigate('/Profile')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold mb-3"
              >
                Go Profile
              </button>

              <br />

              <input
                type="date"
                value={date} 
                onChange={e => setDate(e.target.value)}
                className="border p-2 border-green-400 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      {/* FILTER */}

      {/* TABLE */}
      {filteredBookings.length > 0 ? (
        <table className="w-full text-sm border mt-20">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2">#</th>
              <th className="text-start pl-2">Doctor</th>
              <th className="text-start pl-2">Patient</th>
              <th>Date</th>
              <th>slot</th>
              <th>Report</th>
              <th>Next Meet</th>
              <th>Meeting</th>
              <th>Prescription</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((b, i) => (
              <tr key={b._id} className="text-center border-t">
                <td>{i + 1}</td>
                <td className="text-start pl-2">{b.doctorName}</td>
                <td className="text-start pl-2">{b.patientName}</td>
                <td>{b.appointmentDate}</td>
                <td>{b.slot}</td>
                <td>{b.report ? 'Yes' : 'No'}</td>
                <td>{b.nextDate || 'Not Set'}</td>
                <td>
                  {b.meetingLink ? (
                    <a
                      href={b.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:underline text-white px-3 py-1 rounded"
                    >
                      Join Meeting
                    </a>
                  ) : (
                    <span className="text-gray-500">Not Scheduled</span>
                  )}
                </td>

                <td>
                  {b.prescription ? (
                    <img
                      src={b.prescription}
                      alt="prescription"
                      className="w-12 h-12 object-cover mx-auto cursor-pointer border rounded border-red-300"
                      onClick={() => window.open(b.prescription)}
                    />
                  ) : (
                    <span className="text-gray-500">No</span>
                  )}
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleOpenModal(b)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Add
                  </button>

                  {b.prescription && (
                    <button
                      onClick={() => handleEdit(b)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 py-20">
          No appointments found for the selected date.
        </div>
      )}

      {/* MODAL */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-[600px] max-h-[90vh] overflow-y-auto p-4 rounded">
            <div className="flex justify-between mb-2">
              <h2 className="font-bold">
                {isEdit ? 'Edit Prescription' : 'New Prescription'}
              </h2>

              <button onClick={handleCloseModal}>✖</button>
            </div>

            {/* PRESCRIPTION */}
            <div
              id="prescription-card"
              className="bg-white p-5  text-sm leading-5"
            >
              {/* HEADER */}
              <div className="text-center border-b pb-2 mb-3">
                <h1 className="text-xl font-bold text-blue-700">
                  Smart Healthcare
                </h1>
                <p>📞 +8801725798558 | ✉ smarthealthcare@gmail.com</p>
              </div>

              {/* INFO */}
              <div className="flex justify-between text-sm mb-2">
                <p>
                  <b>Doctor:</b> {selected.doctorName}
                </p>
                <p>
                  <b>Patient:</b> {selected.patientName}
                </p>
                <p>
                  <b>Date:</b> {today}
                </p>
              </div>

              {/* TEST */}
              <div className="mb-2">
                <b>Diagnosis:</b>
                <textarea
                  placeholder="Tests, symptoms, diagnosis details..."
                  className="w-full border mt-2 p-1 "
                  value={test}
                  onChange={e => setTest(e.target.value)}
                />
              </div>

              {/* MEDICINES */}
              <div>
                <b>Rx</b>

                {medicines.map((m, i) => (
                  <div key={i} className="flex gap-2 ">
                    <span>{i + 1}.</span>

                    <textarea
                      placeholder="Medicine"
                      className="border p-2 pt-0 h-10 "
                      value={m.name}
                      onChange={e => handleChange(i, 'name', e.target.value)}
                    />

                    <textarea
                      placeholder="Dose"
                      className="border p-2 pt-0 h-10"
                      value={m.instruction}
                      onChange={e =>
                        handleChange(i, 'instruction', e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              {/* NOTES */}
              <div className="mt-2">
                <b>Advice:</b>
                <textarea
                  placeholder="Additional notes, advice, lifestyle recommendations..."
                  className="w-full border p-1 mt-2"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              {/* SIGNATURE */}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between mt-3">
              <button
                onClick={addMedicine}
                className="bg-blue-500 text-white px-3 py-1"
              >
                + Medicine
              </button>

              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-1"
              >
                {isEdit ? 'Update' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPatients;


