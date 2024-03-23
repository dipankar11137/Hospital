import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Booking from './Booking';

const formatDate = inputDate => {
  const date = new Date(inputDate);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

const Bookings = () => {
  const [bookings, setBooking] = useState([]);
  const [date, setDate] = useState('');

  // const formattedDate = formatDate(date);
  // if (date) {
  //   fetch(`http://localhost:5000/bookingDate/${formattedDate}`)
  //     .then(res => res.json())
  //     .then(data => setBooking(data));
  // } else {
  //   fetch('http://localhost:5000/bookings')
  //     .then(res => res.json())
  //     .then(data => setBooking(data));
  // }
  useEffect(() => {
    fetch('http://localhost:5000/bookings')
      .then(res => res.json())
      .then(data => setBooking(data));
  }, [bookings]);

  // useEffect(() => {
  //   fetch(`http://localhost:5000/bookingDate/${formattedDate}`)
  //     .then(res => res.json())
  //     .then(data => setBooking(data));
  // }, [formattedDate]);

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
          toast.success('Successfully Delivered ');
        });
    }
  };

  const handleAccept = id => {
    const updateAccept = { accept: true };
    fetch(`http://localhost:5000/bookingAccept/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updateAccept),
    })
      .then(res => res.json())
      .then(data => {
        toast.success('Accept Done ');
      });
  };
  const handleDelivery = id => {
    toast.success('Delivery Done ');
  };
  return (
    <div className="px-1">
      <h1 className="text-3xl font-semibold text-center py-5 pr-20">
        Manage All Booking
      </h1>
      {/* <div className="flex justify-center p-2">
        <input
          onChange={e => setDate(e.target.value)}
          className="text-black w-[300px] p-2 rounded-lg text-xl text-orange-700 font-semibold"
          type="date"
          name=""
          id=""
        />
      </div> */}
      <div className="overflow-x-auto">
        <table className="table  w-full text-slate-900 border-2">
          <thead>
            <tr className="text-3xl bg-slate-900 text-center">
              <th className="bg-slate-300 text-xl text-orange-700"></th>
              <th className="bg-slate-300 text-xl text-orange-700">Doctor Name</th>
              <th className="bg-slate-300 text-xl text-orange-700">Department</th>
              <th className="bg-slate-300 text-xl text-orange-700">Patient name</th>
              <th className="bg-slate-300 text-xl text-orange-700">Email</th>
              <th className="bg-slate-300 text-xl text-orange-700">Phone</th>
              <th className="bg-slate-300 text-xl text-orange-700">Date</th>
              <th className="bg-slate-300 text-xl text-orange-700">Slot</th>
              <th className="bg-slate-300 text-xl text-orange-700">Status</th>
              <th className="bg-slate-300 text-xl text-orange-700">Remove</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice().reverse().map((booking, index) => (
              <Booking
                key={booking._id}
                booking={booking}
                index={index + 1}
                handleDelete={handleDelete}
                handleAccept={handleAccept}
                handleDelivery={handleDelivery}
              ></Booking>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
