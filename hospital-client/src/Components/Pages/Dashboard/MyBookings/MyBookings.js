import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../../../firebase.init';
import MyBooking from './MyBooking';

const MyBookings = () => {
  const [users] = useAuthState(auth);
  const [bookings, setBooking] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/myBookings/${users?.email}`)
      .then(res => res.json())
      .then(data => setBooking(data));
  }, [bookings]);

  const handleDelete = id => {
    const proceed = window.confirm('Are You Sure ?');
    if (proceed) {
      const url = `http://localhost:5000/bookings/${id}`;
      fetch(url, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          const remaining = bookings.filter(booking => booking._id !== id);
          setBooking(remaining);
          toast.success('Successfully Delete ');
        });
    }
  };
  return (
    <div className='mx-10'>
      <div className="px-1">
        <h1 className="text-3xl font-semibold text-center py-5 pr-20">
          My Booking
        </h1>
        <div className="overflow-x-auto">
          <table className="table  w-full text-white">
            <thead>
              <tr className="text-3xl bg-slate-900 text-center">
                <th className="bg-slate-400 text-xl "></th>
                <th className="bg-slate-400 text-xl border-r-2">Doctor Name</th>
                <th className="bg-slate-400 text-xl border-r-2">Department</th>
                <th className="bg-slate-400 text-xl border-r-2">Date</th>
                <th className="bg-slate-400 text-xl border-r-2">Slot</th>
                <th className="bg-slate-400 text-xl border-r-2">Payment</th>
                <th className="bg-slate-400 text-xl border-r-2">Status</th>
                <th className="bg-slate-400 text-xl">Remove</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <MyBooking
                  key={booking._id}
                  booking={booking}
                  index={index + 1}
                  handleDelete={handleDelete}
                ></MyBooking>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
