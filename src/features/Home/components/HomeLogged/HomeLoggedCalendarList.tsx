import React, { useContext } from "react";
import range from "lodash-es/range";
import HomeLoggedCalendarAppointment from "./HomeLoggedCalendarAppointment";
import { AppContext } from "../../../../context/AppProvider";
import HomeLoggedCalendarDayWeek from './HomeLoggedCalendarDayWeek';

export default function HomeLoggedCalendarList(props: any) {
  const {
    weekDayOfFirst,
    weekDayOfLast,
    thisYear,
    thisMonth,
    daysInMonth,
    dayObjOfFirstMonth,
    dayObjOfLastMonth,
    datepick,
    handleGetDate,
    datingList,
    daysInWeek,
    dotAppoint,
  } = props;
  // const fixed = document.querySelector(".week-container__right");
  // document.addEventListener("scroll", () => {
  //   let scrollY = window.scrollY;
  //   if (scrollY >= 300) {
  //     fixed?.classList.add("week-container__right-ac");
  //   } else {
  //     fixed?.classList.remove("week-container__right-ac");
  //   }
  // });
  
  const { t } = useContext(AppContext);
  const checkdate = (
    i: number,
    thisMonth: any,
    thisYear: any,
    dotAppoint: any
  ) => {
    let newdate = [
      i <= 8 ? `0${i + 1}` : `${i + 1}`,
      thisMonth + 1 <= 10 ? `0${thisMonth + 1}` : `${thisMonth + 1}`,
      `${thisYear}`,
    ].join("/");
    const datesttArray = dotAppoint.filter((dot: any) => dot.date === newdate);
    return datesttArray;
  };
  const checkdotstt = (stt: any) => {
    switch (stt) {
      case "CONFIRMED":
        return <span className="status-dot status-dot-green" />;
      case "ARRIVED":
        return <span className="status-dot status-dot-green" />;
      case "NEW":
        return <span className="status-dot status-dot-blue" />;
      case "ONLINE_BOOKING":
        return <span className="status-dot status-dot-blue" />;
      case "DONE":
        return <span className="status-dot status-dot-pink" />;
      case "CANCEL":
        return <span className="status-dot status-dot-red" />;
      case "NOT COME":
        return <span className="status-dot status-dot-red" />;
      default:
        break;
    }
  };
  const weekDays = [
    { d: t("Home.Sunday"), date: daysInWeek[0] },
    { d: t("Home.Monday"), date: daysInWeek[1] },
    { d: t("Home.Tuesday"), date: daysInWeek[2] },
    { d: t("Home.Wednesday"), date: daysInWeek[3] },
    { d: t("Home.Thursday"), date: daysInWeek[4] },
    { d: t("Home.Friday"), date: daysInWeek[5] },
    { d: t("Home.Saturday"), date: daysInWeek[6] },
  ];
  const weekDaysMb = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  return (
    <div className="homelogged-calendar__right">
      <div className="week-container week-container__right">
        <div className="week-pc">
          <div className="flex-row-sp">
            {weekDays.map((d: any, index: number) => (
              <HomeLoggedCalendarDayWeek
                key={index}
                date={d}
                dotAppoint={dotAppoint}
              />
            ))}
          </div>
        </div>
        <div className="week-mb">
          <div className="flex-row-sp">
            {weekDaysMb.map((d: any, index: number) => (
              <div className="week-cell" key={index}>
                {d.d}
              </div>
            ))}
          </div>
        </div>

        <div className="day-container w-100">
          {dayObjOfLastMonth.date() > 6
            ? ""
            : range(weekDayOfFirst).map((i) => (
              <div className="day-cell day-cell--faded" key={i}>
                {dayObjOfFirstMonth
                  .subtract(weekDayOfFirst - i, "day")
                  .date()}
              </div>
            ))}
          {
            // eslint-disable-next-line array-callback-return
            range(daysInMonth).map((i) => {
              if (
                i >= dayObjOfFirstMonth.date() - 1 &&
                i <= dayObjOfLastMonth.date() - 1
              ) {
                return (
                  <div
                    onClick={() => handleGetDate(i, thisMonth, thisYear)}
                    className={`week-day__right day-cell day-cell--in-month dot-active${i + 1 === datepick.date &&
                      thisMonth === datepick.month &&
                      thisYear === datepick.year
                      ? " day-cell--today border-none week-day__right "
                      : ""
                      }`}
                    key={i}
                  >
                    <div className="status-dots ">
                      {checkdate(i, thisMonth, thisYear, dotAppoint).map(
                        (dot: any, index: any) => (
                          <div key={index}>{checkdotstt(dot.status)}</div>
                        )
                      )}
                    </div>
                    {i + 1}
                  </div>
                );
              }
            })
          }

          {dayObjOfFirstMonth.date() >= 26
            ? range(6 - weekDayOfLast).map((i) => (
              <div className="day-cell day-cell--faded " key={i}>
                {dayObjOfLastMonth.add(i + 1, "day").date()}
              </div>
            ))
            : ""}
        </div>
      </div>

      <HomeLoggedCalendarAppointment
        datingList={datingList}
        daysInWeek={daysInWeek}
      />
    </div>
  );
}
