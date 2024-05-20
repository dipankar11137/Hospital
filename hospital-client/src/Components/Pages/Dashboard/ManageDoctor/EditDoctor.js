import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditDoctor = () => {
  const [doctor, setDoctor] = useState({});

  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState('');
    const [saturday, setSaturday] = useState(false);
    const [sunday, setSunday] = useState(false);
    const [monday, setMonday] = useState(false);
    const [tuesday, setTuesday] = useState(false);
    const [wednesday, setWednesday] = useState(false);
    const [thursday, setThursday] = useState(false);
    const [friday, setFriday] = useState(false);
  const navigator=useNavigate()
   const { id } = useParams();
   useEffect(() => {
     fetch(`http://localhost:5000/doctor/${id}`)
       .then(res => res.json())
       .then(data => setDoctor(data));
   }, [doctor, id]);
  
useEffect(() => {
  const timer = setTimeout(() => {
    setSaturday(doctor.saturday ? true : false);
    setSunday(doctor.sunday ? true : false);
    setMonday(doctor.monday ? true : false);
    setTuesday(doctor.tuesday ? true : false);
    setWednesday(doctor.wednesday ? true : false);
    setThursday(doctor.thursday ? true : false);
    setFriday(doctor.friday ? true : false);
  }, 3000);

  // Cleanup function to clear the timeout
  return () => clearTimeout(timer);
}, [id]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [arrays, setArrays] = useState([]);
  const [value, setValue] = useState('');
  const [slotCount, setSlotCount] = useState(8);

  useEffect(() => {
    handleChange({ target: { value: 8 } });
  }, []);

  const handleChange = e => {
    const value = parseInt(e.target.value); // Parse the input value to an integer
    setSlotCount(value);
    const newArray = Array.from({ length: value }, (_, index) => index + 1); // Create an array containing numbers from
    setValue(value);
    setArrays(newArray);
  };


  const onSubmit = data => {
    const slots = [];
    for (let i = 1; i <= value; i++) {
      slots.push(data[`slot${i}`]);
    }
    const updateDoctor = {
      saturday:saturday||doctor.saturday,
      sunday:sunday||doctor.sunday,
      monday:monday||doctor.monday,
      tuesday:tuesday||doctor.tuesday,
      wednesday:wednesday||doctor.wednesday,
      thursday:thursday||doctor.thursday,
      friday:friday||doctor.friday,
      name: data.name || doctor.name,
      email: data.email || doctor.email,
      phone: data.phone || doctor.phone,
      degree: data.degree || doctor.degree,
      description: data.description || doctor.description,
      img: data.img || doctor.img,
      imgVerify: data.imgVerify || doctor.imgVerify,
      department: department || doctor.department,
      slots:doctor.slots||slots
    };
  
      fetch(`http://localhost:5000/updateDoctor/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(updateDoctor),
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          toast.success('Update Successful');

          navigator('/dashboard/manageDoctor');
        });
   }
  return (
    <div>
      <div className="m-5 rounded-lg bg-indigo-200">
        <h1 className="text-xl ml-2 font-semibold py-2 text-orange-800">
          Edit Now
        </h1>
        <form
          className=" gap-4 bg-indigo-100 p-4 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* 1st colum */}
            <div className="col-span-3">
              {/* name */}
              <div className="mb-2">
                <label className="label">
                  <span className="label-text text-xl font-semibold ">
                    Doctor Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={
                    doctor?.name ? doctor?.name : 'Enter Doctor Name'
                  }
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                  {...register('name', {})}
                />
              </div>
              {/* email */}
              <div className="mb-2">
                <input
                  type="email"
                  placeholder={
                    doctor?.email ? doctor?.email : 'Enter Doctor Email'
                  }
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                  {...register('email', {})}
                />
              </div>
              {/* phone */}
              <div>
                <input
                  type="phone"
                  placeholder={
                    doctor?.phone ? doctor?.phone : 'Doctor Phone Number'
                  }
                  className="input input-bordered bg-white text-black font-normal lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                  {...register('phone', {})}
                />
              </div>
              {/* degree */}
              <div className="my-2">
                <input
                  type="text"
                  placeholder={doctor?.degree ? doctor?.degree : 'Degree name'}
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                  {...register('degree', {})}
                />
              </div>
              {/* description */}
              <div>
                <textarea
                  type="text"
                  placeholder={
                    doctor?.description ? doctor?.description : 'About Doctor'
                  }
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[60px] "
                  {...register('description', {})}
                />
              </div>
              {/* department */}
              <div>
                <select
                  onClick={e => setDepartment(e.target.value)}
                  className="select select-info w-full max-w-xs h-[35px]"
                >
                  <option disabled selected>
                    Select Department
                  </option>
                  <option>Cardiology</option>
                  <option>Neurologist</option>
                  <option>Gastroenterology</option>
                  <option>Oncologists</option>
                  <option>Pediatrician</option>
                  <option>Dermatologist</option>
                  <option>Nephrology</option>
                  <option>Endocrinologist</option>
                  <option>Physicians</option>
                  <option>Ophthalmology</option>
                  <option>Radiologists</option>
                  <option>Epidemiologist</option>
                  <option>Orthopedics</option>
                  <option>Allergist</option>
                  <option>Internist</option>
                  <option>Anesthesiology</option>
                  <option>Hematologist</option>
                  <option>Dental</option>
                  <option>Pathology</option>
                  <option>Pulmonologists</option>
                  <option>ENT</option>
                  <option>Rheumatologists</option>
                  <option>Emergency Medicine</option>
                </select>
              </div>
            </div>
            {/* off days */}
            <div className="col-span-3 ">
              <h1 className="text-3xl font-semibold mb-3 text-red-700">
                Off Days
              </h1>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={saturday}
                  onChange={e => setSaturday(e.target.checked)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />

                <h1 className="text-xl  font-semibold text-indigo-900">
                  Saturday
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={sunday}
                  onChange={e => setSunday(e.target.checked)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />
                <h1 className="text-xl  font-semibold text-indigo-900">
                  Sunday
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={monday}
                  onChange={e => setMonday(e.target.checked)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />
                <h1 className="text-xl  font-semibold text-indigo-900">
                  Monday
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={tuesday}
                  onChange={e => setTuesday(e.target.checked)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />
                <h1 className="text-xl  font-semibold text-indigo-900">
                  Tuesday
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={wednesday}
                  onChange={e => setWednesday(e.target.checked)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />
                <h1 className="text-xl  font-semibold text-indigo-900">
                  Wednesday
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={thursday}
                  onChange={e => setThursday(e.target.checked)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />
                <h1 className="text-xl  font-semibold text-indigo-900">
                  Thursday
                </h1>
              </div>
              <div className="flex items-center gap-3 mb-12">
                <input
                  type="checkbox"
                  checked={friday}
                  onChange={e => setFriday(e.target.checked)}
                  className="checkbox checkbox-secondary checkbox-sm"
                />
                <h1 className="text-xl  font-semibold text-indigo-900">
                  Friday
                </h1>
              </div>
              {/* img */}
              <div>
                {/* image */}
                <label className="label">
                  <span className="label-text text-xl font-semibold ">
                    Input Doctor Image{' '}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={doctor?.img ? doctor?.img : 'Enter Doctor Email'}
                  className="input input-bordered text-black lg:w-72 sm:w-full max-w-xs  hover:shadow-xl shadow-inner h-[40px]"
                  {...register('img', {})}
                />
              </div>
              {/* img verify */}
              <div>
                {/* image */}
                <label className="label">
                  <span className="label-text text-xl font-semibold ">
                    Doctor Verify{' '}
                  </span>
                </label>
                <input
                  type="text"
                  placeholder={
                    doctor?.imgVerify
                      ? doctor?.imgVerify
                      : 'Enter Doctor Verify '
                  }
                  className="input input-bordered text-black lg:w-72 sm:w-full max-w-xs  hover:shadow-xl shadow-inner h-[40px]"
                  {...register('imgVerify', {})}
                />
              </div>
            </div>
            {/* slots */}
            <div className="col-span-6 ">
              <div>
                <h1 className="text-center  text-3xl font-semibold">Slots</h1>
              </div>
              <div className="flex justify-end">
                <input
                  placeholder="Input Slot Number"
                  type="number"
                  // value={slotCount}
                  onChange={handleChange}
                  className="input input-bordered bg-white mb-2  text-black max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                />
              </div>

              <div className="grid grid-cols-2 w-full">
                {arrays.map((array, index) => (
                  <div>
                    <input
                      type="text"
                      placeholder="00.00 AM - 00.00 AM"
                      className="input input-bordered bg-white mb-2  text-black max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                      {...register(`slot${index + 1}`, {})}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <h1 className="btn btn-primary mt-5 w-full cursor-not-allowed text-white">
              Loading ...
            </h1>
          ) : (
            <input
              className="btn btn-primary mt-5 w-full  text-white"
              type="submit"
              value="Update"
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default EditDoctor;