import React from "react";
import range from "lodash-es/range";
import { STATUS } from "../../../../utils/statusApp";
import dayjs from "dayjs";
interface IHomeLoggedCalendarComponent {
    weekDays: any;
    weekDayOfFirst: any;
    weekDayOfLast: any;
    thisYear: any;
    thisMonth: any;
    daysInMonth: any;
    dayObjOfFirstMonth: any;
    dayObjOfLastMonth: any;
    dotAppoint: any;
    datepick: any;
    handleGetDate: any;
    handleAppoint: any;
}
export default function HomeLoggedCalendarComponent(
    props: IHomeLoggedCalendarComponent
) {
    const {
        weekDays,
        // todayObj,
        weekDayOfFirst,
        weekDayOfLast,
        thisYear,
        thisMonth,
        daysInMonth,
        dayObjOfFirstMonth,
        dayObjOfLastMonth,
        // handleAppoint,
        dotAppoint,
        datepick,
        handleGetDate,
    } = props;
    const checkdate = (
        i: number,
        thisMonth: any,
        thisYear: any,
        dotAppoint: any
    ) => {
        let newdate = [
            i <= 8 ? `0${i + 1}` : `${i + 1}`,
            thisMonth + 1 < 10 ? `0${thisMonth + 1}` : `${thisMonth + 1}`,
            `${thisYear}`,
        ].join("/");
        const datesttArray = dotAppoint.filter(
            (dot: any) => dot.date === newdate
        );
        return datesttArray;
    };

    const checkdotstt = (stt: any) => {
        switch (stt) {
            case STATUS.DONE:
                return <span className="status-dot status-dot-pink" />;
            case STATUS.CONFIRMED:
                return <span className="status-dot status-dot-blue" />;
            case STATUS.ARRIVED:
                return <span className="status-dot status-dot-green" />;
            case STATUS.CANCEL:
                return <span className="status-dot status-dot-red" />;
            default:
                return <span className="status-dot status-dot-red" />;
        }
    };
    return (
        <>
            <div className="calendar">
                <div className="week-container">
                    {weekDays.map((d: any) => (
                        <div className="week-cell" key={d}>
                            {d}
                        </div>
                    ))}
                </div>

                <div className="day-container">
                    {
                        // weekDayOfFirst thứ của ngày đầu tiên của tháng
                        // tính số ngày dư của tháng trước trong tuần đầu tiên
                        // mặc định t2 t3 t4 t5 t6 t7 CN (0 -> 6)
                        range(weekDayOfFirst).map((i: number) => (
                            <div className="day-cell day-cell--faded" key={i}>
                                {dayObjOfFirstMonth
                                    .subtract(weekDayOfFirst - i, "day")
                                    .date()}
                            </div>
                        ))
                    }
                    {/*  daysInMonth : 30 range [0 -> 29]  */}
                    {/* handleGetDate(ngày, tháng, năm) kết quả */}
                    {range(daysInMonth).map((i: number) => (
                        <div
                            // click active
                            onClick={() =>
                                handleGetDate(i, thisMonth, thisYear)
                            }
                            className={`day-cell day-cell--in-month dot-active${
                                i + 1 === datepick.date &&
                                thisMonth === datepick.month &&
                                thisYear === datepick.year
                                    ? " day-cell--today-cur "
                                    : ""
                            }
                
                ${
                    i + 1 === dayjs().date() &&
                    thisMonth === dayjs().month() &&
                    thisYear === dayjs().year()
                        ? " day-cell--today"
                        : ""
                }
                `}
                            key={i}
                        >
                            <div className="status-dots ">
                                {checkdate(
                                    i,
                                    thisMonth,
                                    thisYear,
                                    dotAppoint
                                ).map((dot: any, index: number) => (
                                    <span key={index}>
                                        {checkdotstt(dot.status)}
                                    </span>
                                ))}
                            </div>
                            {i + 1}
                        </div>
                    ))}
                    {/* weekDayOfLast thứ ngày cuối cùng của tháng dựa vào ngày chủ nhật */}
                    {/* ví dụ ngày cuối cùng là thứ 5 -> ngày xám là 3 ngày t6 t7 cn */}
                    {/* 0 1 2 3 -> thứ của tuần cuối cùng  */}
                    {/* 4 5 6 là thứ của tuần tháng tiếp theo */}
                    {/* range(7 - weekDayOfLast) lấy 7 ngày từ cho số thứ ngày cuối cùng của tháng */}
                    {/* {dayObjOfLastMonth.add(i + 1, "day").date()} cộng 1 vì thứ 2 là 0 */}
                    {range(13 - weekDayOfLast).map((i: number) => (
                        <div className="day-cell day-cell--faded" key={i}>
                            {dayObjOfLastMonth.add(i + 1, "day").date()}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
