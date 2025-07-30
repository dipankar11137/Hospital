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

  // 🔁 Fetch bookings from backend
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

  // 🎯 Filter logic
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

  // ✅ Handle delete
  const handleDelete = id => {
    if (window.confirm('Are you sure?')) {
      fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
          toast.success('Successfully deleted');
          fetchBookings();
        });
    }
  };

  // ✅ Handle accept
  const handleAccept = id => {
    fetch(`http://localhost:5000/bookingAccept/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ accept: true }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Accepted');
        fetchBookings();
      });
  };

  // ✅ Handle complete
  const handleComplete = id => {
    fetch(`http://localhost:5000/bookingComplete/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ complete: true }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Update Complete');
        fetchBookings();
      });
  };

  // ✅ Handle nextDate
  const handleNextDate = id => {
    fetch(`http://localhost:5000/nextDate/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ nextDate: updateDate }),
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Update nextDate');
        fetchBookings();
      });
  };

  // 🧾 Generate PDF
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
    ]);

    doc.setFontSize(18);
    doc.text('Booking Report', 14, 15);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: {
        fillColor: [255, 153, 0],
        textColor: 0,
        halign: 'center',
      },
      theme: 'striped',
      didDrawPage: function (data) {
        doc.setFontSize(10);
        doc.text(`Page ${doc.internal.getNumberOfPages()}`, 270, 10);
      },
    });

    doc.save('booking-report.pdf');
  };

  const uniqueDepartments = [...new Set(bookings.map(b => b.department))];
  const uniqueDoctors = [...new Set(bookings.map(b => b.doctorName))];

  return (
    <div className="px-2">
      <h1 className="text-3xl font-semibold text-center py-5">
        Manage All Bookings
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-5">
        <input
          onChange={e => setDate(e.target.value)}
          className="p-2 border rounded-lg text-black"
          type="date"
        />

        <select
          onChange={e => setDepartment(e.target.value)}
          className="p-2 border rounded-lg text-black"
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
          className="p-2 border rounded-lg text-black"
          defaultValue=""
        >
          <option value="">All Doctors</option>
          {uniqueDoctors.map((doc, i) => (
            <option key={i} value={doc}>
              {doc}
            </option>
          ))}
        </select>

        <button onClick={generatePDF} className="btn btn-success">
          Download PDF
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200 text-orange-700 text-center">
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Dept</th>
              <th>Patient</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Next Meet</th>
              <th>Status</th>
              <th>Complete</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings
              .slice()
              .reverse()
              .map((b, i) => (
                <tr key={b._id} className="text-start">
                  <td>{i + 1}</td>
                  <td>{b.doctorName}</td>
                  <td>{b.department}</td>
                  <td>{b.patientName}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.appointmentDate}</td>
                  <td>{b.slot}</td>
                  <td>
                    <div>
                      <div>
                        {!b.nextDate ? (
                          <span className="text-green-600 font-semibold">
                            0
                          </span>
                        ) : (
                          <span className="text-green-600 font-semibold">
                            {b.nextDate}{' '}
                            <samp className="text-red-600">Days Later</samp>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-x-2">
                        <input
                          onChange={e => setUpdateDate(e.target.value)}
                          className="w-8 h-[18px] border-[1px] border-indigo-900 rounded-md"
                          type="number"
                        />
                        <button
                          className="bg-primary text-white p-[1px] rounded-md"
                          onClick={() => handleNextDate(b._id)}
                        >
                          <IoCheckbox />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>
                    {b.accept ? (
                      <span className="text-green-600 font-semibold">
                        Accept
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAccept(b._id)}
                        className="btn btn-xs btn-secondary"
                      >
                        Accept
                      </button>
                    )}
                  </td>
                  <td>
                    {b.complete ? (
                      <span className="text-green-600 font-semibold">
                        Complete
                      </span>
                    ) : (
                      <button
                        onClick={() => handleComplete(b._id)}
                        className="btn btn-xs btn-accent"
                      >
                        Complete
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="btn btn-xs btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan="12" className="text-center py-6 text-gray-500">
                  No Appointment found.
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
