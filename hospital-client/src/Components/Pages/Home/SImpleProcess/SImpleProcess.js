import React from 'react';

const SImpleProcess = () => {
  return (
    <div className="mt-10 mx-20">
      <h1>Simple Process</h1>
      <h1 className="my-3 text-3xl font- text-primary">
        Helping You Stay Strong
      </h1>

      <div>
        <div>
          <div className="relative">
            <img
              className="h-40"
              src="https://www.peerlesshospital.com/images/appointment-1.webp"
              alt=""
            />
            <h1 className="absolute z-50 bg-yellow-500 -top-3 left-[135px] px-3 py-1 rounded-full font-semibold text-white text-xl">1</h1>
          </div>
          <h1 className="my-2 text-lg text-primary cursor-pointer">
            Online Appointment
          </h1>
          <p>
            {' '}
            Access healthcare easily <br /> with our online booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SImpleProcess;