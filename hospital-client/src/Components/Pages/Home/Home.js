import React from "react";
import Footer from "../../Share/Footer";
import Banner from "./Banner/Banner";
import Notice from "./Notice/Notice";
import SImpleProcess from "./SImpleProcess/SImpleProcess";
import Welcome from "./Welcome/Welcome";

const Home = () => {
  return (
    <div className="bg-gradient-to-t from-pink-100 via-purple-100 to-pink-50 pt-[66px] ">
      <Banner />
      <Notice />
      <SImpleProcess />
      <Welcome/>
    {/* <Appointment/> */}
      <Footer/>
    </div>
  );
};

export default Home;
