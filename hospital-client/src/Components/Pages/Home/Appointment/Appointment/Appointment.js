import React, { useState } from "react";
import "../../../../CSS/Style.css";
import Footer from "../../../../Share/Footer";
import AppointmentBanner from "../AppointmentBanner/AppointmentBanner";
import AvailableAppointment from "../AvailableAppointment/AvailableAppointment";

const Appointment = () => {
  const [selectDate, setSelectDate] = useState(new Date());
  return (
    <div className="text-white ">
      <AppointmentBanner
        selectDate={selectDate}
        setSelectDate={setSelectDate}
      />
      <AvailableAppointment selectDate={selectDate} />
      <Footer/>
    </div>
  );
};

export default Appointment;
