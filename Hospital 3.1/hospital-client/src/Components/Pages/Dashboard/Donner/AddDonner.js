
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const divisions = {
  Dhaka: [
    'Dhaka',
    'Gazipur',
    'Kishoreganj',
    'Manikganj',
    'Munshiganj',
    'Narayanganj',
    'Narsingdi',
    'Tangail',
    'Gopalganj',
    'Madaripur',
    'Rajbari',
    'Shariatpur',
    'Faridpur',
  ],
  Chattogram: [
    'Chattogram',
    'Cox’s Bazar',
    'Cumilla',
    'Brahmanbaria',
    'Chandpur',
    'Feni',
    'Lakshmipur',
    'Noakhali',
    'Khagrachhari',
    'Rangamati',
    'Bandarban',
  ],
  Rajshahi: [
    'Rajshahi',
    'Natore',
    'Pabna',
    'Sirajganj',
    'Bogura',
    'Joypurhat',
    'Naogaon',
    'Chapainawabganj',
  ],
  Khulna: [
    'Khulna',
    'Jessore',
    'Satkhira',
    'Bagerhat',
    'Jhenaidah',
    'Magura',
    'Narail',
    'Kushtia',
    'Meherpur',
    'Chuadanga',
  ],
  Barishal: [
    'Barishal',
    'Bhola',
    'Jhalokati',
    'Patuakhali',
    'Pirojpur',
    'Barguna',
  ],
  Sylhet: ['Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj'],
  Rangpur: [
    'Rangpur',
    'Kurigram',
    'Gaibandha',
    'Nilphamari',
    'Lalmonirhat',
    'Dinajpur',
    'Thakurgaon',
    'Panchagarh',
  ],
  Mymensingh: ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'],
};

const AddDonner = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [selectedDivision, setSelectedDivision] = useState('');

  const onSubmit = async data => {
    try {
      const response = await fetch('http://localhost:5000/donner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      toast.success('Donor added successfully!');
      reset();
    } catch (error) {
      console.error('Error adding donor:', error);
    }
  };

  return (
    <div className="mx-5">
      <h1 className="text-4xl my-3 text-center font-semibold text-primary">
        Add Donor
      </h1>

      <form
        className="bg-indigo-100 p-5 rounded-lg space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="input input-bordered w-full"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="input input-bordered w-full"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Blood Group + Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register('bloodGroup', {
                required: 'Blood group is required',
              })}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            {errors.bloodGroup && (
              <p className="text-red-500">{errors.bloodGroup.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="input input-bordered w-full"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9+]{11,14}$/,
                  message: 'Enter a valid phone number',
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Division + District */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Division */}
          <div>
            <label className="label">
              <span className="label-text">Division</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register('division', { required: 'Division is required' })}
              onChange={e => setSelectedDivision(e.target.value)}
            >
              <option value="">Select Division</option>
              {Object.keys(divisions).map(div => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
            {errors.division && (
              <p className="text-red-500">{errors.division.message}</p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="label">
              <span className="label-text">District</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register('district', { required: 'District is required' })}
              disabled={!selectedDivision}
            >
              <option value="">Select District</option>
              {selectedDivision &&
                divisions[selectedDivision].map(dis => (
                  <option key={dis} value={dis}>
                    {dis}
                  </option>
                ))}
            </select>
            {errors.district && (
              <p className="text-red-500">{errors.district.message}</p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-3">
          Add Donor
        </button>
      </form>
    </div>
  );
};

export default AddDonner;

// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// const AddDonner = () => {
//  const {
//        register,
//        formState: { errors },
//        handleSubmit,
//        reset,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await fetch('http://localhost:5000/donner', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       toast.success('Donner added successfully:', result);
//       reset(); // Reset the form after successful submission
//     } catch (error) {
//       console.error('Error adding Donner:', error);
//     }
//   }
//   return (
//     <div className="mx-5">
//       <h1 className="text-4xl my-1 text-center font-semibold text-primary">
//         Add Donner
//       </h1>
//       <div>
//         <form
//           className="bg-indigo-100 p-4 rounded-lg space-y-4"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           {/* Name + Email */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="label">
//                 <span className="label-text">Name</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 className="input input-bordered w-full"
//                 {...register('name', { required: 'Name is required' })}
//               />
//               {errors.name && (
//                 <p className="text-red-500">{errors.name.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 className="input input-bordered w-full"
//                 {...register('email', { required: 'Email is required' })}
//               />
//               {errors.email && (
//                 <p className="text-red-500">{errors.email.message}</p>
//               )}
//             </div>
//           </div>

//           {/* Blood Group + Phone */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="label">
//                 <span className="label-text">Blood Group</span>
//               </label>
//               <select
//                 className="select select-bordered w-full"
//                 {...register('bloodGroup', {
//                   required: 'Blood group is required',
//                 })}
//               >
//                 <option value="">Select Blood Group</option>
//                 <option value="A+">A (+ve)</option>
//                 <option value="A-">A (-ve)</option>
//                 <option value="B+">B (+ve)</option>
//                 <option value="B-">B (-ve)</option>
//                 <option value="AB+">AB (+ve)</option>
//                 <option value="AB-">AB (-ve)</option>
//                 <option value="O+">O (+ve)</option>
//                 <option value="O-">O (-ve)</option>
//               </select>
//               {errors.bloodGroup && (
//                 <p className="text-red-500">{errors.bloodGroup.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="label">
//                 <span className="label-text">Phone Number</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter Phone Number"
//                 className="input input-bordered w-full"
//                 {...register('phone', {
//                   required: 'Phone number is required',
//                   pattern: {
//                     value: /^[0-9+]{11,14}$/,
//                     message: 'Enter a valid phone number',
//                   },
//                 })}
//               />
//               {errors.phone && (
//                 <p className="text-red-500">{errors.phone.message}</p>
//               )}
//             </div>
//           </div>

//           <div className="pt-4">
//             <button type="submit" className="btn btn-primary w-full">
//               Add Donor
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDonner;
