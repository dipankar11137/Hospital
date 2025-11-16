import { useForm } from 'react-hook-form';

const AddMedicine = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const types = ['Tablet', 'Capsule', 'Syrup', 'Injection'];

  const onSubmit = data => {
    const newMedicine = {
      _id: Date.now(),
      name: data.name,
      group: data.group,
      type: data.type,
      price: parseFloat(data.price),
      image: data.image,
    };
    console.log('New Medicine Added:', newMedicine);
    alert(`Medicine "${newMedicine.name}" added successfully!`);
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10 border border-gray-200">
        <h2 className="text-4xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-8">
          Add New Medicine
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Medicine Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Medicine Name
            </label>
            <input
              type="text"
              placeholder="Enter medicine name"
              {...register('name', { required: 'Medicine name is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {errors.name && (
              <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Group */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Group
            </label>
            <input
              type="text"
              placeholder="Enter medicine group"
              {...register('group', { required: 'Medicine group is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {errors.group && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.group.message}
              </p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Type
            </label>
            <select
              {...register('type', { required: 'Medicine type is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            >
              <option value="">Select type</option>
              {types.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 mt-1 text-sm">{errors.type.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter price"
              {...register('price', {
                required: 'Price is required',
                min: { value: 0, message: 'Price must be greater than 0' },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {errors.price && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              {...register('image', { required: 'Image URL is required' })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
            {errors.image && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:from-blue-500 hover:to-green-400 transition transform hover:scale-105"
          >
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;
