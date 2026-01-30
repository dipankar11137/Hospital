
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useEffect, useState } from 'react';
import { IoCheckbox } from 'react-icons/io5';
import { toast } from 'react-toastify';

const formatDate = inputDate => {
  const date = new Date(inputDate);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [date, setDate] = useState('');
  const [department, setDepartment] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  const fetchBookings = () => {
    fetch('http://localhost:5000/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setFilteredBookings(data);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = [...bookings];
    if (date) {
      const formatted = formatDate(date);
      filtered = filtered.filter(b => b.appointmentDate === formatted);
    }
    if (department)
      filtered = filtered.filter(b => b.department === department);
    if (doctorName)
      filtered = filtered.filter(b => b.doctorName === doctorName);
    setFilteredBookings(filtered);
  }, [date, department, doctorName, bookings]);

  const handleDelete = id => {
    if (!window.confirm('Are you sure you want to delete this booking?'))
      return;
    fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        toast.success('Booking deleted successfully');
        fetchBookings();
      });
  };

  const handleAccept = id => {
    fetch(`http://localhost:5000/bookingAccept/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ accept: true }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Booking accepted');
        fetchBookings();
      });
  };

  const handleComplete = id => {
    fetch(`http://localhost:5000/bookingComplete/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ complete: true }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Booking marked as complete');
        fetchBookings();
      });
  };

  const handleNextDate = id => {
    fetch(`http://localhost:5000/nextDate/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ nextDate: updateDate }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Next appointment date updated');
        fetchBookings();
      });
  };

  const handleMeetingUpdate = id => {
    fetch(`http://localhost:5000/bookingMeeting/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ meetingLink, meetingTime }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Meeting details updated successfully');
        fetchBookings();
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF('landscape');
    const tableColumn = [
      'Doctor',
      'Department',
      'Patient',
      'Email',
      'Phone',
      'Date',
      'Slot',
      'Status',
      'Meeting Link',
      'Meeting Time',
    ];
    const tableRows = filteredBookings.map(b => [
      b.doctorName,
      b.department,
      b.patientName,
      b.email,
      b.phone,
      b.appointmentDate,
      b.slot,
      b.accept ? 'Accepted' : 'Pending',
      b.meetingLink || 'Not Set',
      b.meetingTime || 'Not Set',
    ]);
    doc.setFontSize(18);
    doc.text('Booking Report', 14, 15);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [34, 197, 94],
        textColor: 255,
        halign: 'center',
      },
      theme: 'striped',
      didDrawPage: function () {
        doc.setFontSize(10);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, 270, 10);
      },
    });

    doc.save('booking-report.pdf');
  };

  const uniqueDepartments = [...new Set(bookings.map(b => b.department))];
  const uniqueDoctors = [...new Set(bookings.map(b => b.doctorName))];

  return (
    <div className="px-4 md:px-10 py-5 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-5">
        Manage All Bookings
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="date"
          onChange={e => setDate(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select
          onChange={e => setDepartment(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          defaultValue=""
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map((dep, i) => (
            <option key={i} value={dep}>
              {dep}
            </option>
          ))}
        </select>
        <select
          onChange={e => setDoctorName(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          defaultValue=""
        >
          <option value="">All Doctors</option>
          {uniqueDoctors.map((doc, i) => (
            <option key={i} value={doc}>
              {doc}
            </option>
          ))}
        </select>
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg transition transform hover:scale-105"
        >
          Download PDF
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200 h-[400px]">
        <table className="min-w-full table-auto divide-y divide-gray-200 ">
          <thead className="bg-green-100 text-gray-700 ">
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Dept</th>
              <th>Patient</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Report</th>
              <th>Next Meet</th>
              <th>Status</th>
              <th>Complete</th>
              <th>Meeting Link</th>
              <th>Meeting Time</th>
              <th>Save Meeting</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {filteredBookings
              .slice()
              .reverse()
              .map((b, i) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="text-center px-2">{i + 1}</td>
                  <td className="px-2">{b.doctorName}</td>
                  <td className="px-2">{b.department}</td>
                  <td className="px-2">{b.patientName}</td>
                  <td className="px-2">{b.email}</td>
                  <td className="px-2 w-[200px]">{b.phone}</td>
                  <td className="px-2 w-[200px]">{b.appointmentDate}</td>
                  <td className="px-2">{b.slot}</td>
                  <td className="px-2 text-center">
                    {b.report ? 'Submitted' : 'Not Given'}
                  </td>
                  <td className="px-2 pt-7 flex items-center gap-1">
                    <input
                      type="number"
                      placeholder="Days"
                      className="w-16 px-1 py-1 border rounded"
                      onChange={e => setUpdateDate(e.target.value)}
                    />
                    <button
                      onClick={() => handleNextDate(b._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                    >
                      <IoCheckbox />
                    </button>
                  </td>
                  <td className="px-2">
                    {b.accept ? (
                      <span className="text-green-600 font-semibold">
                        Accepted
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAccept(b._id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Accept
                      </button>
                    )}
                  </td>
                  <td className="px-2">
                    {b.complete ? (
                      <span className="text-green-600 font-semibold">
                        Complete
                      </span>
                    ) : (
                      <button
                        onClick={() => handleComplete(b._id)}
                        className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition"
                      >
                        Complete
                      </button>
                    )}
                  </td>

                  {/* Meeting Link & Time */}
                  <td className="px-2">
                    <input
                      type="text"
                      placeholder="Meeting URL"
                      defaultValue={b.meetingLink || ''}
                      onChange={e => setMeetingLink(e.target.value)}
                      className="w-36 px-1 py-1 border rounded"
                    />
                  </td>
                  <td className="px-2">
                    <input
                      type="time"
                      defaultValue={b.meetingTime || ''}
                      onChange={e => setMeetingTime(e.target.value)}
                      className="w-24 px-1 py-1 border rounded"
                    />
                  </td>
                  <td className="px-2">
                    <button
                      onClick={() => handleMeetingUpdate(b._id)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                  </td>
                  <td className="px-2">
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="16" className="text-center py-6 text-gray-500">
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
//     if (window.confirm('Are you sure you want to delete this booking?')) {
//       fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
//         .then(res => res.json())
//         .then(() => {
//           toast.success('Booking deleted successfully');
//           fetchBookings();
//         });
//     }
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
//     <div className="px-4 md:px-10 py-10 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
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
//           className="bg-primary text-white px-4 py-2 rounded-xl shadow-lg  transition transform hover:scale-105"
//         >
//           Download PDF
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200 h-[380px]">
//         <table className="min-w-full table-auto divide-y divide-gray-200">
//           <thead className="bg-green-100 text-gray-700">
//             <tr>
//               <th className="px-3 py-2">#</th>
//               <th className="px-3 py-2">Doctor</th>
//               <th className="px-3 py-2">Dept</th>
//               <th className="px-3 py-2">Patient</th>
//               <th className="px-3 py-2">Email</th>
//               <th className="px-3 py-2">Phone</th>
//               <th className="px-3 py-2">Date</th>
//               <th className="px-3 py-2">Slot</th>
//               <th className="px-3 py-2">Report</th>
//               <th className="px-3 py-2">Next Meet</th>
//               <th className="px-3 py-2">Status</th>
//               <th className="px-3 py-2">Complete</th>
//               <th className="px-3 py-2">Delete</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 text-gray-700">
//             {filteredBookings
//               .slice()
//               .reverse()
//               .map((b, i) => (
//                 <tr key={b._id} className="hover:bg-gray-50">
//                   <td className="text-center px-3 py-2">{i + 1}</td>
//                   <td className="px-3 py-2">{b.doctorName}</td>
//                   <td className="px-3 py-2">{b.department}</td>
//                   <td className="px-3 py-2">{b.patientName}</td>
//                   <td className="px-3 py-2">{b.email}</td>
//                   <td className="px-3 py-2">{b.phone}</td>
//                   <td className="px-3 py-2">{b.appointmentDate}</td>
//                   <td className="px-3 py-2">{b.slot}</td>
//                   <td className="px-3 py-2 text-center">
//                     {b.report ? (
//                       <>
//                         <label
//                           htmlFor={`report_modal_${b._id}`}
//                           className="  text-blue-600 rounded cursor-pointer text-xs text-center"
//                         >
//                           Show <br/> Report
//                         </label>
//                         <input
//                           type="checkbox"
//                           id={`report_modal_${b._id}`}
//                           className="modal-toggle"
//                         />
//                         <div className="modal">
//                           <div className="modal-box relative">
//                             <h3 className="text-lg font-bold text-center mb-2">
//                               Patient Report
//                             </h3>
//                             <img
//                               src={b.report}
//                               alt="Report"
//                               className="w-full h-auto object-contain rounded-md border border-gray-300"
//                             />
//                             <div className="modal-action">
//                               <label
//                                 htmlFor={`report_modal_${b._id}`}
//                                 className="btn btn-sm btn-error"
//                               >
//                                 Close
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <span className="text-gray-500 text-sm">Not Given</span>
//                     )}
//                   </td>
//                   <td className="px-3 py-2">
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="number"
//                         placeholder="Days"
//                         onChange={e => setUpdateDate(e.target.value)}
//                         className="w-16 px-2 py-1 border rounded"
//                       />
//                       <button
//                         onClick={() => handleNextDate(b._id)}
//                         className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
//                       >
//                         <IoCheckbox />
//                       </button>
//                     </div>
//                   </td>
//                   <td className="px-3 py-2">
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
//                   <td className="px-3 py-2">
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
//                   <td className="px-3 py-2">
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
//                 <td colSpan="13" className="text-center py-6 text-gray-500">
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

//   // 🔁 Fetch bookings from backend
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

//   // 🎯 Filter logic
//   useEffect(() => {
//     let filtered = [...bookings];

//     if (date) {
//       const formatted = formatDate(date);
//       filtered = filtered.filter(b => b.appointmentDate === formatted);
//     }

//     if (department) {
//       filtered = filtered.filter(b => b.department === department);
//     }

//     if (doctorName) {
//       filtered = filtered.filter(b => b.doctorName === doctorName);
//     }

//     setFilteredBookings(filtered);
//   }, [date, department, doctorName, bookings]);

//   // ✅ Handle delete
//   const handleDelete = id => {
//     if (window.confirm('Are you sure?')) {
//       fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
//         .then(res => res.json())
//         .then(() => {
//           toast.success('Successfully deleted');
//           fetchBookings();
//         });
//     }
//   };

//   // ✅ Handle accept
//   const handleAccept = id => {
//     fetch(`http://localhost:5000/bookingAccept/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ accept: true }),
//     })
//       .then(res => res.json())
//       .then(() => {
//         toast.success('Accepted');
//         fetchBookings();
//       });
//   };

//   // ✅ Handle complete
//   const handleComplete = id => {
//     fetch(`http://localhost:5000/bookingComplete/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ complete: true }),
//     })
//       .then(res => res.json())
//       .then(() => {
//         toast.success('Update Complete');
//         fetchBookings();
//       });
//   };

//   // ✅ Handle nextDate
//   const handleNextDate = id => {
//     fetch(`http://localhost:5000/nextDate/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ nextDate: updateDate }),
//     })
//       .then(res => res.json())
//       .then(() => {
//         toast.success('Update nextDate');
//         fetchBookings();
//       });
//   };

//   // 🧾 Generate PDF
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
//     ]);

//     doc.setFontSize(18);
//     doc.text('Booking Report', 14, 15);

//     autoTable(doc, {
//       head: [tableColumn],
//       body: tableRows,
//       startY: 25,
//       styles: { fontSize: 10, cellPadding: 3 },
//       headStyles: {
//         fillColor: [255, 153, 0],
//         textColor: 0,
//         halign: 'center',
//       },
//       theme: 'striped',
//       didDrawPage: function (data) {
//         doc.setFontSize(10);
//         doc.text(`Page ${doc.internal.getNumberOfPages()}`, 270, 10);
//       },
//     });

//     doc.save('booking-report.pdf');
//   };

//   const uniqueDepartments = [...new Set(bookings.map(b => b.department))];
//   const uniqueDoctors = [...new Set(bookings.map(b => b.doctorName))];

//   return (
//     <div className="px-2">
//       <h1 className="text-3xl font-semibold text-center py-5">
//         Manage All Bookings
//       </h1>

//       <div className="flex flex-wrap justify-center gap-4 mb-5">
//         <input
//           onChange={e => setDate(e.target.value)}
//           className="p-2 border rounded-lg text-black"
//           type="date"
//         />

//         <select
//           onChange={e => setDepartment(e.target.value)}
//           className="p-2 border rounded-lg text-black"
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
//           className="p-2 border rounded-lg text-black"
//           defaultValue=""
//         >
//           <option value="">All Doctors</option>
//           {uniqueDoctors.map((doc, i) => (
//             <option key={i} value={doc}>
//               {doc}
//             </option>
//           ))}
//         </select>

//         <button onClick={generatePDF} className="btn btn-success">
//           Download PDF
//         </button>
//       </div>

//       <div className="overflow-x-auto h-[410px]">
//         <table className="table w-full border ">
//           <thead className="bg-gray-200 text-orange-700 text-center">
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
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings
//               .slice()
//               .reverse()
//               .map((b, i) => (
//                 <tr key={b._id} className="text-start">
//                   <td>{i + 1}</td>
//                   <td>{b.doctorName}</td>
//                   <td>{b.department}</td>
//                   <td>{b.patientName}</td>
//                   <td>{b.email}</td>
//                   <td>{b.phone}</td>
//                   <td>{b.appointmentDate}</td>
//                   <td>{b.slot}</td>
//                   {/* <td>
//                     {b.report ? <><button>Show Report</button></> : <>Not Given</>}
//                   </td> */}
//                   <td className=" ">
//                     {b.report ? (
//                       <>
//                         {/* Button to open modal */}
//                         <label
//                           htmlFor={`report_modal_${b._id}`}
//                           className="btn btn-xs btn-primary cursor-pointer"
//                         >
//                           Show Report
//                         </label>

//                         {/* Modal */}
//                         <input
//                           type="checkbox"
//                           id={`report_modal_${b._id}`}
//                           className="modal-toggle"
//                         />
//                         <div className="modal">
//                           <div className="modal-box bg-white relative">
//                             <h3 className="text-lg font-semibold mb-2 text-center">
//                               Patient Report
//                             </h3>

//                             <img
//                               src={b.report}
//                               alt="Report"
//                               className="rounded-md w-full h-auto object-contain border border-gray-300"
//                             />

//                             <div className="modal-action fixed -top-6 right-0">
//                               <label
//                                 htmlFor={`report_modal_${b._id}`}
//                                 className="rounded-full bg-red-600 py-3 px-4 font-extrabold text-white cursor-pointer"
//                               >
//                                 X
//                               </label>
//                             </div>
//                           </div>
//                         </div>
//                       </>
//                     ) : (
//                       <span className="text-gray-600">Not Given</span>
//                     )}
//                   </td>
//                   <td>
//                     <div>
//                       <div>
//                         {!b.nextDate ? (
//                           <span className="text-green-600 font-semibold">
//                             0
//                           </span>
//                         ) : (
//                           <span className="text-green-600 font-semibold">
//                             {b.nextDate}{' '}
//                             <samp className="text-red-600">Days Later</samp>
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-x-2">
//                         <input
//                           onChange={e => setUpdateDate(e.target.value)}
//                           className="w-8 h-[18px] border-[1px] border-indigo-900 rounded-md"
//                           type="number"
//                         />
//                         <button
//                           className="bg-primary text-white p-[1px] rounded-md"
//                           onClick={() => handleNextDate(b._id)}
//                         >
//                           <IoCheckbox />
//                         </button>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     {b.accept ? (
//                       <span className="text-green-600 font-semibold">
//                         Accept
//                       </span>
//                     ) : (
//                       <button
//                         onClick={() => handleAccept(b._id)}
//                         className="btn btn-xs btn-secondary"
//                       >
//                         Accept
//                       </button>
//                     )}
//                   </td>
//                   <td>
//                     {b.complete ? (
//                       <span className="text-green-600 font-semibold">
//                         Complete
//                       </span>
//                     ) : (
//                       <button
//                         onClick={() => handleComplete(b._id)}
//                         className="btn btn-xs btn-accent"
//                       >
//                         Complete
//                       </button>
//                     )}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(b._id)}
//                       className="btn btn-xs btn-error"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}

//             {filteredBookings.length === 0 && (
//               <tr>
//                 <td colSpan="12" className="text-center py-6 text-gray-500">
//                   No Appointment found.
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

// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
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
//   const [updateDate, setUpdateDate] = useState(0);

//   useEffect(() => {
//     fetch('http://localhost:5000/bookings')
//       .then(res => res.json())
//       .then(data => {
//         setBookings(data);
//         setFilteredBookings(data);
//       });
//   }, []);

//   useEffect(() => {
//     let filtered = [...bookings];

//     if (date) {
//       const formatted = formatDate(date);
//       filtered = filtered.filter(b => b.appointmentDate === formatted);
//     }

//     if (department) {
//       filtered = filtered.filter(b => b.department === department);
//     }

//     if (doctorName) {
//       filtered = filtered.filter(b => b.doctorName === doctorName);
//     }

//     setFilteredBookings(filtered);
//   }, [date, department, doctorName, bookings]);

//   const handleDelete = id => {
//     if (window.confirm('Are you sure?')) {
//       fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
//         .then(res => res.json())
//         .then(() => {
//           toast.success('Successfully deleted');
//           setBookings(bookings.filter(b => b._id !== id));
//         });
//     }
//   };

//   const handleAccept = id => {
//     fetch(`http://localhost:5000/bookingAccept/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ accept: true }),
//     })
//       .then(res => res.json())
//       .then(() => toast.success('Accepted'));
//   };
//   const handleComplete = id => {
//     fetch(`http://localhost:5000/bookingComplete/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ complete: true }),
//     })
//       .then(res => res.json())
//       .then(() => toast.success('Update Complete'));
//   };
//   const handleNextDate = id => {
//     fetch(`http://localhost:5000/nextDate/${id}`, {
//       method: 'PUT',
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({ nextDate: updateDate }),
//     })
//       .then(res => res.json())
//       .then(() => toast.success('Update nextDate'));
//   };

// const generatePDF = () => {
//   const doc = new jsPDF('landscape'); // Optional: use 'portrait' if preferred

//   const tableColumn = [
//     'Doctor',
//     'Department',
//     'Patient',
//     'Email',
//     'Phone',
//     'Date',
//     'Slot',
//     'Status',
//   ];

//   const tableRows = filteredBookings.map(b => [
//     b.doctorName,
//     b.department,
//     b.patientName,
//     b.email,
//     b.phone,
//     b.appointmentDate,
//     b.slot,
//     b.accept ? 'Accepted' : 'Pending',
//   ]);

//   doc.setFontSize(18);
//   doc.text('Booking Report', 14, 15);

//   autoTable(doc, {
//     head: [tableColumn],
//     body: tableRows,
//     startY: 25,
//     styles: { fontSize: 10, cellPadding: 3 },
//     headStyles: {
//       fillColor: [255, 153, 0],
//       textColor: 0,
//       halign: 'center',
//     },
//     theme: 'striped',
//     didDrawPage: function (data) {
//       doc.setFontSize(10);
//       doc.text(`Page ${doc.internal.getNumberOfPages()}`, 270, 10);
//     },
//   });

//   doc.save('booking-report.pdf');
// };

//   const uniqueDepartments = [...new Set(bookings.map(b => b.department))];
//   const uniqueDoctors = [...new Set(bookings.map(b => b.doctorName))];

//   return (
//     <div className="px-2">
//       <h1 className="text-3xl font-semibold text-center py-5">
//         Manage All Bookings
//       </h1>
//       <div className="flex flex-wrap justify-center gap-4 mb-5">
//         <input
//           onChange={e => setDate(e.target.value)}
//           className="p-2 border rounded-lg text-black"
//           type="date"
//         />

//         <select
//           onChange={e => setDepartment(e.target.value)}
//           className="p-2 border rounded-lg text-black"
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
//           className="p-2 border rounded-lg text-black"
//           defaultValue=""
//         >
//           <option value="">All Doctors</option>
//           {uniqueDoctors.map((doc, i) => (
//             <option key={i} value={doc}>
//               {doc}
//             </option>
//           ))}
//         </select>

//         <button onClick={generatePDF} className="btn btn-success">
//           Download PDF
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table w-full border">
//           <thead className="bg-gray-200 text-orange-700 text-center">
//             <tr>
//               <th>#</th>
//               <th>Doctor</th>
//               <th>Dept</th>
//               <th>Patient</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Date</th>
//               <th>Slot</th>
//               <th>Next Meet</th>
//               <th>Status</th>
//               <th>Complete</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings
//               .slice()
//               .reverse()
//               .map((b, i) => (
//                 <tr key={b._id} className="text-start">
//                   <td>{i + 1}</td>
//                   <td>{b.doctorName}</td>
//                   <td>{b.department}</td>
//                   <td>{b.patientName}</td>
//                   <td>{b.email}</td>
//                   <td>{b.phone}</td>
//                   <td>{b.appointmentDate}</td>
//                   <td>{b.slot}</td>
//                   <td>
//                     <div>
//                       <div>
//                         {!b.nextDate ? (
//                           <span className="text-green-600 font-semibold">
//                             0
//                           </span>
//                         ) : (
//                           <span className="text-green-600 font-semibold">{b.nextDate}</span>
//                         )}
//                       </div>
//                       <div className='flex items-center gap-x-2'>
//                         <input
//                           onChange={e => setUpdateDate(e.target.value)}
//                           className="w-8 h-[18px] border-[1px] border-indigo-900 rounded-md"
//                           type="number"
//                         />
//                         <button className='bg-primary text-white p-[1px] rounded-md' onClick={() => handleNextDate(b._id)}>
//                           <IoCheckbox />
//                         </button>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     {b.accept ? (
//                       <span className="text-green-600 font-semibold">
//                         Accept
//                       </span>
//                     ) : (
//                       <button
//                         onClick={() => handleAccept(b._id)}
//                         className="btn btn-xs btn-secondary"
//                       >
//                         Accept
//                       </button>
//                     )}
//                   </td>
//                   <td>
//                     {b.complete ? (
//                       <span className="text-green-600 font-semibold">
//                         Complete
//                       </span>
//                     ) : (
//                       <button
//                         onClick={() => handleComplete(b._id)}
//                         className="btn btn-xs btn-accent"
//                       >
//                         Complete
//                       </button>
//                     )}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(b._id)}
//                       className="btn btn-xs btn-error"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Bookings;
