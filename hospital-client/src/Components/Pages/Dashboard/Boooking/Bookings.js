import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetch('http://localhost:5000/bookings')
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setFilteredBookings(data);
      });
  }, []);

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

  const handleDelete = id => {
    if (window.confirm('Are you sure?')) {
      fetch(`http://localhost:5000/bookings/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(() => {
          toast.success('Successfully deleted');
          setBookings(bookings.filter(b => b._id !== id));
        });
    }
  };

  const handleAccept = id => {
    fetch(`http://localhost:5000/bookingAccept/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ accept: true }),
    })
      .then(res => res.json())
      .then(() => toast.success('Accepted'));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      'Doctor',
      'Dept',
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

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.text('Booking Report', 14, 15);
    doc.save('bookings.pdf');
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
              <th>Status</th>
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
                    {b.accept ? (
                      <span className="text-green-600 font-semibold">
                        Accepted
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAccept(b._id)}
                        className="btn btn-xs btn-primary"
                      >
                        Accept
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;

// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import Booking from './Booking';

// const formatDate = inputDate => {
//   const date = new Date(inputDate);
//   const options = { year: 'numeric', month: 'short', day: 'numeric' };
//   return date.toLocaleDateString('en-US', options);
// };

// const Bookings = () => {
//   const [bookings, setBooking] = useState([]);
//   const [date, setDate] = useState('');

//   const formattedDate = formatDate(date);
//   if (date) {
//     fetch(`http://localhost:5000/bookingDate/${formattedDate}`)
//       .then(res => res.json())
//       .then(data => setBooking(data));
//   } else {
//     fetch('http://localhost:5000/bookings')
//       .then(res => res.json())
//       .then(data => setBooking(data));
//   }
//   useEffect(() => {
//     fetch('http://localhost:5000/bookings')
//       .then(res => res.json())
//       .then(data => setBooking(data));
//   }, [bookings]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/bookingDate/${formattedDate}`)
//       .then(res => res.json())
//       .then(data => setBooking(data));
//   }, [formattedDate]);

//   const handleDelete = id => {
//     const proceed = window.confirm('Are You Sure ?');
//     if (proceed) {
//       const url = `http://localhost:5000/bookings/${id}`;
//       fetch(url, {
//         method: 'DELETE',
//       })
//         .then(res => res.json())
//         .then(data => {
//           const remaining = bookings.filter(booking => booking._id !== id);
//           setBooking(remaining);
//           toast.success('Successfully Delivered ');
//         });
//     }
//   };

//   const handleAccept = id => {
//     const updateAccept = { accept: true };
//     fetch(`http://localhost:5000/bookingAccept/${id}`, {
//       method: 'PUT',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(updateAccept),
//     })
//       .then(res => res.json())
//       .then(data => {
//         toast.success('Accept Done ');
//       });
//   };
//   const handleDelivery = id => {
//     toast.success('Delivery Done ');
//   };
//   return (
//     <div className="px-1">
//       <h1 className="text-3xl font-semibold text-center py-5 pr-20">
//         Manage All Booking
//       </h1>
//       <div className="flex justify-center p-2">
//         <input
//           onChange={e => setDate(e.target.value)}
//           className="text-black w-[300px] p-2 rounded-lg text-xl text-orange-700 font-semibold"
//           type="date"
//           name=""
//           id=""
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="table  w-full text-slate-900 border-2">
//           <thead>
//             <tr className="text-3xl bg-slate-900 text-center">
//               <th className="bg-slate-300 text-xl text-orange-700"></th>
//               <th className="bg-slate-300 text-xl text-orange-700">Doctor Name</th>
//               <th className="bg-slate-300 text-xl text-orange-700">Department</th>
//               <th className="bg-slate-300 text-xl text-orange-700">Patient name</th>
//               <th className="bg-slate-300 text-xl text-orange-700">Email</th>
//               <th className="bg-slate-300 text-xl text-orange-700">Phone</th>
//               <th className="bg-slate-300 text-xl text-orange-700">Date</th>
//               <th className="bg-slate-300 text-xl text-orange-700">Slot</th>
//               <th className="bg-slate-300 text-xl text-orange-700">Status</th>
//               <th className="bg-slate-300 text-xl text-orange-700">Remove</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.slice().reverse().map((booking, index) => (
//               <Booking
//                 key={booking._id}
//                 booking={booking}
//                 index={index + 1}
//                 handleDelete={handleDelete}
//                 handleAccept={handleAccept}
//                 handleDelivery={handleDelivery}
//               ></Booking>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Bookings;
