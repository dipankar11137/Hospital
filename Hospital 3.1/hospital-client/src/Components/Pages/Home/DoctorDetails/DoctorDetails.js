import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    fetch(`http://localhost:5000/doctor/${id}`)
      .then(res => res.json())
      .then(data => setDoctor(data));
  }, [doctor, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="pt-20 ">
      <div className="px-20 py-7 grid grid-cols-12">
        <div className="col-span-3 bg-cyan-800 pb-20 ">
          <div className="flex justify-center pt-3 ">
            <img
              className="w-48 h-48 rounded-full bg-white p-1"
              src={doctor?.img}
              alt={doctor?.name}
            />
          </div>
          <div className="ml-2 mt-3 ">
            <h1 className="text-2xl font-semibold text-slate-100">
              {doctor?.name}
            </h1>
            <h1 className="text-lg font-normal text-slate-100">
              {doctor?.department}
            </h1>
            <h1 className="text-xs font-normal text-slate-100">
              {doctor?.degree}
            </h1>
          </div>
          <div className="ml-2 mt-3 ">
            <h1 className="text-sm font-normal text-slate-100">
              Email : {doctor?.email}
            </h1>
            <h1 className="text-sm font-normal text-slate-100">
              Phone : {doctor?.phone}
            </h1>
          </div>
        </div>
        <div className="col-span-7 bg-cyan-700 text-slate-100 px-2 pt-3 ">
          <h1 className="text-3xl font-semibold ">About : </h1>
          <hr />
          <p>{doctor?.description}</p>
        </div>
        <div className="col-span-2 bg-cyan-700 text-slate-100 px-2 pt-3 ">
          <h1 className="text-3xl font-semibold ">Verify : </h1>
          <hr />
          <div>
            <img
              className="w-48 h-48 mt-8 bg-white p-[1px]"
              src={doctor?.imgVerify}
              alt={doctor?.name}
            />
          </div>
        </div>
      </div>

      <div className=" flex justify-end mr-20 ">
        <Link className="btn btn-primary text-white" to="/">
          <FaArrowLeft className="text-xl mr-2" /> Back To Home
        </Link>
      </div>
    </div>
  );
};

export default DoctorDetails;
