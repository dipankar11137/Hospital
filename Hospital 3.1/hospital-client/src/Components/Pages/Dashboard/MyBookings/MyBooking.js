

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const MyBooking = ({ booking, index, handleDelete }) => {
  const { _id, name, shipCode, terminalName, date, slot } = booking;
  const navigate = useNavigate();
  const [down, setDown] = useState(false);
  const handlePayment = id => {
    navigate(`/payment/${id}`);
  };
  console.log(booking)
  return (
    <tr className="text-center text-slate-800">
      <th className="bg-slate-300">{index}</th>
      <td className="bg-slate-300 border-r-2">
        <div className="flex items-center">
          <img className="w-14 h-14 rounded-md" src={booking?.img} alt="" />
          <h1 className="font-semibold ml-3">{booking?.doctorName}</h1>
        </div>
      </td>
      <td className="bg-slate-300 border-r-2">{booking?.department}</td>
      <td className="bg-slate-300 border-r-2">{booking?.appointmentDate}</td>
      <td className="bg-slate-300 border-r-2">{booking?.slot}</td>
      <td className="bg-slate-300 border-r-2">
        {booking?.nextDate} Days Later
      </td>

      {/* <td className="bg-slate-300 border-r-2">{phone}</td>
      <td className="bg-slate-300 border-r-2">{description}</td> */}
      <td className="bg-slate-300 border-r-2">
        {booking.payment ? (
          <div className="flex justify-center">
            <h1 className="text-2xl font-semibold mr-4">Paid</h1>{' '}
            {/* The button to open modal */}
            <label
              htmlFor="my_modal_6"
              className="mt-1 text-2xl flex items-center"
            >
              <FaChevronDown className="text-lg cursor-pointer" />
            </label>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box bg-white">
                <div>
                  <img
                    src="https://img.freepik.com/free-vector/thank-you-placard-concept-illustration_114360-13436.jpg"
                    alt=""
                  />
                </div>
                <div className="modal-action">
                  <label htmlFor="my_modal_6" className="btn">
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => handlePayment(_id)}
            className="bg-lime-600 px-3 py-1 rounded-md uppercase text-white font-semibold hover:bg-lime-500"
          >
            Payment
          </button>
        )}
      </td>
      <td className="bg-slate-300  border-r-2">
        {booking.accept ? (
          <h1 className="text-lg text-green-800 font-semibold">Accepted</h1>
        ) : (
          <h1 className="text-lg text-orange-700 font-semibold">Pay First</h1>
        )}
      </td>
      <td className="bg-slate-300  border-r-2">
        {booking.complete ? (
          <h1 className="text-lg text-green-800 font-semibold">Complete</h1>
        ) : (
          <h1 className="text-lg text-orange-700 font-semibold">Processing</h1>
        )}
      </td>

      <td className="bg-slate-300 ">
        <button
          onClick={() => handleDelete(_id)}
          className="bg-orange-600 px-3 py-1 rounded-md uppercase text-white font-semibold hover:bg-orange-500"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default MyBooking;
