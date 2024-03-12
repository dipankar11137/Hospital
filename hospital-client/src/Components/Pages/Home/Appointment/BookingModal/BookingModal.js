import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../../../firebase.init";

const BookingModal = ({ counseling, selectDate, setCounseling, refetch }) => {
  const [authUser] = useAuthState(auth);
  const email = authUser?.email;
  const date = format(selectDate, "PP");
  const { name, slots } = counseling;
  const [ship, setShip] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/user/${email}`)
      .then((res) => res.json())
      .then((data) => setShip(data));
  }, [email]);

  // console.log(ship[0]);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const description = form.description.value;
    const phone = form.phone.value;

    // console.log(slot, description, phone);
    const booking = {
      terminalName: name,
      date,
      slot,
      description,
      phone: phone || ship[0]?.phone,
      name: ship[0]?.name,
      img: ship[0]?.img,
      email,
      shipCode: ship[0]?.shipCode,
    };
    // console.log(booking);

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
          toast.success(
            `${ship[0]?.name} ship Booking Confirmed Slots ${slot}`
          );
          refetch();
        }
      });
  };

  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal text-black">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
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
              name="description"
              type="Text"
              placeholder="Your Description"
              className="input input-bordered input-primary pt-1 h-20 w-full  mt-2"
            />
            <input
              name="phone"
              type="phone"
              placeholder="You phone number"
              className="input input-bordered input-primary w-full  mt-2"
            />

            <input
              className="w-full mt-5 btn btn-primary"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
