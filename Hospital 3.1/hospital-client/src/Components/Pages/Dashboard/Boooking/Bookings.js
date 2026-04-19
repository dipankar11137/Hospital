import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useEffect, useState } from 'react';
import { IoCheckbox } from 'react-icons/io5';
import { toast } from 'react-toastify';

const formatDate = inputDate => {
  const date = new Date(inputDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  const [date, setDate] = useState('');
  const [department, setDepartment] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const [nextDates, setNextDates] = useState({});
  const [meetingData, setMeetingData] = useState({});
  const [reportData, setReportData] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [openImage, setOpenImage] = useState(null);

  /* ================= FETCH ================= */
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

  /* ================= FILTER ================= */
  useEffect(() => {
    let filtered = [...bookings];

    if (date) {
      const formatted = formatDate(date);
      filtered = filtered.filter(b => b.appointmentDate === formatted);
    }

    if (department) {
      filtered = filtered.filter(b => b.department === department);
    }

    if (doctorName) {
      filtered = filtered.filter(b => b.doctorName === doctorName);
    }

    setFilteredBookings(filtered);
  }, [date, department, doctorName, bookings]);

  /* ================= API ACTIONS ================= */

  const handleDelete = async id => {
    if (!window.confirm('Delete this booking?')) return;

    await fetch(`http://localhost:5000/bookings/${id}`, {
      method: 'DELETE',
    });

    toast.success('Deleted');
    fetchBookings();
  };

  const handleAccept = async id => {
    await fetch(`http://localhost:5000/bookingAccept/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ accept: true }),
    });

    toast.success('Accepted');
    fetchBookings();
  };

  const handleComplete = async id => {
    await fetch(`http://localhost:5000/bookingComplete/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ complete: true }),
    });

    toast.success('Completed');
    fetchBookings();
  };

  const handleNextDate = async id => {
    await fetch(`http://localhost:5000/nextDate/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ nextDate: nextDates[id] }),
    });

    toast.success('Next date updated');
    fetchBookings();
  };

  const handleMeetingUpdate = async id => {
    await fetch(`http://localhost:5000/bookingMeeting/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(meetingData[id]),
    });

    toast.success('Meeting updated');
    fetchBookings();
  };

  const handleReportUpdate = async id => {
    await fetch(`http://localhost:5000/bookingReport/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(reportData[id]),
    });

    toast.success('Report saved');
    fetchBookings();
  };

  /* ================= PDF ================= */
  const generatePDF = () => {
    const doc = new jsPDF('landscape');

    const rows = filteredBookings.map(b => [
      b.doctorName,
      b.department,
      b.patientName,
      b.email,
      b.phone,
      b.appointmentDate,
      b.slot,
      b.accept ? 'Accepted' : 'Pending',
    ]);

    autoTable(doc, {
      head: [
        [
          'Doctor',
          'Dept',
          'Patient',
          'Email',
          'Phone',
          'Date',
          'Slot',
          'Status',
        ],
      ],
      body: rows,
    });

    doc.save('booking-report.pdf');
  };

  const uniqueDepartments = [...new Set(bookings.map(b => b.department))];
  const uniqueDoctors = [...new Set(bookings.map(b => b.doctorName))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        {/* HEADER */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🏥 Booking Management Dashboard
        </h1>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <input
            type="date"
            onChange={e => setDate(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <select
            onChange={e => setDepartment(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All Dept</option>
            {uniqueDepartments.map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <select
            onChange={e => setDoctorName(e.target.value)}
            className="border p-2 rounded-lg"
          >
            <option value="">All Doctor</option>
            {uniqueDoctors.map(d => (
              <option key={d}>{d}</option>
            ))}
          </select>

          <button
            onClick={generatePDF}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Download PDF
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto h-[350px] overflow-y-auto">
          <table className="w-full text-sm border rounded-lg overflow-x-scroll">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Doctor</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Status</th>
                <th>Prescription</th>
                <th>Upload</th>
                <th>Report</th>
                <th>Next</th>
                <th>Meeting</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.slice().reverse().map((b, i) => (
                <tr key={b._id} className="border-t hover:bg-gray-50">
                  <td>{i + 1}</td>
                  <td>{b.doctorName}</td>
                  <td>{b.patientName}</td>
                  <td>{b.appointmentDate}</td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-xs 
                      ${b.accept ? 'bg-green-500' : 'bg-yellow-500'}`}
                    >
                      {b.accept ? 'Accepted' : 'Pending'}
                    </span>
                  </td>

                  {/* IMAGE */}
                  <td>
                    {b.prescription && (
                      <img
                        src={b.prescription}
                        alt="prescription"
                        className="w-14 h-14 object-cover rounded cursor-pointer"
                        onClick={() => setOpenImage(b.prescription)}
                      />
                    )}
                  </td>
                  {openImage && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                      onClick={() => setOpenImage(null)}
                    >
                      <div className="relative">
                        <img
                          src={openImage}
                          alt="Large prescription"
                          className="max-w-[90vw] max-h-[90vh] rounded"
                        />

                        <button
                          className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
                          onClick={() => setOpenImage(null)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                  {/* UPLOAD */}
                  <td>
                    <input
                      placeholder="Image URL"
                      className="border p-1 rounded w-32"
                      onChange={e =>
                        setReportData(prev => ({
                          ...prev,
                          [b._id]: {
                            report: true,
                            prescription: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() => handleReportUpdate(b._id)}
                      className="bg-green-500 text-white px-2 py-1 ml-1 rounded"
                    >
                      Save
                    </button>
                  </td>

                  {/* Report  */}
                  <td className="text-center">
                    {b.report && b.img ? (
                      <>
                        <img
                          src={b.img}
                          alt="prescription"
                          onClick={() => setPreviewImg(b.img)}
                          className="w-14 h-14 object-cover rounded mx-auto mb-1 cursor-pointer hover:scale-105 transition"
                        />

                        <span className="text-green-600 font-semibold">
                          Submitted
                        </span>
                      </>
                    ) : (
                      <span className="text-gray-500">Not Given</span>
                    )}
                  </td>
                  {previewImg && (
                    <div
                      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                      onClick={() => setPreviewImg(null)}
                    >
                      <div className="relative">
                        <img
                          src={previewImg}
                          alt="Full Preview"
                          className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
                        />

                        <button
                          onClick={() => setPreviewImg(null)}
                          className="absolute -top-3 -right-3 bg-red-600 text-white w-8 h-8 rounded-full"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}
                  {/* NEXT DATE */}
                  <td>
                    <input
                      type="number"
                      placeholder="Days"
                      className="border w-16 p-1 rounded"
                      onChange={e =>
                        setNextDates(prev => ({
                          ...prev,
                          [b._id]: e.target.value,
                        }))
                      }
                    />
                    <button onClick={() => handleNextDate(b._id)}>
                      <IoCheckbox />
                    </button>
                  </td>

                  {/* MEETING */}
                  <td>
                    <input
                      placeholder="Link"
                      className="border p-1 w-28 rounded"
                      onChange={e =>
                        setMeetingData(prev => ({
                          ...prev,
                          [b._id]: {
                            ...prev[b._id],
                            meetingLink: e.target.value,
                          },
                        }))
                      }
                    />
                    <input
                      type="time"
                      className="border p-1 rounded"
                      onChange={e =>
                        setMeetingData(prev => ({
                          ...prev,
                          [b._id]: {
                            ...prev[b._id],
                            meetingTime: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      onClick={() => handleMeetingUpdate(b._id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  </td>
                  <td>
                    {b.payment ? (
                      <span className="text-green-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Not Paid</span>
                    )}
                  </td>


                  {/* ACTION */}
                  <td className="space-x-1">
                    {!b.accept && (
                      <button
                        onClick={() => handleAccept(b._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Accept
                      </button>
                    )}

                    {!b.complete && (
                      <button
                        onClick={() => handleComplete(b._id)}
                        className="bg-purple-500 text-white px-2 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(b._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBookings.length === 0 && (
            <p className="text-center py-6 text-gray-500">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;

// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { useEffect, useState } from 'react';
// import { IoCheckbox } from 'react-icons/io5';
// import { toast } from 'react-toastify';

// const formatDate = inputDate => {
//   const date = new Date(inputDate);
//   const options = { year: 'numeric', month: 'short', day: 'numeric' };
//   return date.toLocaleDateString('en-US', options);
// };

// const Bookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [date, setDate] = useState('');
//   const [department, setDepartment] = useState('');
//   const [doctorName, setDoctorName] = useState('');
//   const [updateDate, setUpdateDate] = useState('');
//   const [meetingLink, setMeetingLink] = useState('');
//   const [meetingTime, setMeetingTime] = useState('');

//   const fetchBookings = () => {
//     fetch('http://localhost:5000/bookings')
//       .then(res => res.json())
//       .then(data => {
//         setBookings(data);
//         setFilteredBookings(data);
//       });
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     let filtered = [...bookings];
//     if (date) {
//       const formatted = formatDate(date);
//       filtered = filtered.filter(b => b.appointmentDate === formatted);
//     }
//     if (department)
//       filtered = filtered.filter(b => b.department === department);
//     if (doctorName)
//       filtered = filtered.filter(b => b.doctorName === doctorName);
//     setFilteredBookings(filtered);
//   }, [date, department, doctorName, bookings]);

//   const handleDelete = id => {
//     if (!window.confirm('Are you sure you want to delete this booking?'))
//       return;
//     fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
//       .then(res => res.json())
//       .then(() => {
//         toast.success('Booking deleted successfully');
//         fetchBookings();
//       });
//   };

//   const handleAccept = id => {
//     fetch(`http://localhost:5000/bookingAccept/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ accept: true }),
//     })
//       .then(res => res.json())
//       .then(() => {
//         toast.success('Booking accepted');
//         fetchBookings();
//       });
//   };

//   const handleComplete = id => {
//     fetch(`http://localhost:5000/bookingComplete/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ complete: true }),
//     })
//       .then(res => res.json())
//       .then(() => {
//         toast.success('Booking marked as complete');
//         fetchBookings();
//       });
//   };

//   const handleNextDate = id => {
//     fetch(`http://localhost:5000/nextDate/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ nextDate: updateDate }),
//     })
//       .then(res => res.json())
//       .then(() => {
//         toast.success('Next appointment date updated');
//         fetchBookings();
//       });
//   };

//   const handleMeetingUpdate = id => {
//     fetch(`http://localhost:5000/bookingMeeting/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ meetingLink, meetingTime }),
//     })
//       .then(res => res.json())
//       .then(() => {
//         toast.success('Meeting details updated successfully');
//         fetchBookings();
//       });
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF('landscape');
//     const tableColumn = [
//       'Doctor',
//       'Department',
//       'Patient',
//       'Email',
//       'Phone',
//       'Date',
//       'Slot',
//       'Status',
//       'Meeting Link',
//       'Meeting Time',
//     ];
//     const tableRows = filteredBookings.map(b => [
//       b.doctorName,
//       b.department,
//       b.patientName,
//       b.email,
//       b.phone,
//       b.appointmentDate,
//       b.slot,
//       b.accept ? 'Accepted' : 'Pending',
//       b.meetingLink || 'Not Set',
//       b.meetingTime || 'Not Set',
//     ]);
//     doc.setFontSize(18);
//     doc.text('Booking Report', 14, 15);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 25,
//       styles: { fontSize: 10, cellPadding: 3 },
//       headStyles: {
//         fillColor: [34, 197, 94],
//         textColor: 255,
//         halign: 'center',
//       },
//       theme: 'striped',
//       didDrawPage: function () {
//         doc.setFontSize(10);
//         doc.text(`Page ${doc.internal.getNumberOfPages()}`, 270, 10);
//       },
//     });

//     doc.save('booking-report.pdf');
//   };

//   const uniqueDepartments = [...new Set(bookings.map(b => b.department))];
//   const uniqueDoctors = [...new Set(bookings.map(b => b.doctorName))];

//   return (
//     <div className="px-4 md:px-10 py-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-5">
//         Manage All Bookings
//       </h1>

//       {/* Filters */}
//       <div className="flex flex-wrap justify-center gap-4 mb-6">
//         <input
//           type="date"
//           onChange={e => setDate(e.target.value)}
//           className="p-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <select
//           onChange={e => setDepartment(e.target.value)}
//           className="p-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           defaultValue=""
//         >
//           <option value="">All Departments</option>
//           {uniqueDepartments.map((dep, i) => (
//             <option key={i} value={dep}>
//               {dep}
//             </option>
//           ))}
//         </select>
//         <select
//           onChange={e => setDoctorName(e.target.value)}
//           className="p-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//           defaultValue=""
//         >
//           <option value="">All Doctors</option>
//           {uniqueDoctors.map((doc, i) => (
//             <option key={i} value={doc}>
//               {doc}
//             </option>
//           ))}
//         </select>
//         <button
//           onClick={generatePDF}
//           className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg transition transform hover:scale-105"
//         >
//           Download PDF
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200 h-[400px]">
//         <table className="min-w-full table-auto divide-y divide-gray-200 ">
//           <thead className="bg-green-100 text-gray-700 ">
//             <tr>
//               <th>#</th>
//               <th>Doctor</th>
//               <th>Dept</th>
//               <th>Patient</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Date</th>
//               <th>Slot</th>
//               <th>Report</th>
//               <th>Next Meet</th>
//               <th>Status</th>
//               <th>Complete</th>
//               <th>Meeting Link</th>
//               <th>Meeting Time</th>
//               <th>Save Meeting</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 text-gray-700">
//             {filteredBookings
//               .slice()
//               .reverse()
//               .map((b, i) => (
//                 <tr key={b._id} className="hover:bg-gray-50">
//                   <td className="text-center px-2">{i + 1}</td>
//                   <td className="px-2">{b.doctorName}</td>
//                   <td className="px-2">{b.department}</td>
//                   <td className="px-2">{b.patientName}</td>
//                   <td className="px-2">{b.email}</td>
//                   <td className="px-2 w-[200px]">{b.phone}</td>
//                   <td className="px-2 w-[200px]">{b.appointmentDate}</td>
//                   <td className="px-2">{b.slot}</td>
//                   <td className="px-2 text-center">
//                     {b.report ? 'Submitted' : 'Not Given'}
//                   </td>
//                   <td className="px-2 pt-7 flex items-center gap-1">
//                     <input
//                       type="number"
//                       placeholder="Days"
//                       className="w-16 px-1 py-1 border rounded"
//                       onChange={e => setUpdateDate(e.target.value)}
//                     />
//                     <button
//                       onClick={() => handleNextDate(b._id)}
//                       className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
//                     >
//                       <IoCheckbox />
//                     </button>
//                   </td>
//                   <td className="px-2">
//                     {b.accept ? (
//                       <span className="text-green-600 font-semibold">
//                         Accepted
//                       </span>
//                     ) : (
//                       <button
//                         onClick={() => handleAccept(b._id)}
//                         className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
//                       >
//                         Accept
//                       </button>
//                     )}
//                   </td>
//                   <td className="px-2">
//                     {b.complete ? (
//                       <span className="text-green-600 font-semibold">
//                         Complete
//                       </span>
//                     ) : (
//                       <button
//                         onClick={() => handleComplete(b._id)}
//                         className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition"
//                       >
//                         Complete
//                       </button>
//                     )}
//                   </td>

//                   {/* Meeting Link & Time */}
//                   <td className="px-2">
//                     <input
//                       type="text"
//                       placeholder="Meeting URL"
//                       defaultValue={b.meetingLink || ''}
//                       onChange={e => setMeetingLink(e.target.value)}
//                       className="w-36 px-1 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="px-2">
//                     <input
//                       type="time"
//                       defaultValue={b.meetingTime || ''}
//                       onChange={e => setMeetingTime(e.target.value)}
//                       className="w-24 px-1 py-1 border rounded"
//                     />
//                   </td>
//                   <td className="px-2">
//                     <button
//                       onClick={() => handleMeetingUpdate(b._id)}
//                       className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
//                     >
//                       Save
//                     </button>
//                   </td>
//                   <td className="px-2">
//                     <button
//                       onClick={() => handleDelete(b._id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//             {filteredBookings.length === 0 && (
//               <tr>
//                 <td colSpan="16" className="text-center py-6 text-gray-500">
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Bookings;
