import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const Notice = () => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/update')
      .then(res => res.json())
      .then(data => setDescription(data));
  }, [description]);

  return (
    <div className="flex  ">
      <h1 className="bg-primary py-3 px-10 text-2xl font-semibold text-rose-50">
        Update
      </h1>
      <Marquee className="bg-green-100 rounded-lg rounded-l-none">
        <h1 className="text-xl text-blue-800 mr-10 p-3 font-medium">
          <span className="mr-5"> ***</span>{' '}
          {description[0]?.description || 'No updates available at the moment.'}
          <span className="ml-5">***</span>
        </h1>
        <h1 className="text-xl text-blue-800 mr-10 p-3 font-medium">
          <span className="mr-5"> ***</span>{' '}
          {description[0]?.description || 'No updates available at the moment.'}
          <span className="ml-5">***</span>
        </h1>
      </Marquee>
    </div>
  );
};

export default Notice;