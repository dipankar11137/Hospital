import React, { useEffect } from 'react';
import { FaHandPointDown } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import Footer from '../../Share/Footer';

const About = () => {
    const { pathname } = useLocation();

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
          src="https://t4.ftcdn.net/jpg/06/55/41/29/360_F_655412969_nx1j9GbbLOqkeL1uVitx96DlFr0vzbAC.jpg"
          alt=""
        />
      </div>
      <div className=" mx-32">
        <h1>
          perspiciatis, voluptatibus quis id distinctio? Quae dicta cum aliquam
          quis, quod dolore omnis ipsum vitae rem consequuntur error est? Libero
          officia, facere laborum ducimus, nam cumque odit perferendis
          perspiciatis dolore inventore mollitia, consequatur deserunt pariatur
          recusandae laudantium maxime unde veritatis! Beatae ad placeat fugiat
          blanditiis eum aut exercitationem nam, ea architecto perspiciatis. Ab
          architecto laudantium quibusdam unde nulla numquam repellat rem,
          consequuntur
        </h1>
      </div>

      <div className="mx-20 mt-10">
        <h1 className="text-4xl  mb-3 text-primary font-semibold flex items-center gap-10">
          Our Mission{' '}
          <FaHandPointDown className="text-red-600 animate-bounce" />
        </h1>
        <p className="text-lg">
          our mission is to provide compassionate, high-quality healthcare
          services to individuals and communities, promoting wellness,
          preventing illness, and improving the overall health outcomes of those
          we serve.We are committed to delivering patient-centered care that is
          responsive to the needs and preferences of each individual, treating
          every person with dignity, respect, and empathy. Our multidisciplinary
          team of healthcare professionals works collaboratively to provide
          comprehensive, evidence-based care that addresses the physical,
          emotional, and spiritual needs of our patients. We strive to be a
          trusted partner in our patients' healthcare journey, empowering them
          to actively participate in decisions regarding their health and
          well-being. Through education, advocacy, and support, we aim to
          promote health literacy and empower individuals to make informed
          choices that lead to healthier lives. At [Healthcare Organization
          Name], we embrace diversity and inclusion, recognizing the unique
          backgrounds, experiences, and perspectives of both our patients and
          our team members. We are committed to fostering a culture of equity
          and belonging, where everyone feels valued, respected, and supported.
          As a cornerstone of our community, we are dedicated to serving all
          individuals, regardless of their ability to pay or their social or
          economic status. We actively engage with community partners and
          stakeholders to address the social determinants of health and reduce
          health disparities, striving to create a healthier, more equitable
          society for all. Through our unwavering commitment to excellence,
          innovation, and continuous improvement, we aspire to be a leader in
          healthcare delivery, setting the standard for quality, safety, and
          patient-centered care. Together, we are driven by our mission to make
          a positive difference in the lives of those we serve and to contribute
          to the health and well-being of our community." Feel free to customize
          this mission statement to align with the values, goals, and priorities
          of your specific healthcare organization.
        </p>
      </div>
      <div className="mx-20 mt-10 mb-20">
        <h1 className="text-4xl  mb-3 text-indigo-600 font-semibold flex items-center gap-10">
          Testimonials
          <FaHandPointDown className="text-sky-600 animate-bounce" />
        </h1>
        <p className="text-lg">
          The care I received at [Healthcare Organization Name] was exceptional.
          From the moment I walked in, I was greeted with warmth and
          professionalism. The staff went above and beyond to ensure my comfort
          and well-being throughout my entire stay. I cannot thank them enough
          for their dedication and compassion." - John S. "I have been a patient
          at [Healthcare Organization Name] for many years, and I continue to be
          impressed by the level of care provided. The doctors, nurses, and
          support staff are truly outstanding - knowledgeable, attentive, and
          always willing to listen. I feel confident knowing that I am in good
          hands whenever I visit." - Emily R. "As a new parent, I was anxious
          about my child's health and well-being. However, the team at
          [Healthcare Organization Name] quickly put my mind at ease. They
          provided expert guidance and support every step of the way, ensuring
          that my child received the best possible care. I am forever grateful
          for their kindness and expertise." - Sarah M. "I recently underwent
          surgery at [Healthcare Organization Name], and I cannot speak highly
          enough of the entire surgical team. They were professional, skilled,
          and compassionate, making me feel comfortable and confident throughout
          the entire process. Thanks to their expertise, my surgery was a
          success, and my recovery has been smooth." - Michael L. "I have been
          visiting [Healthcare Organization Name] for regular check-ups and
          screenings, and I am consistently impressed by the level of care
          provided. The staff is friendly and welcoming, and the facilities are
          clean and modern. I appreciate their dedication to promoting
          preventive care and helping me maintain my health." - Jessica K. Feel
          free to use or modify these testimonials to showcase the positive
          experiences of patients who have received care from your healthcare
          organization. Always ensure that the testimonials accurately reflect
          the sentiments of your satisfied patients.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;