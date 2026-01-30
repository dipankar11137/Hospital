import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Update = () => {
  const [description, setDescription] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const navigator = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/update')
      .then(res => res.json())
      .then(data => setDescription(data));
  },[description])

const handleUpdate = async () => {
  const id = description[0]?._id;

  if (!id || !updateDescription.trim()) {
    return toast.error('Missing ID or empty description');
  }

  try {
    const res = await fetch(`http://localhost:5000/updateDescription/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description: updateDescription }), // pass object with key
    });

    const data = await res.json();
    if (data.success) {
      toast.success('Update Successful');
       navigator('/');
    } else {
      toast.error('Update failed');
    }
  } catch (err) {
    console.error(err);
    toast.error('Server error');
  }
};
// console.log(description[0]?.description)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 -mt-20">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Edit Profile Description
        </h1>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="6"
          // placeholder="Enter your description here..."
          placeholder={description[0]?.description }
          value={updateDescription}
          onChange={e => setUpdateDescription(e.target.value)}
        ></textarea>

        <button
          onClick={handleUpdate}
          className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-900 transition"
        >
          Update Description
        </button>

      
      </div>
    </div>
  );
};

export default Update;
