import React from "react";
import Banner from "./Banner/Banner";
import Notice from "./Notice/Notice";
import SImpleProcess from "./SImpleProcess/SImpleProcess";

const Home = () => {
  return (
    <div className="bg-gradient-to-t from-pink-100 via-purple-100 to-pink-50 pt-[66px] pb-20">
      <Banner />
      <Notice />
      <SImpleProcess/>
    {/* <Appointment/> */}
      
    </div>
  );
};

export default Home;
