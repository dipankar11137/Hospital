import React from "react";
import { useNavigate } from "react-router-dom";

const AppointmentOption = ({ option, setCounseling, day }) => {
  const navigator=useNavigate()
  const { name, slots } = option;
  const modifyDay = day.toLowerCase();
  const handleDetails = id => {
    navigator(`/doctorDetails/${id}`);
  };
  return (
    <div className=" h-[425px] z-10 rounded-b-md border-[1px] border-primary hover:border-orange-600 cursor-pointer bg-base-100 shadow-xl hover:shadow-2xl">
      <div className="">
        <div className="mt-0">
          <div className="bg-white mb-4 overflow-hidden">
            {option?.img ? (
              <img
                onClick={() => handleDetails(option._id)}
                className="w-full h-56 transition-transform duration-300 transform hover:scale-150"
                src={option.img}
                alt=""
              />
            ) : (
              <img
                className="w-full h-44"
                src="https://images.assetsdelivery.com/compings_v2/indomercy/indomercy1501/indomercy150100019.jpg"
                alt=""
              />
            )}
          </div>
        </div>

        <div className="pt-3 pl-2">
          <h2 className="card-title font-bold -mt-4">{name}</h2>
          <p className="text-[10px] my-1 font-semibold text-slate-800">
            {option?.department}
          </p>
          <p className="text-[10px] my-1 font-normal">{option?.degree}</p>
        </div>

        {(modifyDay === 'friday') & option?.friday ||
        (modifyDay === 'saturday') & option?.saturday ||
        (modifyDay === 'sunday') & option?.sunday ||
        (modifyDay === 'monday') & option?.monday ||
        (modifyDay === 'tuesday') & option?.tuesday ||
        (modifyDay === 'wednesday') & option?.wednesday ||
        (modifyDay === 'thursday') & option?.thursday ? (
          <>
            <h1 className="text-center text-sm text-indigo-800 font-bold">
              This Day is Off day
            </h1>
            <h1 className="text-red-500 text-sm font-bold text-center">
              Try Another Day
            </h1>
          </>
        ) : (
          <>
            {' '}
            <p className="text-sm font-bold text-blue-600 text-center">
              {slots.length > 0 ? (
                slots[0]
              ) : (
                <span className="text-red-500">Try Another Day</span>
              )}
            </p>
            <p className="text-xs text-green-900 font-semibold text-center">
              {slots.length} {slots.length > 1 ? 'spaces' : 'space'}
            </p>
          </>
        )}

        <div className="card-actions justify-center -mb-4 mt-2">
          <label
            disabled={
              (modifyDay === 'friday') & option?.friday ||
              (modifyDay === 'saturday') & option?.saturday ||
              (modifyDay === 'sunday') & option?.sunday ||
              (modifyDay === 'monday') & option?.monday ||
              (modifyDay === 'tuesday') & option?.tuesday ||
              (modifyDay === 'wednesday') & option?.wednesday ||
              (modifyDay === 'thursday') & option?.thursday
            }
            onClick={() => setCounseling(option)}
            htmlFor="booking-modal"
            className="btn btn-primary btn-sm  text-white font-bold"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOption;
