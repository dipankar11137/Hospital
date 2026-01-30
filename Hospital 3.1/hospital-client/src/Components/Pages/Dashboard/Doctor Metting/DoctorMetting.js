import { useEffect, useState } from 'react';
import {
  FaPrescriptionBottleAlt,
  FaUser,
  FaUserMd,
  FaVideo,
} from 'react-icons/fa';
import useUser from '../../../../hooks/useUser';

const DoctorMeeting = () => {
  const { user: doctor } = useUser();
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [meetingLink, setMeetingLink] = useState('');
  const [prescription, setPrescription] = useState('');

  // Fetch doctor's patients
  useEffect(() => {
    if (!doctor?.email) return;

    fetch(`http://localhost:5000/doctor/patients/${doctor.email}`)
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error('Error fetching patients:', err));
  }, [doctor]);

  // Handle creating a meeting link
  const handleCreateMeeting = async patientId => {
    if (!meetingLink) return alert('Please enter a meeting link');
    try {
      const res = await fetch(
        `http://localhost:5000/doctor/create-meeting/${patientId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ link: meetingLink }),
        },
      );
      const data = await res.json();
      alert('Meeting link created successfully!');
      setMeetingLink('');
    } catch (err) {
      console.error(err);
      alert('Failed to create meeting link');
    }
  };

  // Handle creating a prescription
  const handleCreatePrescription = async patientId => {
    if (!prescription) return alert('Please enter prescription details');
    try {
      const res = await fetch(
        `http://localhost:5000/doctor/create-prescription/${patientId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prescription }),
        },
      );
      const data = await res.json();
      alert('Prescription saved successfully!');
      setPrescription('');
    } catch (err) {
      console.error(err);
      alert('Failed to save prescription');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FaUserMd className="text-blue-600" /> Doctor Portal
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Patients List */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold text-lg mb-4">Patients</h2>
          {patients.length === 0 ? (
            <p className="text-gray-500 text-sm">No patients assigned yet.</p>
          ) : (
            <ul className="space-y-2 max-h-[500px] overflow-y-auto">
              {patients.map(p => (
                <li
                  key={p._id}
                  className={`p-2 border rounded hover:bg-blue-50 cursor-pointer ${
                    selectedPatient?._id === p._id
                      ? 'bg-blue-50 border-blue-300'
                      : ''
                  }`}
                  onClick={() => setSelectedPatient(p)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {p.name || 'Unnamed Patient'}
                    </span>
                    <span className="text-sm text-gray-500">{p.email}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Patient Details */}
        {selectedPatient && (
          <div className="md:col-span-2 bg-white shadow rounded-xl p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />{' '}
              {selectedPatient.name || 'Patient'} Details
            </h2>

            {/* Meeting Link Section */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <FaVideo className="text-blue-600" /> Meeting Link
              </label>
              <input
                type="text"
                value={meetingLink}
                onChange={e => setMeetingLink(e.target.value)}
                placeholder="Enter Zoom/Google Meet link..."
                className="input input-bordered w-full mb-2"
              />
              <button
                onClick={() => handleCreateMeeting(selectedPatient._id)}
                className="btn bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Meeting
              </button>
            </div>

            {/* Prescription Section */}
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <FaPrescriptionBottleAlt className="text-blue-600" />{' '}
                Prescription
              </label>
              <textarea
                rows="5"
                value={prescription}
                onChange={e => setPrescription(e.target.value)}
                placeholder="Enter medicines, dosage, and instructions..."
                className="textarea textarea-bordered w-full mb-2"
              />
              <button
                onClick={() => handleCreatePrescription(selectedPatient._id)}
                className="btn bg-green-600 hover:bg-green-700 text-white"
              >
                Save Prescription
              </button>
            </div>

            {/* Optional: Show patient details */}
            <div className="mt-6 bg-gray-50 p-4 rounded">
              <h3 className="font-semibold text-gray-700 mb-2">Patient Info</h3>
              <p>
                <strong>Email:</strong> {selectedPatient.email}
              </p>
              <p>
                <strong>Phone:</strong>{' '}
                {selectedPatient.phone || 'Not provided'}
              </p>
              <p>
                <strong>Address:</strong>{' '}
                {selectedPatient.address || 'Not provided'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorMeeting;
