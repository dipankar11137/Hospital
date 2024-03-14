import React from 'react';
import { FaMinus, FaUtensilSpoon } from 'react-icons/fa';

const SImpleProcess = () => {
  return (
    <div className="mt-10 mx-10">
      <div className="flex items-center text-orange-600 text-lg font-semibold">
        <h1 className="mr-2">Simple Process</h1>
        <FaMinus />
        <FaUtensilSpoon className="rotate-45" />
      </div>

      <h1 className="my-3 mb-5 text-3xl font-semibold uppercase text-primary">
        Helping You Stay Strong
      </h1>

      <div className="flex gap-10">
        <div className="flex gap-10">
          <div>
            <div className="relative">
              <img
                className="h-44"
                src="https://www.peerlesshospital.com/images/appointment-1.webp"
                alt=""
              />
              <h1 className="absolute z-30 bg-yellow-500 -top-3 left-[145px] px-3 py-1 rounded-full font-semibold text-white text-xl">
                1
              </h1>
            </div>
            <h1 className="my-1 font-semibold text-center text-lg text-primary cursor-pointer">
              Online Appointment
            </h1>
            <p className="text-center">
              Access healthcare <br /> easily with our online <br /> booking.
            </p>
          </div>
          <div>
            <div className="relative">
              <img
                className="h-44"
                src="https://www.peerlesshospital.com/images/tekeconsult-1.webp"
                alt=""
              />
              <h1 className="absolute z-30 bg-yellow-500 -top-3 left-[145px] px-3 py-1 rounded-full font-semibold text-white text-xl">
                2
              </h1>
            </div>
            <h1 className="my-1 text-lg font-semibold text-center text-primary cursor-pointer">
              Teleconsultation
            </h1>
            <p className="text-center">
              Consult securely with
              <br /> our healthcare
              <br /> experts online.
            </p>
          </div>
          <div>
            <div className="relative">
              <img
                className="h-44"
                src="https://www.peerlesshospital.com/images/payment-1.webp"
                alt=""
              />
              <h1 className="absolute z-30 bg-yellow-500 -top-3 left-[145px] px-3 py-1 rounded-full font-semibold text-white text-xl">
                3
              </h1>
            </div>
            <h1 className="my-1 text-lg font-semibold text-center text-primary cursor-pointer">
              Online Payment
            </h1>
            <p className="text-center">
              Simplify healthcare <br /> with online payments.
            </p>
          </div>
          <div>
            <div className="relative">
              <img
                className="h-44"
                src="https://www.peerlesshospital.com/images/reports-1.webp"
                alt=""
              />
              <h1 className="absolute z-30 bg-yellow-500 -top-3 left-[145px] px-3 py-1 rounded-full font-semibold text-white text-xl">
                4
              </h1>
            </div>
            <h1 className="my-1 text-lg font-semibold text-center text-primary cursor-pointer">
              Reports Download
            </h1>
            <p className="text-center">
              Get your investigation <br /> reports with just one <br /> click.
            </p>
          </div>
        </div>
        <div>
          <img
            className="shadow-inner"
            src="https://i.guim.co.uk/img/media/65f5c7ce6fc84523e4573e97ad3a63978af4a828/549_471_2376_1426/master/2376.jpg?width=465&dpr=1&s=none"
            alt=""
          />
        </div>
      </div>
      <div>
        <img
          src="https://www.peerlesshospital.com/images/about-img.webp"
          alt=""
        />
      </div>
    </div>
  );
};

export default SImpleProcess;