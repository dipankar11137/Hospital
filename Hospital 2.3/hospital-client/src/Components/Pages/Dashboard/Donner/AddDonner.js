
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
const AddDonner = () => {
 const {
       register,
       formState: { errors },
       handleSubmit,
       reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/donner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      toast.success('Donner added successfully:', result);
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error('Error adding Donner:', error);
    }
  }
  return (
    <div className="mx-5">
      <h1 className="text-4xl my-1 text-center font-semibold text-primary">
        Add Donner
      </h1>
      <div>
        <form
          className="bg-indigo-100 p-4 rounded-lg space-y-4"
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
                <option value="A+">A (+ve)</option>
                <option value="A-">A (-ve)</option>
                <option value="B+">B (+ve)</option>
                <option value="B-">B (-ve)</option>
                <option value="AB+">AB (+ve)</option>
                <option value="AB-">AB (-ve)</option>
                <option value="O+">O (+ve)</option>
                <option value="O-">O (-ve)</option>
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

          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-full">
              Add Donor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDonner;
