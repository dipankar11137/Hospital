import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Banner.css';

const Banner = () => {
  const [autoplay, setAutoplay] = useState(true);

  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const slides = [
    {
      img: 'https://img.pikbest.com/backgrounds/20190422/health-medical-safety-medical-care-banner_1890194.jpg!sw800',
      title: 'Transforming to Futuristic Healthcare',
      subtitle: 'Setting Benchmark in Clinical Excellence',
      desc: 'Investing in skill and experience for a better tomorrow.',
    },
    {
      img: 'https://i.ibb.co/DkF8gbN/alok-photo-2.jpg',
      title: '30 Years of Healing and Wellness',
      subtitle: 'A Legacy of Healing, Hope and Health',
      desc: 'At the heart of our legacy lies a commitment to your well-being, spanning three decades of exceptional healthcare.',
    },
    {
      img: 'https://i.ibb.co/cbmyH21/alok-photo-4.jpg',
      title: 'World-Class Medical Expertise',
      subtitle: 'Empowering Health with Innovation',
      desc: 'Where compassion meets technology — delivering advanced and affordable healthcare for every patient.',
    },
  ];

  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={
          autoplay ? { delay: 4000, disableOnInteraction: false } : false
        }
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-[480px] md:h-[480px] lg:h-[480px] w-full bg-cover bg-center flex items-center"
              style={{
                backgroundImage: `url(${slide.img})`,
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

              {/* Text Content */}
              <div className="relative z-10 px-6 sm:px-10 md:px-20 lg:px-32 text-white space-y-4 max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-indigo-300">
                  {slide.subtitle}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
                  {slide.desc}
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => (window.location.href = 'tel:+880123456789')}
                    className="btn btn-primary px-6 py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-300"
                  >
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional gradient bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Banner;
