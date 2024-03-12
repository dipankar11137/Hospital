import React from "react";
import "../../../../CSS/Button.css";
import "../../../../CSS/PicStyle.css";

const AppointmentOption = ({ option, setCounseling }) => {
  const { name, slots } = option;

  return (
    <div
      style={{
        boxShadow: '4px 4px 3px #5A52E6',
      }}
      className="card  bg-base-100 shadow-lg text-black hover:bg-red-100"
    >
      <div
        // style={{ marginTop: "-145px" }}
        className="w-full   rounded-lg cursor-pointer "
      >
        {option?.img ? (
          <img className="rounded-lg pic-style h-52" src={option?.img} alt="" />
        ) : (
          <img
            className="rounded-lg pic-style"
            src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-141628,resizemode-1,msid-87023044/news/economy/infrastructure/govt-to-spend-around-rs-50000-cr-to-create-500-multi-modal-cargo-terminals-in-4-5-yrs.jpg"
            alt=""
          />
        )}
      </div>

      <div className="p-4">
        <div>
          <h2 className="card-title font-bold">{name}</h2>
          <p className="text-[10px] my-1 font-semibold">MBBS FCPS USA</p>
        </div>
          <h1 className="text-center font-bold text-lg text-orange-600">(Cardiologist)</h1>

        <p className="  text-blue-600 text-center">
          {slots.length > 0 ? (
            slots[0]
          ) : (
            <span className="text-red-500">Try Another Day</span>
          )}
        </p>
        <p className=" text-green-800 font-semibold text-center">
          {slots.length}{' '}
          {slots.length > 1 ? 'spaces available' : 'space available'}
        </p>
        <div className="card-actions justify-center">
          <label
            disabled={slots.length === 0}
            onClick={() => setCounseling(option)}
            htmlFor="booking-modal"
            className="button1 btn btn-sm btn-primary   text-white font-bold mt-3 "
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
