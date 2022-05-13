import React from 'react';
import dayjs from "dayjs";
import TimeItem from './components/TimeItem';
import './timePicker.css';

interface IProps {
      onChange: (e: string) => void
}

function TimePicker(props: IProps) {
      const { onChange } = props;
      let times = 25;
      var rows = [];
      var hours = dayjs().set("hour", 8).set("minute", 0).set("second", 0);
      for (var i = 0; i <= times; i++) {
            if (i !== 8 && i !== 9) {
                  rows.push(
                        <TimeItem
                              key={i}
                              Time={hours}
                              onChangeItem={(e) => onChange(e)}
                        // Now={now}
                        // handleClick={handleTime}
                        // activeTime={activeTime}
                        // activeDate={activeDate}
                        />
                  );
            }
            hours = hours.add(30, "minute");
      }
      return (
            <div className="time-pk">
                  {rows}
            </div>
      );
}

export default TimePicker;