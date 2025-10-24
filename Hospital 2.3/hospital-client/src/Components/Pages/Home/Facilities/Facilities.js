import React from 'react';
import { FaMinus, FaUtensilSpoon } from 'react-icons/fa';

const Facilities = () => {
  return (
    <div className="p-20">
      <div className="grid grid-cols-2 gap-10 items-center">
        <div>
          <img
            src="https://www.peerlesshospital.com/images/international-patient-home.webp"
            alt=""
          />
        </div>
        <div>
          <div className="flex items-center text-orange-600 text-xl font-semibold">
            <h1 className="mr-2">International Patient</h1>
            <FaMinus />
            <FaUtensilSpoon className="rotate-45" />
          </div>
          <div>
            <h1 className="text-3xl text-primary font-semibold">
              Facilities for International <br /> Patients
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-10 mt-4">
            <div className="bg-gradient-to-r from-red-50 to-rose-200 p-4 rounded-md flex gap-3 shadow-lg">
              <img
                src="https://www.peerlesshospital.com/images/checkup-icn.webp"
                alt=""
              />
              <h1 className="text-red-700 text-2xl font-semibold">
                Health Check-up Packages
              </h1>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-rose-200 p-4 rounded-md flex gap-3 items-center shadow-lg">
              <img
                className="h-8"
                src="https://www.peerlesshospital.com/images/pickup-dropicn.webp"
                alt=""
              />
              <h1 className="text-red-700 text-2xl font-semibold">
                Airport Pick Up and Drop
              </h1>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-rose-200 p-4 rounded-md flex gap-3 shadow-lg">
              <img
                className="h-12"
                src="https://www.peerlesshospital.com/images/traveldesk.webp"
                alt=""
              />
              <h1 className="text-red-700 text-2xl font-semibold">
                Travel Desk / Visa Assistance
              </h1>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-rose-200 p-4 rounded-md flex gap-3 shadow-lg">
              <img
                src="https://www.peerlesshospital.com/images/relationshi-managers.webp"
                alt=""
              />
              <h1 className="text-red-700 text-2xl font-semibold">
                Dedicated Relationship
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;