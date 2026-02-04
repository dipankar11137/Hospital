import { useState } from 'react';

export default function BloodDonnerProfile() {
  const [active, setActive] = useState(true);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 pt-20">
      <h2 className="text-2xl font-semibold text-red-600 mb-6">
        Blood Donor Profile
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input type="file" className="mt-2 w-full text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Group
          </label>
          <select className="mt-2 w-full border rounded-lg p-2">
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Blood Donation
          </label>
          <input type="date" className="mt-2 w-full border rounded-lg p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Donation Place
          </label>
          <input
            type="text"
            placeholder="Hospital / Camp Name"
            className="mt-2 w-full border rounded-lg p-2"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>
          <p className="font-medium text-gray-800">Donation Activity Status</p>
          <p className="text-sm text-gray-500">
            Automatically enabled after 3 months
          </p>
        </div>
        <button
          onClick={() => setActive(!active)}
          className={`px-6 py-2 rounded-full text-white transition ${active ? 'bg-green-600' : 'bg-gray-400'}`}
        >
          {active ? 'Active' : 'Inactive'}
        </button>
      </div>

      <div className="mt-6 border-t pt-4 text-sm text-gray-600">
        Contact number is hidden. Users must pay{' '}
        <span className="font-semibold">৳10</span> to view donor contact
        details.
      </div>
    </div>
  );
}
