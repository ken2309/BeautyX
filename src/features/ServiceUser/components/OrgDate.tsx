import React from 'react';
import DatePicker from '../../../components/DatePicker';

function OrgDate(props: any) {
      const { open, setOpen, dataBook, setDataBook } = props;

      const handleChangeDate = (e: string) => {
            setOpen({ ...open, oDate: !open.oDate })
            setDataBook({
                  ...dataBook,
                  date: e
            })
      }

      return (
            <>
                  <div
                        style={
                              open.oDate === true ?
                                    { opacity: 1, top: '50px', visibility: 'visible' }
                                    :
                                    { opacity: 0, top: '80px', visibility: 'hidden', zIndex: 'inherit' }
                        }
                        className="ser-choose-date"
                  >
                        <DatePicker
                              onChange={(e) => handleChangeDate(e)}
                        />
                  </div>
                  <div
                        className={open.oDate ? "back-drop_layout open" : "back-drop_layout"}
                        onClick={() => setOpen({ ...open, oDate: !open.oDate })}
                  ></div>
            </>
      );
}

export default OrgDate;