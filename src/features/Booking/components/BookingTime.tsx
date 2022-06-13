import React from 'react';
import DatePicker from '../../../components/DatePicker/index';
import TimePicker from '../../../components/TimePicker';
import { Dialog } from '@mui/material'
import useFullScreen from '../../../utils/useFullScreen';
import HeadMobile from '../../HeadMobile';
import { Transition } from '../../../utils/transition';

function BookingTime(props: any) {
    const { open, setOpen, bookTime, setBookTime } = props;
    const IS_MB = useFullScreen();
    const onChangeDatePicker = (e: any) => {
        setBookTime({ ...bookTime, date: e })
    }
    const onChangeTimePicker = (time: string) => {
        setBookTime({ ...bookTime, time: time })
    }
    return (
        <Dialog
            fullScreen={IS_MB ? true : false}
            open={open}
            onClose={() => setOpen(false)}
            TransitionComponent={Transition}
        >
            <div className="flex-column book-time-cnt">
                {IS_MB && <HeadMobile title='Chọn thời gian' />}
                <div className="flex-row-sp book-time-cnt__wrap">
                    <div className="book-time__date">
                        <DatePicker
                            onChange={(e) => onChangeDatePicker(e)}
                        />
                    </div>
                    <div className="book-time__time">
                        <TimePicker
                            onChange={(e) => onChangeTimePicker(e)}
                        />
                    </div>
                </div>
                {
                    (bookTime.date && bookTime.time) &&
                    <button
                        onClick={() => setOpen(false)}
                        className='book-time__btn'>
                        Xác nhận thời gian
                    </button>
                }
            </div>
        </Dialog>
    );
}

export default BookingTime;