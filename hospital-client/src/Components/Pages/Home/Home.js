import React from "react";
import Footer from "../../Share/Footer";
import Banner from "./Banner/Banner";
import Notice from "./Notice/Notice";
import SImpleProcess from "./SImpleProcess/SImpleProcess";
import Welcome from "./Welcome/Welcome";
import WhyChoseUs from "./WhyChoseUs/WhyChoseUs";

const Home = () => {
  return (
    <div className="bg-gradient-to-t from-pink-50 via-purple-50 to-pink-50 pt-[66px] ">
      <Banner />
      <Notice />
      <SImpleProcess />
      <Welcome />
      <WhyChoseUs/>
    {/* <Appointment/> */}
      <Footer/>
    </div>
  );
};

export default Home;
