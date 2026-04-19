import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ManageDonor = () => {
  const [donors, setDonors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await fetch('http://localhost:5000/donner');
      const data = await res.json();
      setDonors(data);
      setLoading(false);
    } catch {
      toast.error('Failed to load donors');
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async id => {
    if (!window.confirm('Delete this donor?')) return;

    try {
      const res = await fetch(`http://localhost:5000/donner/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (result.deletedCount > 0) {
        setDonors(donors.filter(d => d._id !== id));
        toast.success('Deleted successfully');
      }
    } catch {
      toast.error('Delete failed');
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = donor => {
    setEditingId(donor._id);
    setNewDate(donor.lastDonationDate || '');
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async id => {
    try {
      const res = await fetch(`http://localhost:5000/donner/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastDonationDate: newDate }),
      });

      const result = await res.json();

      if (result.modifiedCount > 0) {
        setDonors(prev =>
          prev.map(d =>
            d._id === id ? { ...d, lastDonationDate: newDate } : d,
          ),
        );
        toast.success('Updated successfully');
        setEditingId(null);
      }
    } catch {
      toast.error('Update failed');
    }
  };

  /* ================= ELIGIBILITY ================= */
  const getMonthDiff = date => {
    if (!date) return 999;
    const last = new Date(date);
    const now = new Date();
    let months =
      (now.getFullYear() - last.getFullYear()) * 12 +
      (now.getMonth() - last.getMonth());
    if (now.getDate() < last.getDate()) months--;
    return months;
  };

  /* ================= FILTER ================= */
  const filtered = donors.filter(d =>
    `${d.name} ${d.email}`.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading donors...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-red-600">
          🩸 Manage Blood Donors
        </h2>

        <input
          type="text"
          placeholder="Search donor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-72 shadow-sm focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {filtered.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-red-50 text-gray-700 uppercase text-xs text-center">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Donor</th>
                <th className="py-3 px-4">Blood</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Last Donate</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-800 text-center">
              {filtered.map((donor, index) => {
                const months = getMonthDiff(donor.lastDonationDate);
                const eligible = months >= 3;

                return (
                  <tr
                    key={donor._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>

                    {/* NAME + EMAIL */}
                    <td className="px-4 py-3">
                      <p className="font-semibold">{donor.name}</p>
                      <p className="text-xs text-gray-500">{donor.email}</p>
                    </td>

                    <td className="px-4 py-3 font-bold text-red-600">
                      {donor.bloodGroup}
                    </td>

                    <td className="px-4 py-3">{donor.phone}</td>

                    {/* DATE EDIT */}
                    <td className="px-4 py-3">
                      {editingId === donor._id ? (
                        <input
                          type="date"
                          value={newDate}
                          onChange={e => setNewDate(e.target.value)}
                          className="border px-2 py-1 rounded"
                        />
                      ) : donor.lastDonationDate ? (
                        new Date(donor.lastDonationDate).toLocaleDateString()
                      ) : (
                        'N/A'
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          eligible
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {eligible ? 'Eligible' : 'Not Eligible'}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3 space-x-2">
                      {editingId === donor._id ? (
                        <>
                          <button
                            onClick={() => handleUpdate(donor._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>

                          <button
                            onClick={() => setEditingId(null)}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(donor)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(donor._id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-10 text-gray-500">No donors found 😔</p>
        )}
      </div>
    </div>
  );
};

export default ManageDonor;
