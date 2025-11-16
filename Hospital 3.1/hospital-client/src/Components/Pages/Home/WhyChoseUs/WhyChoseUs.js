import { FaMinus, FaUtensilSpoon } from 'react-icons/fa';

const WhyChoseUs = () => {
  return (
    <div
      className=""
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/035/377/619/small/public-hospital-building-with-ambulance-car-and-medical-helicopter-medical-concept-design-background-landscape-illustration-vector.jpg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="py-20 px-24">
        <div className="flex items-center text-orange-600 text-xl font-semibold">
          <h1 className="mr-2">Why Choose Us</h1>
          <FaMinus />
          <FaUtensilSpoon className="rotate-45" />
        </div>
        <div>
          <h1 className="text-primary text-4xl mt-2 font-semibold">
            Patient Services
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-14  mt-3">
          <div className=" bg-white p-4 rounded-lg shadow-xl">
            <img
              src="https://www.peerlesshospital.com/images/info-png.webp"
              alt=""
            />
            <h1 className="text-2xl text-primary font-semibold">
              Patient Info
            </h1>
            <p className="text-[16px] w-full font-meStyle">
              Patient Guide, International Patient, Inpatient Payment, Reports
              Download, List of Empaneled Corporates and TPA.
            </p>
          </div>
          <div className=" bg-white p-4 rounded-lg shadow-xl">
            <img
              src="https://www.peerlesshospital.com/images/appointment-png.webp"
              alt=""
            />
            <h1 className="text-2xl text-primary font-semibold">
              Appointments
            </h1>
            <p className="text-[16px] w-full font-meStyle">
              Online Appointment, Appointment Request, Teleconsultation,
              Appointment by Phone.
            </p>
          </div>
          <div className=" bg-white p-4 rounded-lg shadow-xl">
            <img
              src="https://www.peerlesshospital.com/images/ambulance-ser-png.webp"
              alt=""
            />
            <h1 className="text-2xl text-primary font-semibold">
              24/7 Services
            </h1>
            <p className="text-[16px] w-full font-meStyle">
              Emergency and Trauma, Ambulance Service, Blood Centre, Laboratory,
              Radiology, Operation Theatre, Pharmacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoseUs;