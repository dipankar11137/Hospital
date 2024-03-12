import { format } from "date-fns";
import React from "react";
import { toast } from "react-toastify";

const BookingModal = ({ counseling, selectDate, setCounseling, refetch }) => {
  const date = format(selectDate, "PP");
  const { name, slots } = counseling;
  // const [user] = User();

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const problem = form.problem.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      slot,
      teacherName: name,
      // studentName: user?.name,
      // studentID: user?.iId,
      // studentsEmail: user?.email,
      // email: counseling?.email,
      // phone: phone || user?.phone,
      // studentImg: user?.image,
      problem,
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.acknowledged) {
          setCounseling(null);
          toast.success("Booking Confirmed");
          refetch();
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-2xl font-semibold pl-1">{name}</h3>
          <form onSubmit={handleBooking}>
            <input
              type="text"
              value={date}
              placeholder="Type here"
              className="input input-bordered input-primary w-full  mt-6"
            />
            <select
              name="slot"
              className="select select-bordered select-primary mt-3 w-full "
            >
              {slots.map((slot, i) => (
                <option value={slot} key={i}>
                  {slot}
                </option>
              ))}
            </select>

            <textarea
              name="problem"
              type="Text"
              placeholder="Your Problems"
              className="input input-bordered input-primary pt-1 h-20 w-full  mt-2"
            />
            <input
              name="phone"
              type="phone"
              placeholder="You phone number"
              className="input input-bordered input-primary w-full  mt-2"
            />

            <input className="w-full mt-5 btn " type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
