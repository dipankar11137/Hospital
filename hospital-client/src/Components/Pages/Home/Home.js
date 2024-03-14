import React from "react";
import Footer from "../../Share/Footer";
import Banner from "./Banner/Banner";
import Facilities from "./Facilities/Facilities";
import Notice from "./Notice/Notice";
import SImpleProcess from "./SImpleProcess/SImpleProcess";
import Welcome from "./Welcome/Welcome";
import WhyChoseUs from "./WhyChoseUs/WhyChoseUs";

const Home = () => {
  return (
    <div className="bg-white pt-[66px] ">
      <Banner />
      <Notice />
      <SImpleProcess />
      <Welcome />
      <WhyChoseUs />
      <Facilities/>
    {/* <Appointment/> */}
      <Footer/>
    </div>
  );
};

export default Home;
