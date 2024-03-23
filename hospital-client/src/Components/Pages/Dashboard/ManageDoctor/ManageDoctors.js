import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ManageDoctor from './ManageDoctor';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigator=useNavigate()
   useEffect(() => {
     fetch(`http://localhost:5000/doctor`)
       .then(res => res.json())
       .then(data => setDoctors(data));
   }, [doctors]);
  
  const handleEdit = id => {
    navigator(`/dashboard/editDoctor/${id}`);
  }
  const handleDelete = (id) => {
       const proceed = window.confirm('Are You Sure ?');
       if (proceed) {
         const url = `http://localhost:5000/doctorDelete/${id}`;
         fetch(url, {
           method: 'DELETE',
         })
           .then(res => res.json())
           .then(data => {
             const remaining = doctors.filter(product => product._id !== id);
             setDoctors(remaining);
             toast.success('Successfully Delete');
           });
       }
  }
  return (
    <div className="mx-7">
      <div>
        <h1 className='text-3xl m-2 font-semibold text-indigo-900'> All Doctors</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table  w-full text-slate-900 border-[1px] rounded-lg">
          <thead>
            <tr className="text-3xl bg-slate-900 text-center ">
              <th className="bg-slate-300 text-[30px] text-orange-700"></th>
              <th className="bg-slate-300 text-[17px] text-orange-700">
                Doctor Name
              </th>
              <th className="bg-slate-300 text-[17px] text-orange-700">
                Department
              </th>

              <th className="bg-slate-300 text-[17px] text-orange-700">
                Email
              </th>
              <th className="bg-slate-300 text-[17px] text-orange-700">
                Phone
              </th>
              {/* <th className="bg-slate-300 text-[17px] text-orange-700">Off Days</th> */}
              <th className="bg-slate-300 text-[17px] text-orange-700">Edit</th>
              <th className="bg-slate-300 text-[17px] text-orange-700">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <ManageDoctor
                key={doctor._id}
                doctor={doctor}
                index={index + 1}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              ></ManageDoctor>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;