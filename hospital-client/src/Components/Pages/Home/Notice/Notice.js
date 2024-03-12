import React from 'react';
import Marquee from 'react-fast-marquee';

const Notice = () => {
  return (
    <div className="flex  ">
      <h1 className="bg-primary py-3 px-10 text-2xl font-semibold text-rose-50">
        Update
      </h1>
      <Marquee className="bg-green-100 rounded-lg rounded-l-none">
        <h1 className="text-xl text-blue-800 mr-10 p-3 font-medium">
          <span className="mr-5"> ***</span> onsectetur adipisicing elit.
          Pariatur, ipsum? sit amet consectetur adi Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Error officiis, corporis beatae minus
          illo repudiandae illum aspernatur vero.{' '}
          <span className="ml-5">***</span>
        </h1>
        <h1 className="text-xl text-blue-800 mr-10 p-3 font-medium">
          <span className="mr-5"> ***</span> onsectetur adipisicing elit.
          Pariatur, ipsum? sit amet consectetur adi Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Error officiis, corporis beatae minus
          illo repudiandae illum aspernatur vero.{' '}
          <span className="ml-5">***</span>
        </h1>
      
       
      </Marquee>
    </div>
  );
};

export default Notice;