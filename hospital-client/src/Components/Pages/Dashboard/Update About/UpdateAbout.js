import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateAbout = () => {
     const {
       register,
       formState: { errors },
       handleSubmit,
       reset,
     } = useForm();
  const [about, setAbout] = useState([]);
  
useEffect(() => {
  fetch('http://localhost:5000/about')  
    .then(res => res.json())
    .then(data => {
      setAbout(data[0]);   

    });
}, [about]);
  // console.log(about);

  const onSubmit = async data => {
  

  if (!about?._id) {
    toast.error('Missing About ID');
    return;
    }
    const updateAbout = {
      details: data.details || about.details,
      image: data.image || about.image,
      mission:data.mission || about.mission,
      testimonials: data.testimonials || about.testimonials,
    }

  try {
    const res = await fetch(`http://localhost:5000/updateAbout/${about._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateAbout),
    });

    const result = await res.json();

    if (result.modifiedCount > 0) {
      toast.success('Successfully Updated About');
      reset(); // If you're using react-hook-form
    } else {
      toast.warn('No changes made');
    }
  } catch (err) {
    console.error('Update failed:', err);
    toast.error('Update failed');
  }
};
  return (
   
    <div className="bg-indigo-100 px-6 py-8 rounded-xl shadow-lg max-w-4xl mx-auto my-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* About Details */}
        <div className="col-span-1">
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            About Details
          </label>
          <textarea
            rows="4"
            placeholder="Write about us..."
            className="w-full p-3 rounded-md border border-blue-900 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-400 transition"
            {...register('details')}
          />
        </div>

        {/* About Image */}
        <div className="col-span-1">
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            About Image URL
          </label>
          <input
            type="text"
            placeholder="https://your-image-link.com"
            className="w-full p-3 rounded-md border border-blue-900 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-400 transition"
            {...register('image')}
          />
        </div>

        {/* About Mission */}
        <div className="col-span-1">
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            About Mission
          </label>
          <textarea
            rows="4"
            placeholder="Write about our mission..."
            className="w-full p-3 rounded-md border border-blue-900 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-400 transition"
            {...register('mission')}
          />
        </div>

        {/* About Testimonials */}
        <div className="col-span-1">
          <label className="block text-lg font-semibold mb-2 text-gray-700">
            About Testimonials
          </label>
          <textarea
            rows="4"
            placeholder="Write about testimonials..."
            className="w-full p-3 rounded-md border border-blue-900 bg-white text-gray-800 focus:ring-2 focus:ring-indigo-400 transition"
            {...register('testimonials')}
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2 mt-4">
          <input
            type="submit"
            value="Update About"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition hover:shadow-lg cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateAbout;