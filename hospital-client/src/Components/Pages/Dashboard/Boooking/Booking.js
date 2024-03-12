import React from "react";

const Booking = ({
  booking,
  index,
  handleDelete,
  handleAccept,
  handleDelivery,
}) => {
  const { _id, name, shipCode, terminalName, date, slot, phone, description } =
    booking;

  return (
    <tr className="text-center">
      <th className="bg-slate-800">{index}</th>
      <td className="bg-slate-800 ">{name}</td>
      <td className="bg-slate-800 ">{shipCode}</td>
      <td className="bg-slate-800 ">{terminalName}</td>
      <td className="bg-slate-800 ">{date}</td>
      <td className="bg-slate-800 ">{slot}</td>
      <td className="bg-slate-800 ">{phone}</td>
      <td className="bg-slate-800 ">{description}</td>
      <td className="bg-slate-800 ">
        {booking?.payment ? (
          <>
            {booking?.accept ? (
              <h1 className="text-2xl text-green-300 font-bold">Accept</h1>
            ) : (
              <button
                onClick={() => handleAccept(_id)}
                className="bg-lime-600 px-3 py-1 rounded-md uppercase text-white font-semibold hover:bg-lime-700"
              >
                Accept
              </button>
            )}
          </>
        ) : (
          <h1 className="text-xl font-semibold">Unpaid</h1>
        )}
      </td>
      <td className="bg-slate-800 ">
        {booking?.payment ? (
          <>
            {booking?.accept ? (
              <button
                onClick={() => handleDelivery(_id)}
                className="btn btn-sm btn-primary  rounded-md uppercase text-white font-semibold "
              >
                Done
              </button>
            ) : (
              <h1 className="text-xl text-orange-400 font-semibold">
                Wait Accept
              </h1>
            )}
          </>
        ) : (
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-sm rounded-md uppercase text-white font-semibold  "
          >
            Remove
          </button>
        )}
      </td>
    </tr>
  );
};

export default Booking;
