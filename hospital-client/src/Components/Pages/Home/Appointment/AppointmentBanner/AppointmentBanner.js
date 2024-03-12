import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = ({ selectDate, setSelectDate }) => {
  const [open,setOpen]=useState(false)
  return (
    <div>
      <div className="flex justify-end">
        <h1 className="text-black text-center text-2xl mt-20 mr-16 font-bold ">
          <button onClick={() => setOpen(prevState => !prevState)}>
            Click 
          </button>{' '}
          Select Your Date
        </h1>
      </div>
      {open && (
        <div className="hero mt-8 ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div
              style={{
                boxShadow: '5px 5px 10px blue',
                height: '200px',
                width: '200px',
              }}
              className="mr-10 p-0 bg-white text-black rounded-2xl"
            >
              {/* Pick This day */}
              <DayPicker
                className="text-[10px] font-semibold p-0"
                mode="single"
                selected={selectDate}
                onSelect={setSelectDate}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentBanner;
