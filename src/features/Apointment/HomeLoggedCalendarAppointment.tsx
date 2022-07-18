import React from "react";
import HomeLoggedCalendarAppointmentList from "./HomeLoggedCalendarAppointmentList";

interface IAppointment {
  datingList: any;
  daysInWeek: any;
}

const getDateOfDating = (dating: any) => {
  const date = dating.date;
  const firstSlashIndex = date.indexOf("/");
  return Number(date.slice(0, firstSlashIndex));
};

export default function HomeLoggedCalendarAppointment(props: IAppointment) {
  const { datingList, daysInWeek } = props;
  const getDatingListAsDate = () => {
    const list: any = [];

        // eslint-disable-next-line array-callback-return
      daysInWeek.map((day: number, i: number) => {
      if (datingList.some((dating: any) => getDateOfDating(dating) === day)) {
        list[i] = [];
        // eslint-disable-next-line array-callback-return
        datingList.map((dating: any) => {
          if (getDateOfDating(dating) === day) list[i].push(dating);
        });
      } else {
        list[i] = undefined;
      }
    });
    return list;
  };

  return (
    <div className="calendar-appointment">
      <HomeLoggedCalendarAppointmentList datingList={getDatingListAsDate()} />
    </div>
  );
}
