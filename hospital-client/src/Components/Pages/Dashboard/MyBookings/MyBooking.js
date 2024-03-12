import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const MyBooking = ({ booking, index, handleDelete }) => {
  const { _id, name, shipCode, terminalName, date, slot } = booking;
  const navigate = useNavigate();
  const [down, setDown] = useState(false);
  const handlePayment = id => {
    navigate(`/payment/${id}`);
  };
  return (
    <tr className="text-center">
      <th className="bg-slate-800">{index}</th>
      <td className="bg-slate-800 border-r-2">{name}</td>
      <td className="bg-slate-800 border-r-2">{shipCode}</td>
      <td className="bg-slate-800 border-r-2">{terminalName}</td>
      <td className="bg-slate-800 border-r-2">{date}</td>
      <td className="bg-slate-800 border-r-2">{slot}</td>
      {/* <td className="bg-slate-800 border-r-2">{phone}</td>
      <td className="bg-slate-800 border-r-2">{description}</td> */}
      <td className="bg-slate-800 border-r-2">
        {booking?.payment ? (
          <div className="flex justify-center">
            {' '}
            <h1 className="text-2xl font-semibold mr-4">Paid</h1>{' '}
            {/* The button to open modal */}
            <label htmlFor="my_modal_6" className="mt-1 text-2xl">
              <FaChevronDown />
            </label>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box bg-slate-900">
                <div>
                  <img
                    src="https://media.newyorker.com/photos/643d8574d73b3d81aa0e371d/master/w_2560%2Cc_limit/Kennedy_Cargo_Sailboats.gif"
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
      <td className="bg-slate-800 ">
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
