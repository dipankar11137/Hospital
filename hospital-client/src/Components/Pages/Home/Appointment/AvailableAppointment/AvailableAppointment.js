import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useState } from 'react';
import BookingModal from '../BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointment = ({ selectDate }) => {
  const [counseling, setCounseling] = useState(null);
  const date = format(selectDate, 'PP', 'MMMM d');
  const today1 = new Date();
  const today = format(today1, 'PP', 'MMMM d');
  console.log('hello', date);
  console.log('hello 1', today);
  const day = format(selectDate, 'EEEE');
  // console.log(day);
  // test
  const isLongerDate = (date1, date2) => {
    const timestamp1 = new Date(date1).getTime();
    const timestamp2 = new Date(date2).getTime();

    return timestamp1 >= timestamp2;
  };

  const result = isLongerDate(date, today);

  // test end
  const {
    data: appointmentOptions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['appointmentOptions', date],
    queryFn: () =>
      fetch(`http://localhost:5000/appointments?date=${date}`).then(res =>
        res.json()
      ),
  });
  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <section className="mt-6 mx-40 mb-20">
      {/* {today <= date ? <h1>Right</h1> : <h1>Wrong</h1>} */}
      {result ? (
        <p className="text-3xl  text-center mt-10 text-green-900 font-bold mb-16">
          Available Appointment on {day}, {format(selectDate, 'PP')}
        </p>
      ) : (
        <p className="text-3xl  text-center mt-10 text-green-900 font-bold mb-16">
          {day}, {format(selectDate, 'PP')} <br /> <br /> <br />
          <span className="text-red-600 ">
            This day is the day of the past. So we cannot take counselling .
          </span>
        </p>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-36 mt-40">
          {appointmentOptions.map(option => (
            <AppointmentOption
              key={option._id}
              option={option}
              setCounseling={setCounseling}
              day={day}
            ></AppointmentOption>
          ))}
        </div>
      )}
      {counseling && (
        <BookingModal
          key={counseling?._id}
          counseling={counseling}
          selectDate={selectDate}
          setCounseling={setCounseling}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default AvailableAppointment;
