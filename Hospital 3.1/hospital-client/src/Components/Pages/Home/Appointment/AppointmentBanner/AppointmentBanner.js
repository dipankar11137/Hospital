import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ selectDate, setSelectDate }) => {
  const today = new Date();
  const [showDate,setShowDate]=useState(false)
  const disabledDates = {
    before: today,
  };

  return (
    <div className="pt-[67px]">
      <div className="">
        <div className="related relative">
          <div className="absolute top-0 left-0 z-10  h-[230px] px-24 py-20 text-slate-50 bg-gradient-to-r from-primary  to-accent shadow-inner">
            <h1 className="text-4xl font-semibold pr-20">Our Doctors</h1>
            <h1 className="text-xl">
              Home <span className="text-lg">/</span> Our Doctors
            </h1>
          </div>
          <div>
            <img
              src="https://www.peerlesshospital.com/images/departments/banner-doctor.webp"
              alt=""
              className="relative z-0 "
            />
          </div>
        </div>
        {/* change date */}
        <div className="flex justify-end mt-48 ">
          <label
            htmlFor="my_modal_7"
            className="btn btn-sm text-white btn-accent mr-20"
          >
            Change Date
          </label>
        </div>

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="hero  ">
            <div className="hero-content flex-col lg:flex-row-reverse gap-x-4">
              <div className="mr-20 font-bold">
                <div className="">
                  <label
                    htmlFor="my_modal_7"
                    className="modal-backdrop   text-xl font-semibold text-white  fixed ml-[290px] bg-red-600  px-[9px] py-[3px]  rounded-full cursor-pointer"
                  >
                    ✕
                  </label>
                </div>

                {/* Pick This day */}
                <DayPicker
                  mode="single"
                  selected={selectDate}
                  onSelect={setSelectDate}
                  disabledDays={disabledDates}
                  className="bg-cyan-200  rounded-lg shadow p-2 "
                  inputProps={{ className: 'w-full rounded-lg ' }}
                  classNames={{
                    container: 'relative',
                    overlay: 'fixed inset-0 bg-black opacity-50',
                    month: 'text-center font-semibold  ',
                    weekdays: 'flex justify-center border-b ',
                    weekdaysRow: 'text-xs',
                    weekday: ' py-0',
                    body: ' text-center',
                    day: 'w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200',
                    today: 'bg-blue-500 text-white',
                    selected: 'bg-blue-200',
                    disabled: 'text-gray-400 cursor-not-allowed',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
