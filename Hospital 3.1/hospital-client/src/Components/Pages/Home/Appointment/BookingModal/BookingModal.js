

import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../../../../firebase.init";

const BookingModal = ({ counseling, selectDate, setCounseling, refetch }) => {
  const date = format(selectDate, "PP");
  const { name, slots,department,img } = counseling;
  const [user] = useAuthState(auth);
  // console.log(user?.email);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const slot = form.slot.value;
    const problem = form.problem.value;
    const patientName = form.patientName.value;
    const address = form.address.value;
    const phone = form.phone.value;

    const booking = {
      appointmentDate: date,
      slot,
      doctorName: name,
      patientName,
      address,
      department,
      phone,
      email:user?.email,
      problem,
      img
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
            className="btn btn-sm btn-circle btn-secondary text-white absolute right-0 top-0"
          >
            ✕
          </label>
          <div className="flex justify-between ">
            <h3 className="text-2xl font-semibold pl-1">{name}</h3>
            <h3 className="mr-5">{date}</h3>
          </div>
          <form className="text-black" onSubmit={handleBooking}>
            <div className="text-black">
              <select name="slot" className="select select-bordered mt-3 w-full text-black ">
                {slots.map((slot, i) => (
                  <option value={slot} key={i}>
                    <span className="text-black "> {slot}</span>
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="problem"
              type="Text"
              placeholder="Your Problems"
              className="input input-bordered input-primary pt-1 h-20 w-full  mt-2"
            />
            <input
              name="patientName"
              type="name"
              placeholder="You Name"
              className="input input-bordered input-primary w-full  mt-2"
            />
            <input
              name="phone"
              type="number"
              placeholder="You phone number"
              className="input input-bordered input-primary w-full  mt-2"
            />
            <textarea
              name="address"
              type="Text"
              placeholder="Your Address"
              className="input input-bordered input-primary pt-1 h-20 w-full  mt-2"
            />

            <input
              className="w-full mt-5 btn btn-primary text-white"
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
