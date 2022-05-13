import React from "react";
import Bottom from "../Bottom/index";
import HomeLoggedCalendar from "../../features/Home/components/HomeLogged/HomeLoggedCalendar";
// import BackButton from '../../components/BackButton';
import Head from "../../features/Head";
import Footer from "../../features/Footer";

function Calendar(props: any) {
  return (
    <>
      <div className="calender-wrap">
        <Head />
      </div>
      <div>
        <HomeLoggedCalendar />
      </div>
      <Bottom />
      <div className="calender-wrap">
        <Footer />
      </div>

    </>
  );
}

export default Calendar;
