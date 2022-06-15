import React from 'react';
import dayjs from "dayjs";

interface IProps {
    onChangeItem: (e: string) => void,
    Time: any,
    disablePrev?: boolean,
    t: any,
    setT: (t: any) => void
}

function TimeItem(props: IProps) {
    const { Time, onChangeItem, disablePrev, setT, t } = props;
    const now = dayjs();
    const hourNow = now.format("HH");
    const minuteNow = now.format("mm");

    let disableItem = false;
    if (disablePrev === true) {
        if (Time.format("HH") < hourNow) {
            disableItem = true
        } else if (Time.format("HH") === hourNow && Time.format('mm') < minuteNow) {
            disableItem = true
        }
    }
    const chooseTimeClick = () => {
        if (disableItem === false) {
            onChangeItem(Time.format('HH:mm'))
            setT(Time.format('HH:mm'))
        }
    }

    return (
        <div
            onClick={chooseTimeClick}
            className="date-pk__item"
        >
            <div
                style={
                    disableItem === true ?
                        {
                            backgroundColor: "var(--text-hover)",
                            color: "var(--bgWhite)"
                        }
                        :
                        {}
                }
                className={Time.format("HH:mm") === t ? "date-pk__item-box time-act" : "date-pk__item-box"}
            >
                {Time.format('HH:mm')}
            </div>
        </div>
    );
}

export default TimeItem;