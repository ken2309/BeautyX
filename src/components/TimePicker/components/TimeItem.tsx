import React from 'react';

interface IProps {
      onChangeItem: (e: string) => void,
      Time: any
}

function TimeItem(props: IProps) {
      const { Time, onChangeItem } = props;
      const chooseTimeClick = () => {
            onChangeItem(Time.format('HH:mm'))
      }
      return (
            <div
                  onClick={chooseTimeClick}
                  className="date-pk__item"
            >
                  <div className="date-pk__item-box">
                        {Time.format('HH:mm')}
                  </div>
            </div>
      );
}

export default TimeItem;