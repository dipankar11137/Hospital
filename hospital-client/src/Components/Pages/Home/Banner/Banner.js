
import React, { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import './Banner.css';

const Banner = () => {
  const [autoplay, setAutoplay] = useState(true);
  const handleCall = () => {
    window.location.href = 'tel:+1234567890';
  };

    const handleMouseEnter = () => {
      setAutoplay(false);
    };

    const handleMouseLeave = () => {
      setAutoplay(true);
    };
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={
        //   autoplay ? { delay: 3000, disableOnInteraction: false } : false
        // }
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('https://www.peerlesshospital.com/CMS/uploads/Banner/1706437897-desk.webp')`,
              // backgroundImage: `url(${banner1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              width: '100%',
            }}
            className="h-[400px] md:h-[500px] flex items-center "
          >
            <div className=" ml-32 text-start">
              <h1>Transforming to Futuristic Healthcare</h1>
              <h2 className="text-4xl font-semibold">
                Setting Benchmark <br />
                in Clinical Excellence
              </h2>
              <p className="text-sm">
                Investing in skill and experience for a better tomorrow.
              </p>
              <div>
                <button className="btn btn-sm btn-primary mt-3">
                  Know More
                </button>
                <button
                  onClick={handleCall}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-xl mt-2 ml-5"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('https://www.peerlesshospital.com/CMS/uploads/Banner/1706437897-desk.webp')`,
              // backgroundImage: `url(${banner1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              width: '100%',
            }}
            className="h-[400px] md:h-[500px] flex items-center"
          >
            <div className=" ml-32 text-start">
              <h1>30 Years of Healing and Wellness</h1>
              <h2 className="text-4xl font-semibold">
                A Legacy of Healing, Hope <br /> and Health
              </h2>
              <p className="text-sm">
                At the heart of our legacy lies a commitment to your well-
                <br />
                being, spanning three decades of exceptional healthcare.
              </p>
              <div>
                <button className="btn btn-sm btn-primary mt-3">
                  Know More
                </button>
                <button
                  onClick={handleCall}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-xl mt-2 ml-5"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: `url('https://www.peerlesshospital.com/CMS/uploads/Banner/1706438100-desk.webp')`,
              // backgroundImage: `url(${banner1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              width: '100%',
            }}
            className="h-[400px] md:h-[500px] flex items-center"
          >
            {' '}
            <div className=" ml-32 text-start">
              <h1>30 Years of Healing and Wellness</h1>
              <h2 className="text-4xl font-semibold">
                A Legacy of Healing, Hope <br /> and Health
              </h2>
              <p className="text-sm">
                At the heart of our legacy lies a commitment to your well-
                <br />
                being, spanning three decades of exceptional healthcare.
              </p>
              <div>
                <button className="btn btn-sm btn-primary mt-3">
                  Know More
                </button>
                <button
                  onClick={handleCall}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-xl mt-2 ml-5"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;