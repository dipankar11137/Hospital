import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageDonor = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await fetch('http://localhost:5000/donner');
      const data = await res.json();
      setDonors(data);
    } catch (error) {
      toast.error('Failed to load donors');
    }
  };

  const handleDelete = async id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this donor?'
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/donner/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (result.deletedCount > 0) {
        setDonors(donors.filter(donor => donor._id !== id));
        toast.success('Donor removed successfully');
      } else {
        toast.warning('Failed to delete donor');
      }
    } catch (error) {
      toast.error('Error deleting donor');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
        🩸 Manage Blood Donors
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
        {donors.length > 0 ? (
          <table className="w-full text-sm text-white">
            <thead className="bg-slate-900 text-sm uppercase text-center">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4 border-r">Name</th>
                <th className="py-3 px-4 border-r">Email</th>
                <th className="py-3 px-4 border-r">Phone</th>
                <th className="py-3 px-4 border-r">Blood Group</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor, index) => (
                <tr
                  key={donor._id}
                  className="text-center border-t border-gray-600"
                >
                  <td className="py-3 px-4 bg-slate-800">{index + 1}</td>
                  <td className="py-3 px-4 bg-slate-800 border-r">
                    {donor.name}
                  </td>
                  <td className="py-3 px-4 bg-slate-800 border-r">
                    {donor.email}
                  </td>
                  <td className="py-3 px-4 bg-slate-800 border-r">
                    {donor.phone}
                  </td>
                  <td className="py-3 px-4 bg-slate-800 border-r">
                    {donor.bloodGroup}
                  </td>
                  <td className="py-3 px-4 bg-slate-800">
                    <button
                      onClick={() => handleDelete(donor._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-400 py-6">
            No donor records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManageDonor;
