import { FaPhoneAlt, FaRegEnvelope } from 'react-icons/fa';

const Header = () => {
  return (
    <div className="bg-primary">
      <div className="flex justify-between px-20 text-white  items-center">
        <div className="flex gap-3">
          <h1 className="flex items-center gap-2">
            <FaPhoneAlt className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-[1px] p-[1px]" />
            +8801725798558
          </h1>
          <h1 className="flex items-center gap-2">
            <FaRegEnvelope />
            smarthealthcare@gmail.com
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          <h1>Emergency : +8801765285451</h1>
          <div className="h-4 w-[1px] bg-slate-50"></div>
          <div className="flex items-center">
            <img
              className="h-7 animate-pulse"
              src="https://www.peerlesshospital.com/images/ambulance.png"
              alt=""
            />
            <h1 className="font-semibold px-1">:</h1>
            <h1>+8801785469850 / +8801784965412</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;