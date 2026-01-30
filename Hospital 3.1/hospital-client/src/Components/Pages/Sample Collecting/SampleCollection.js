import { useState } from 'react';
import { toast } from 'react-toastify';

const SampleCollection = () => {

  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    location: '',
  });

const samples = [
  {
    _id: '1',
    name:
     'Complete Blood Count (CBC)',
    description: 'Hemoglobin, RBC, WBC, Platelet',
    price: 800,
    icon: '🩸',
    isActive: true,
  },
  {
    _id: '2',
    name: 'Blood Sugar (Fasting)',
    description: 'Fasting glucose level',
    price: 300,
    icon: '🍬',
    isActive: true,
  },
  {
    _id: '3',
    name: 'Blood Sugar (Random)',
    description: 'Random glucose level',
    price: 350,
    icon: '🍭',
    isActive: true,
  },
  {
    _id: '4',
    name: 'Lipid Profile',
    description: 'Cholesterol, HDL, LDL, Triglycerides',
    price: 1500,
    icon: '❤️',
    isActive: true,
  },
  {
    _id: '5',
    name: 'Liver Function Test (LFT)',
    description: 'SGPT, SGOT, Bilirubin',
    price: 1800,
    icon: '🧬',
    isActive: true,
  },
  {
    _id: '6',
    name: 'Kidney Function Test (KFT)',
    description: 'Creatinine, Urea, Uric Acid',
    price: 1700,
    icon: '🧪',
    isActive: true,
  },
  {
    _id: '7',
    name: 'Urine Routine Examination (R/E)',
    description: 'Urine sugar, protein, microscopy',
    price: 400,
    icon: '🚽',
    isActive: true,
  },
  {
    _id: '8',
    name: 'Thyroid Profile (T3, T4, TSH)',
    description: 'Thyroid hormone levels',
    price: 1200,
    icon: '🦋',
    isActive: true,
  },
  {
    _id: '9',
    name: 'Dengue NS1 / IgG / IgM',
    description: 'Dengue virus detection',
    price: 2000,
    icon: '🦟',
    isActive: true,
  },
  {
    _id: '10',
    name: 'COVID-19 RT-PCR',
    description: 'Coronavirus detection',
    price: 2500,
    icon: '🦠',
    isActive: true,
  },
];

  const toggleSample = sample => {
    setSelected(prev =>
      prev.some(s => s._id === sample._id)
        ? prev.filter(s => s._id !== sample._id)
        : [...prev, sample],
    );
  };

  const handleSubmit = () => {
    if (!selected.length) {
      return toast.error('Select at least one sample');
    }

    const payload = {
      userName: form.name,
      phone: form.phone,
      address: form.address,
      location: form.location,
      samples: selected.map(s => ({
        sampleId: s._id,
        sampleName: s.name,
        price: s.price,
      })),
      totalPrice: selected.reduce((a, b) => a + b.price, 0),
    };

    fetch('http://localhost:5000/home-sample', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(() => {
        toast.success('Home sample request submitted');
        setSelected([]);
      });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 pt-20">
      <h1 className="text-3xl font-bold text-center mb-6">
        Home Sample Collection
      </h1>

      {/* Sample Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {samples.map(sample => (
          <div
            key={sample._id}
            onClick={() => toggleSample(sample)}
            className={`cursor-pointer bg-white p-5 rounded-xl shadow hover:shadow-lg border-2
            ${
              selected.some(s => s._id === sample._id)
                ? 'border-blue-600'
                : 'border-transparent'
            }`}
          >
            <h2 className="text-xl font-semibold">{sample.name}</h2>
            <p className="text-gray-600 text-sm">{sample.description}</p>
            <p className="mt-2 font-bold text-blue-600">৳ {sample.price}</p>
          </div>
        ))}
      </div>

      {/* User Info */}
      <div className="bg-white mt-8 p-6 rounded-xl shadow max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Collection Details</h2>

        <div className="grid gap-4">
          <input
            placeholder="Full Name"
            className="input input-bordered"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Phone Number"
            className="input input-bordered"
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="Address"
            className="input input-bordered"
            onChange={e => setForm({ ...form, address: e.target.value })}
          />
          <input
            placeholder="Location"
            className="input input-bordered"
            onChange={e => setForm({ ...form, location: e.target.value })}
          />
        </div>

        <button onClick={handleSubmit} className="btn btn-primary w-full mt-5">
          Confirm Home Collection
        </button>
      </div>
    </div>
  );
};

export default SampleCollection;
