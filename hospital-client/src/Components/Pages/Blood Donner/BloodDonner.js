

import { useEffect, useState } from 'react';
import Footer from '../../Share/Footer';

const BloodDonner = () => {
  const [donner, setDonner] = useState([]);

  useEffect(() => {
fetch('http://localhost:5000/donner')
      .then((response) => response.json())
      .then((data) => setDonner(data))
      .catch((error) => console.error('Error fetching donners:', error));
   }, [donner]);

   const handleCall = () => {
     window.location.href = 'tel:+1234567890';
   };
  return (
    <div className="pt-20 ">
      <div className="grid grid-cols-4 mx-5 mb-10">
        <div className="text-center text-xl bg-indigo-700 p-14 text-white">
          <h1 className="text-3xl font-semibold">A (+ve)</h1>
          <h1>Available : 0</h1>
          <h1>Regular Donner : 32</h1>
          <h1>+8801752468054</h1>
          <button
            onClick={handleCall}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
          >
            Call Now
          </button>
        </div>
        <div className="text-center text-xl bg-orange-700 p-14 text-white">
          <h1 className="text-3xl font-semibold">A (-ve)</h1>
          <h1>Available : 15</h1>
          <h1>Regular Donner : 42</h1>
          <h1>+8801752468054</h1>
          <button
            onClick={handleCall}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
          >
            Call Now
          </button>
        </div>
        <div className="text-center text-xl bg-violet-700 p-14 text-white">
          <h1 className="text-3xl font-semibold">B (+ve)</h1>
          <h1>Available : 45</h1>
          <h1>Regular Donner : 132</h1>
          <h1>+8801752468054</h1>
          <button
            onClick={handleCall}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
          >
            Call Now
          </button>
        </div>
        <div className="text-center text-xl bg-green-700 p-14 text-white">
          <h1 className="text-3xl font-semibold">B (-ve)</h1>
          <h1>Available : 25</h1>
          <h1>Regular Donner : 75</h1>
          <h1>+8801752468054</h1>
          <button
            onClick={handleCall}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
          >
            Call Now
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 mx-5 mb-10">
        <div className="text-center text-xl bg-lime-700 p-14 text-white">
          <h1 className="text-3xl font-semibold">O (+ve)</h1>
          <h1>Available : 5</h1>
          <h1>Regular Donner : 88</h1>
          <h1>+8801752468054</h1>
          <button
            onClick={handleCall}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
          >
            Call Now
          </button>
        </div>
        <div className="text-center text-xl bg-blue-700 p-14 text-white">
          <h1 className="text-3xl font-semibold">O (-ve)</h1>
          <h1>Available : 0</h1>
          <h1>Regular Donner : 55</h1>
          <h1>+8801752468054</h1>
          <button
            onClick={handleCall}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
          >
            Call Now
          </button>
        </div>
        <div className="text-center text-xl bg-pink-700 p-14 text-white">
          <h1 className="text-3xl font-semibold">AB (+ve)</h1>
          <h1>Available : 12</h1>
          <h1>Regular Donner : 43</h1>
          <h1>+8801752468054</h1>
          <button
            onClick={handleCall}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
          >
            Call Now
          </button>
        </div>
        <div className="text-center text-xl bg-stone-700 p-14 text-white">
          <h1 className="text-3xl font-semibold">AB (-ve)</h1>
          <h1>Available : 10</h1>
          <h1>Regular Donner : 25</h1>
          <h1>+8801752468054</h1>
          <button
            onClick={handleCall}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-xl mt-2"
          >
            Call Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BloodDonner;
