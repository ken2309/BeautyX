import React from 'react';

function HomeLoggedCalendarDayWeek(props: any) {
      const { date } = props
      return (
            <div className="week-cell">
                  {date.d}
            </div>
      );
}

export default HomeLoggedCalendarDayWeek;