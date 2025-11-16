import { useEffect, useState } from 'react';
import { FaHandPointDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Footer from '../../Share/Footer';

const About = () => {
  const { pathname } = useLocation();
    const [about, setAbout] = useState([]);
    
  useEffect(() => {
    fetch('http://localhost:5000/about')
      .then(res => res.json())
      .then(data => {
        setAbout(data[0]);
      });
  }, [about]);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  return (
    <div className="pt-20">
      <div>
        <h1 className="text-4xl text-center mb-5 font-semibold text-primary">
          Welcome To Health Care
        </h1>
      </div>
      <div className="flex justify-center">
        <img
          className="rounded-lg"
          src={
            about?.image ||
            'https://t4.ftcdn.net/jpg/06/55/41/29/360_F_655412969_nx1j9GbbLOqkeL1uVitx96DlFr0vzbAC.jpg'
          }

          alt=""
        />
      </div>
      <div className=" mx-32">
        <h1>
         {about?.details || 'Health care is a system of medical services and practices that aim to maintain or improve the health of individuals and communities. It encompasses a wide range of services, including preventive care, diagnosis, treatment, and management of illnesses and injuries. Health care can be provided by various professionals, including doctors, nurses, therapists, and other specialists, and can take place in various settings such as hospitals, clinics, and home care. The goal of health care is to promote overall well-being, prevent disease, and provide effective treatment for those who are ill or injured. It is an essential component of society, contributing to the quality of life and longevity of individuals. Access to quality health care is a fundamental right, and efforts are made globally to ensure that all individuals receive the care they need, regardless of their socioeconomic status or geographic location.'  }
        </h1>
      </div>

      <div className="mx-20 mt-10">
        <h1 className="text-4xl  mb-3 text-primary font-semibold flex items-center gap-10">
          Our Mission{' '}
          <FaHandPointDown className="text-red-600 animate-bounce" />
        </h1>
        <p className="text-lg">
          {about?.mission ||
            'Our mission is to provide high-quality, compassionate healthcare services that improve the health and well-being of our patients and communities. We are committed to delivering patient-centered care that is accessible, affordable, and equitable for all. Through innovation, collaboration, and continuous improvement, we strive to enhance the health outcomes of those we serve while fostering a culture of excellence and integrity in everything we do.'}
        </p>
      </div>
      <div className="mx-20 mt-10">
        <h1 className="text-4xl  mb-3 text-indigo-600 font-semibold flex items-center gap-10">
          Testimonials
          <FaHandPointDown className="text-sky-600 animate-bounce" />
        </h1>
        <p className="text-lg">
          {about?.testimonials ||
            'We are grateful for the positive feedback from our patients and their families. Your testimonials inspire us to continue providing exceptional care and support. Thank you for trusting us with your health and well-being. We are honored to be a part of your journey towards better health.'    }
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;