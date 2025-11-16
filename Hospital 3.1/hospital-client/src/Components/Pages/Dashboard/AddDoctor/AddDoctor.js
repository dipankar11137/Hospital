import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddDoctor = () => {
  const imageHostKey = 'c70a5fc10619997bd7315f2bf28d0f3e';
  
const [loading,setLoading]=useState(false)
  const [department, setDepartment] = useState('')
  const [saturday,setSaturday]=useState(false)
  const [sunday,setSunday]=useState(false)
  const [monday,setMonday]=useState(false)
  const [tuesday,setTuesday]=useState(false)
  const [wednesday,setWednesday]=useState(false)
  const [thursday,setThursday]=useState(false)
  const [friday, setFriday] = useState(false)

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
     setValue(value)
     setArrays(newArray);
     
 
   };

    const onSubmit = async data => {
      setLoading(true);
      try {
        const image2 = data.image[0];
        const image1 = data.image1[0];

        const formData = new FormData();
        formData.append('image', image1);

        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
        const response1 = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        const imageData1 = await response1.json();
        const img1 = imageData1.data.url;

        formData.delete('image'); // Remove the previous image
        formData.append('image', image2);

        const response2 = await fetch(url, {
          method: 'POST',
          body: formData,
        });

        const imageData2 = await response2.json();
        const img2 = imageData2.data.url;

        const slots = [];
        for (let i = 1; i <= value; i++) {
          slots.push(data[`slot${i}`]);
        }
        const changeUrl = {
          name: data.name,
          degree: data.degree,
          email: data.email,
          phone: data.phone,
          description: data.description,
          img: img1,
          imgVerify: img2,
          department,
          saturday,
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
          slots,
        };

        console.log(changeUrl);

        const serverResponse = await fetch(
          'http://localhost:5000/appointments2',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(changeUrl),
          }
        );

        const serverData = await serverResponse.json();
        setLoading(false);
        setLoading(false);
        toast.success('Successfully Add This ');
       reset();

      } catch (error) {
        // Handle error
        // console.error('Error uploading images:', error);
      }
    };
  

  // const onSubmit = data => {
  //     setLoading(true)
     
  //     const image = data.image[0];

  //     const formData = new FormData();
  //     formData.append('image', image);
  //     const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
  //     fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //     })
  //       .then(res => res.json())
  //       .then(imageData => {
  //         const image = imageData.data.url;
  //         const slots = [];
  //         for (let i = 1; i <= value; i++) {
  //           slots.push(data[`slot${i}`]);
  //         }
  //         const changeUrl = {
  //           name: data.name,
  //           degree: data.degree,
  //           email: data.email,
  //           phone: data.phone,
  //           description:data.description,
  //           img: image,
  //           department,
  //           saturday,
  //           sunday,
  //           monday,
  //           tuesday,
  //           wednesday,
  //           thursday,
  //           friday,
  //           slots,
  //         };
  //         // console.log(changeUrl);

  //         fetch(`http://localhost:5000/appointments`, {
  //           method: 'POST',
  //           headers: {
  //             'content-type': 'application/json',
  //           },
  //           body: JSON.stringify(changeUrl),
  //         })
  //           .then(res => res.json())
  //           .then(data => {
  //             setLoading(false)
  //             toast.success('Successfully Add This ');
  //             reset();
  //           });
  //       });
  //   };
  return (
    <div className="mx-5">
      <h1 className="text-4xl my-1 text-center font-semibold text-primary">
        Add Doctor
      </h1>
      <div>
        <form
          className=" gap-4 bg-indigo-100 p-4 rounded-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* 1st colum */}
            <div className="col-span-3">
              {/* name */}
              <div>
                <label className="label">
                  <span className="label-text text-xl font-semibold ">
                    Doctor Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Doctor name"
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Name is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors?.name?.message}
                    </span>
                  )}
                </label>
              </div>
              {/* email */}
              <div>
                <input
                  type="email"
                  placeholder="Doctor Email"
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'Email is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.email?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors?.email?.message}
                    </span>
                  )}
                </label>
              </div>
              {/* phone */}
              <div>
                <input
                  type="phone"
                  placeholder="Doctor Phone Number"
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                  {...register('phone', {
                    required: {
                      value: true,
                      message: 'Phone is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.phone?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors?.phone?.message}
                    </span>
                  )}
                </label>
              </div>
              {/* degree */}
              <div>
                <input
                  type="text"
                  placeholder="Degree name"
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[35px]"
                  {...register('degree', {
                    required: {
                      value: true,
                      message: 'Degree is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.degree?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors?.degree?.message}
                    </span>
                  )}
                </label>
              </div>
              {/* description */}
              <div>
                <textarea
                  type="text"
                  placeholder="About Doctor"
                  className="input input-bordered bg-white text-black lg:w-72 sm:w-full max-w-xs hover:shadow-xl shadow-inner border-blue-900 h-[60px] "
                  {...register('description', {
                    required: {
                      value: true,
                      message: 'About Doctor is Required',
                    },
                  })}
                />
                <label className="label">
                  {errors.description?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors?.description?.message}
                    </span>
                  )}
                </label>
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
              <div className="flex items-center gap-3 mb-2">
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
                  <span className="label-text  font-semibold py-0">
                    Input Doctor Image{' '}
                  </span>
                </label>
                <input
                  type="file"
                  className="input input-bordered text-black lg:w-72 sm:w-full max-w-xs pt-1 mt-0   hover:shadow-xl shadow-inner h-[40px]"
                  {...register('image1', {
                    required: {
                      value: true,
                      message: 'Image is Required',
                    },
                  })}
                />

                <label className="label">
                  {errors.image1?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors?.image1?.message}
                    </span>
                  )}
                </label>
              </div>
              {/* img */}
              <div>
                {/* image */}
                <label className="label">
                  <span className="label-text font-semibold ">
                    Input Doctor Verify Image{' '}
                  </span>
                </label>
                <input
                  type="file"
                  className="input input-bordered text-black lg:w-72 sm:w-full max-w-xs pt-1    hover:shadow-xl shadow-inner h-[40px]"
                  {...register('image', {
                    required: {
                      value: true,
                      message: 'Image is Required',
                    },
                  })}
                />

                <label className="label">
                  {errors.image?.type === 'required' && (
                    <span className="label-text-alt text-red-500">
                      {errors?.image?.message}
                    </span>
                  )}
                </label>
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
            <>
              {department ? (
                <input
                  className="btn btn-primary mt-5 w-full  text-white"
                  type="submit"
                  value="ADD"
                />
              ) : (
                    <input
                      disabled
                  className="btn btn-primary mt-5 w-full  text-white"
                  type="submit"
                  value="ADD"
                />
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;