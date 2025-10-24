import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';

const MyBookings = () => {
  const [users] = useAuthState(auth);
  const [bookings, setBooking] = useState([]);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
   const imageHostKey = 'c70a5fc10619997bd7315f2bf28d0f3e';

  useEffect(() => {
    if (users?.email) {
      fetch(`http://localhost:5000/myBookings/${users.email}`)
        .then(res => res.json())
        .then(data => setBooking(data))
        .catch(() => toast.error('Failed to fetch bookings'));
    }
  }, [users?.email]);

  const handleDelete = id => {
    const proceed = window.confirm(
      'Are you sure you want to delete this booking?'
    );
    if (proceed) {
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
    }
  };

  const handlePayment = id => {
    navigate(`/payment/${id}`);
  };

const handleAddFile = async id => {
  if (!file) return alert('Please select a file first!');

  const formData = new FormData();
  formData.append('image', file); // imgbb expects 'image', not 'file'

  const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const imageData = await response.json();

    if (imageData.success) {
      const imgUrl = imageData.data.url;

      console.log('Uploaded Image URL:', imgUrl);

      // Optional: save this uploaded image URL to your server
      const res = await fetch(`http://localhost:5000/addFile/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report: imgUrl }),
      });

      const result = await res.json();
      // console.log('File saved:', result);
      alert('File uploaded and saved successfully!');
    } else {
      alert('Image upload failed!');
      // console.error(imageData);
    }
  } catch (error) {
    console.error('Upload error:', error);
    alert('Something went wrong while uploading the file.');
  }
};

  return (
    <div className="mx-10">
      <div className="px-1">
        <h1 className="text-3xl font-semibold text-center py-5 pr-20">
          My Bookings
        </h1>
        <div className="overflow-x-auto">
          <table className="table w-full text-white">
            <thead>
              <tr className="text-3xl bg-slate-900 text-center">
                <th className="bg-slate-400 text-xl "></th>
                <th className="bg-slate-400 text-xl border-r-2">Doctor Name</th>
                <th className="bg-slate-400 text-xl border-r-2">Department</th>
                <th className="bg-slate-400 text-xl border-r-2">Date</th>
                <th className="bg-slate-400 text-xl border-r-2">Slot</th>
                <th className="bg-slate-400 text-xl border-r-2">Next Meet</th>
                <th className="bg-slate-400 text-xl border-r-2">Add Report</th>
                <th className="bg-slate-400 text-xl border-r-2">Payment</th>
                <th className="bg-slate-400 text-xl border-r-2">Status</th>
                <th className="bg-slate-400 text-xl border-r-2">Complete</th>
                <th className="bg-slate-400 text-xl">Remove</th>
              </tr>
            </thead>
            <tbody>
              {bookings
                .slice()
                .reverse()
                .map((booking, index) => (
                  <tr key={booking._id} className="text-center text-slate-800">
                    <th className="bg-slate-300">{index + 1}</th>
                    <td className="bg-slate-300 border-r-2">
                      <div className="flex items-center">
                        <img
                          className="w-12 h-12 rounded-md"
                          src={booking?.img}
                          alt=""
                        />
                        <h1 className="font-semibold ml-3 overflow-auto">
                          {booking?.doctorName}
                        </h1>
                      </div>
                    </td>
                    <td className="bg-slate-300 border-r-2">
                      {booking?.department}
                    </td>
                    <td className="bg-slate-300 border-r-2">
                      {booking?.appointmentDate}
                    </td>
                    <td className="bg-slate-300 border-r-2">{booking?.slot}</td>
                    <td className="bg-slate-300 border-r-2">
                      {booking?.nextDate} Days Later
                    </td>
                    <td className="bg-slate-300 border-r-2">
                      {booking.report ? (
                        <>
                          Submitted
                        </>
                      ) : (
                        <div className="flex items-center gap-2 ">
                          <input
                            onChange={e => setFile(e.target.files[0])}
                            type="file"
                            name="Image"
                            accept="image/*"
                            className="file-input file-input-bordered file-input-xs w-[100px] "
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

                    <td className="bg-slate-300 border-r-2">
                      {booking.payment ? (
                        <div className="flex justify-center">
                          <h1 className="text-2xl font-semibold mr-4">Paid</h1>
                          <label
                            htmlFor={`modal-${index}`}
                            className="mt-1 text-2xl flex items-center cursor-pointer"
                          >
                            <FaChevronDown className="text-lg" />
                          </label>

                          <input
                            type="checkbox"
                            id={`modal-${index}`}
                            className="modal-toggle"
                          />
                          <div className="modal">
                            <div className="modal-box bg-white">
                              <div>
                                <img
                                  src="https://img.freepik.com/free-vector/thank-you-placard-concept-illustration_114360-13436.jpg"
                                  alt="Thank you"
                                />
                              </div>
                              <div className="modal-action">
                                <label
                                  htmlFor={`modal-${index}`}
                                  className="btn"
                                >
                                  Close
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePayment(booking._id)}
                          className="bg-lime-600 px-3 py-1 rounded-md uppercase text-white font-semibold hover:bg-lime-500"
                        >
                          Payment
                        </button>
                      )}
                    </td>

                    <td className="bg-slate-300 border-r-2">
                      {booking.accept ? (
                        <h1 className="text-lg text-green-800 font-semibold">
                          Accepted
                        </h1>
                      ) : (
                        <h1 className="text-lg text-orange-700 font-semibold">
                          Pay First
                        </h1>
                      )}
                    </td>
                    <td className="bg-slate-300 border-r-2">
                      {booking.complete ? (
                        <h1 className="text-lg text-green-800 font-semibold">
                          Complete
                        </h1>
                      ) : (
                        <h1 className="text-lg text-orange-700 font-semibold">
                          Processing
                        </h1>
                      )}
                    </td>

                    <td className="bg-slate-300">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="bg-orange-600 px-3 py-1 rounded-md uppercase text-white font-semibold hover:bg-orange-500"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;

// import { useEffect, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { toast } from 'react-toastify';
// import auth from '../../../../firebase.init';
// import MyBooking from './MyBooking';

// const MyBookings = () => {
//   const [users] = useAuthState(auth);
//   const [bookings, setBooking] = useState([]);
//   useEffect(() => {
//     fetch(`http://localhost:5000/myBookings/${users?.email}`)
//       .then(res => res.json())
//       .then(data => setBooking(data));
//   }, [bookings, users?.email]);

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
//           toast.success('Successfully Delete ');
//         });
//     }
//   };
//   return (
//     <div className='mx-10'>
//       <div className="px-1">
//         <h1 className="text-3xl font-semibold text-center py-5 pr-20">
//           My Booking
//         </h1>
//         <div className="overflow-x-auto">
//           <table className="table  w-full text-white">
//             <thead>
//               <tr className="text-3xl bg-slate-900 text-center">
//                 <th className="bg-slate-400 text-xl "></th>
//                 <th className="bg-slate-400 text-xl border-r-2">Doctor Name</th>
//                 <th className="bg-slate-400 text-xl border-r-2">Department</th>
//                 <th className="bg-slate-400 text-xl border-r-2">Date</th>
//                 <th className="bg-slate-400 text-xl border-r-2">Slot</th>
//                 <th className="bg-slate-400 text-xl border-r-2">Next Meet</th>
//                 <th className="bg-slate-400 text-xl border-r-2">Payment</th>
//                 <th className="bg-slate-400 text-xl border-r-2">Status</th>
//                 <th className="bg-slate-400 text-xl border-r-2">Complete</th>
//                 <th className="bg-slate-400 text-xl">Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking, index) => (
//                 <MyBooking
//                   key={booking._id}
//                   booking={booking}
//                   index={index + 1}
//                   handleDelete={handleDelete}
//                 ></MyBooking>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyBookings;
