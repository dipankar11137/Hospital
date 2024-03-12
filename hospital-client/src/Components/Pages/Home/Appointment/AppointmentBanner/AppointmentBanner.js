import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ selectDate, setSelectDate }) => {
  const today = new Date();
  const disabledDates = {
    before: today,
  };

  return (
    <header>
      <div className="hero mt-16 ">
        <div className="hero-content flex-col lg:flex-row-reverse gap-x-4">
          <div className="w-[700px] overflow-hidden ">{/* <Notices /> */}</div>
          <img
            src="https://www.peerlesshospital.com/images/international-patient-home.webp"
            alt="doctor"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="mr-20 font-bold">
            {/* Pick This day */}
            <DayPicker
              mode="single"
              selected={selectDate}
              onSelect={setSelectDate}
              disabledDays={disabledDates}
              className="bg-white rounded-lg shadow p-2 "
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
    </header>
  );
};

export default AppointmentBanner;
