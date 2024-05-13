import React from 'react';
import Footer from '../../Share/Footer';

const Contact = () => {
  return (
    <div>
      <div className="pt-20 pl-10 pb-20 text-indigo-900">
        <h1 className="text-4xl font-semibold uppercase">Contact us</h1>

        <div>
          <h1 className="text-3xl mt-10 font-semibold">Address</h1>
          <p className="mt-2 text-2xl  text-rose-800 ">
            Alok Hospital, Dhanmondi 14/A, Dhaka-1209, Dhaka, Bangladesh
            Dhaka-1000
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Mobile</h1>
          <p className="mt-2 text-2xl  text-indigo-800 ">
            Shovon <span className="text-red-700 ml-5">(+8801754125846)</span>
          </p>
          <p className="mt-2 text-2xl  text-indigo-800 ">
            Abbus Uddin{' '}
            <span className="text-red-700 ml-5">(+8801754125846)</span>
          </p>
          <p className="mt-2 text-2xl  text-indigo-800 ">
            Asif Hossion{' '}
            <span className="text-red-700 ml-5">(+8801754125846)</span>
          </p>
          <p className="mt-2 text-2xl  text-indigo-800 ">
            Shovon Saha{' '}
            <span className="text-red-700 ml-5">(+8801754125846)</span>
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Facebook</h1>
          <p className="mt-2 text-2xl  text-rose-800 cursor-pointer">
            Alok Hospital
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Address</h1>
          <p className="mt-2 text-2xl  text-rose-800 cursor-pointer">
            Alok Hospital
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Address</h1>
          <p className="mt-2 text-2xl  text-rose-800 cursor-pointer">
            alokhospital@gmail.com
          </p>
        </div>
        <div>
          <h1 className="text-3xl mt-10 font-semibold">Address</h1>
          <p className="mt-2 text-2xl  text-rose-800 cursor-pointer">
            Alok Hospital
          </p>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Contact;