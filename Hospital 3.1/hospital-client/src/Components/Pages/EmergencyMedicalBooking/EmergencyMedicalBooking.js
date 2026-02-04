import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function EmergencyMedicalBooking() {
  const BOOKING_DURATION = 10800; // 3 hours

  const [timeLeft, setTimeLeft] = useState(BOOKING_DURATION);
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [hospital, setHospital] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');

  /* ================= Countdown Timer ================= */
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    return `${h}h ${m}m ${s}s`;
  };

  /* ================= Fetch Doctors ================= */
  useEffect(() => {
    fetch('http://localhost:5000/doctor')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(() => toast.error('Failed to load doctors'));
  }, []);

  /* ================= Submit Booking ================= */
  const handleBooking = async () => {
    if (!patientName || !phone || !department || !hospital || !selectedDoctor) {
      toast.error('Please fill all fields!');
      return;
    }

    const now = new Date();

    const bookingData = {
      patientName,
      phone,
      department,
      hospital,
      doctor: selectedDoctor,

      // ✅ Automatic Date & Time
      bookingDate: now.toISOString().split('T')[0], // YYYY-MM-DD
      bookingTime: now.toLocaleTimeString(), // HH:MM:SS
      createdAt: now, // Full timestamp

      expiresIn: timeLeft, // seconds
      status: 'active',
    };

    try {
      const res = await fetch('http://localhost:5000/emergencyBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) throw new Error();

      await res.json();
      toast.success('Emergency booking confirmed!');

      // Reset form
      setPatientName('');
      setPhone('');
      setDepartment('');
      setHospital('');
      setSelectedDoctor('');
      setTimeLeft(BOOKING_DURATION);
    } catch (error) {
      toast.error('Booking failed!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-28 mb-10">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Emergency Medical Booking
      </h2>

      {/* ================= Form ================= */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Patient Name"
          value={patientName}
          onChange={e => setPatientName(e.target.value)}
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-red-400"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-red-400"
        />

        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-red-400"
        >
          <option value="">Select Department</option>
          <option value="ICU">ICU</option>
          <option value="CCU">CCU</option>
          <option value="NICU">NICU</option>
          <option value="HDU">HDU</option>
          <option value="Oxygen">Oxygen Support</option>
        </select>

        <select
          value={hospital}
          onChange={e => setHospital(e.target.value)}
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-red-400"
        >
          <option value="">Select Hospital</option>
          <option value="Smart Healthcare">Smart Healthcare</option>
        </select>

        <select
          value={selectedDoctor}
          onChange={e => setSelectedDoctor(e.target.value)}
          className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-red-400 md:col-span-2"
        >
          <option value="">Select Doctor</option>
          {doctors.map(doc => (
            <option key={doc._id} value={doc.name}>
              {doc.name} ({doc.department})
            </option>
          ))}
        </select>
      </div>

      {/* ================= Action ================= */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="font-medium">Availability</p>
          <p className="text-green-600 text-sm">
            Beds / Seats / Cylinders Available
          </p>
        </div>

        <button
          onClick={handleBooking}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Confirm Booking
        </button>
      </div>

      {/* ================= Timer ================= */}
      <div className="mt-4 text-gray-600 text-sm">
        Booking valid for <span className="font-semibold">3 hours</span>.
        Remaining time:
        <span className="ml-2 font-bold text-red-600">{formatTime()}</span>
      </div>
    </div>
  );
}
