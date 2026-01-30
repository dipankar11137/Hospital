import { useEffect, useState } from 'react';
import { FaMinus, FaUtensilSpoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Consultants = () => {
  const [doctors, setDoctors] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/doctor')
      .then(res => res.json())
      .then(data => setDoctors(data.reverse())); // latest first
  }, []);

  const handleDetails = id => {
    navigator(`/doctorDetails/${id}`);
  };

  return (
    <div
      style={{
        backgroundImage:
          "url('https://www.asterhospitals.in/sites/default/files/2022-03/best-urology-hospital-in-hyderabad.jpg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
      className="relative px-6 md:px-20 py-12"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center text-orange-500 text-xl font-semibold mb-2">
          <h1 className="mr-2">Doctors</h1>
          <FaMinus />
          <FaUtensilSpoon className="rotate-45 ml-2" />
        </div>

        <h1 className="font-bold text-3xl md:text-4xl text-white mb-10">
          Our Consultants
        </h1>

        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          modules={[Pagination, Autoplay]}
          className="pb-10"
        >
          {doctors.map(doctor => (
            <SwiperSlide key={doctor._id}>
              <div className="bg-indigo-900 h-[370px] shadow-lg p-5 w-full  flex flex-col justify-between items-center text-center">
                <div>
                  <img
                    className="h-48 w-48 ml-3 rounded-full object-cover border-4 border-secondary"
                    src={doctor?.img}
                    alt={doctor?.name}
                  />
                  <h1 className="text-xl font-bold mt-3 text-slate-200">
                    {doctor?.name}
                  </h1>
                </div>

                <div className='bottom-2 fixed'>
                  <p className="text-sm uppercase text-gray-300 mb-2">
                    {doctor?.department}
                  </p>
                  <button
                    onClick={() => handleDetails(doctor._id)}
                    className="btn btn-primary text-white px-4 btn-md text-sm rounded w-44 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Consultants;

//