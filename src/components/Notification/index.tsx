import React from 'react';
import { Dialog } from '@mui/material';
import ButtonLoading from '../ButtonLoading';
import './style.css'

interface IProps {
    open: boolean,
    content: string,
    titleBtnLeft?: string,
    titleBtnRight?: string,
    onClickLeft?: () => void
    onClickRight?: () => void

}

function Notification(props: IProps) {
    const {
        open,
        content,
        titleBtnLeft,
        titleBtnRight,
        onClickLeft,
        onClickRight
    } = props;
    const onClickBtnLeft = () => {
        if (onClickLeft) {
            onClickLeft()
        }
    }
    const onClickBtnRight = () => {
        if (onClickRight) {
            onClickRight()
        } else {

        }
    }
    return (
        <Dialog
            open={open}
        >
            <div className='flex-column notification'>
                <span className="title">Thông báo</span>
                <div className="content">
                    {content}
                </div>
                <div className="control">
                    <ButtonLoading
                        title={titleBtnLeft}
                        loading={false}
                        onClick={onClickBtnLeft}
                    />
                    <ButtonLoading
                        title={titleBtnRight}
                        loading={false}
                        onClick={onClickBtnRight}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default Notification;