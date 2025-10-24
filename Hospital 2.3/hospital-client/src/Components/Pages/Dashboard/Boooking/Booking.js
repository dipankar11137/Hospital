import React from "react";

const Booking = ({
  booking,
  index,
  handleDelete,
  handleAccept,
  handleDelivery,
}) => {
 

  return (
    <tr className="text-center">
      <th className="">{index}</th>
      <td className=" ">{booking?.doctorName}</td>
      <td className=" ">{booking?.department}</td>
      <td className=" ">{booking?.patientName}</td>
      <td className=" ">{booking?.email}</td>
      <td className=" ">{booking?.phone}</td>
      <td className=" ">{booking?.appointmentDate}</td>
      <td className=" ">{booking?.slot}</td>
      <td className=" ">
        {booking?.payment ? (
          <>
            {booking?.accept ? (
              <h1 className="text-2xl text-green-600 font-bold">Accept</h1>
            ) : (
              <button
                onClick={() => handleAccept(booking?._id)}
                className="bg-lime-700 px-3 py-1 rounded-md uppercase  font-semibold hover:bg-lime-700"
              >
                Accept
              </button>
            )}
          </>
        ) : (
          <h1 className="text-xl font-semibold">Unpaid</h1>
        )}
      </td>
      <td className=" ">
        {booking?.payment ? (
          <>
            {booking?.accept ? (
              <button
                onClick={() => handleDelivery(booking?._id)}
                className="text-primary  rounded-md uppercase font-semibold "
              >
               Conform
              </button>
            ) : (
              <h1 className="text-xl text-orange-400 font-semibold">
                Wait Accept
              </h1>
            )}
          </>
        ) : (
          <button
            onClick={() => handleDelete(booking?._id)}
            className="btn btn-xs rounded-md uppercase text-white font-semibold  "
          >
            Remove
          </button>
        )}
      </td>
    </tr>
  );
};

export default Booking;
