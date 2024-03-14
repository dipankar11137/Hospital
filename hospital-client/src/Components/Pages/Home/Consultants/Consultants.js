import React, { useState } from 'react';
import { FaMinus, FaUtensilSpoon } from 'react-icons/fa';

const Consultants = () => {
  const [doctors,setDoctors]=useState([1,2,3,4])
  return (
    <div className="bg-cyan-100 px-20 py-12">
      <div className="flex items-center text-orange-600 text-xl font-semibold">
        <h1 className="mr-2">Doctors</h1>
        <FaMinus />
        <FaUtensilSpoon className="rotate-45" />
      </div>
      <div>
        <h1 className='font-semibold text-3xl mb-10 text-primary'>Our Consultants</h1>
      </div>
      <div className="grid grid-cols-4 gap-12 mt-5">
        {doctors.map(doctor => (
          <div className="text-center">
            <img
              className="h-64 w-64 rounded-full"
              src="https://www.peerlesshospital.com/images/doctor-img/dr_tanuka_das_(gupta).jpg"
              alt=""
            />
            <h1 className="text-2xl font-semibold mt-2 text-primary">
              Dr. Tanmoy Mondal
            </h1>
            <p className="text-xl uppercase">Cardiology</p>
            <button className="btn btn-sm btn-warning mt-2">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultants;