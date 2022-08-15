import React from "react";
import dayjs from "dayjs";

interface IProps {
    onChangeItem: (e: string) => void;
    Time: any;
    disablePrev?: boolean;
    t: any;
    setT: (t: any) => void;
    bookTime: any;
}

function TimeItem(props: IProps) {
    const { Time, onChangeItem, disablePrev, setT, t, bookTime } = props;
    const now = dayjs();
    const hourNow = now.format("HH");
    const minuteNow = now.format("mm");
    let disableItem = false;

    // if (disablePrev === true) {
    //     if (Time.format("HH") < hourNow) {
    //         disableItem = true
    //         console.log('disableItem', disableItem)
    //     } else if (Time.format("HH") === hourNow && Time.format('mm') < minuteNow) {
    //         disableItem = true
    //     }
    // }
    const timePicNew = bookTime.date.split("-");

    const pickTime = dayjs()
        .set("date", timePicNew[0])
        .set("month", timePicNew[1])
        .set("year", timePicNew[2]);

    if (pickTime.get("date") > now.get("date")) {
        disableItem = false;
    } else if (pickTime.get("month") > now.get("month") + 1) {
        disableItem = false;
    } else {
        if (Time.format("HH") < hourNow) {
            disableItem = true;
        } else if (
            Time.format("HH") === hourNow &&
            Time.format("mm") < minuteNow
        ) {
            disableItem = true;
        }
    }

    const chooseTimeClick = () => {
        if (disableItem === false) {
            onChangeItem(Time.format("HH:mm"));
            setT(Time.format("HH:mm"));
        }
    };

    return (
        <div onClick={chooseTimeClick} className="date-pk__item">
            <div
                style={
                    disableItem === true
                        ? {
                              backgroundColor: "var(--text-hover)",
                              color: "var(--bgWhite)",
                              border: "1px solid transparent",
                              cursor: "not-allowed",
                          }
                        : {}
                }
                className={
                    Time.format("HH:mm") === t
                        ? "date-pk__item-box time-act"
                        : "date-pk__item-box"
                }
            >
                {Time.format("HH:mm")}
            </div>
        </div>
    );
}

export default TimeItem;
