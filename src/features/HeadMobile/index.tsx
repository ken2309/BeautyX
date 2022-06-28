import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import icon from '../../constants/icon';

interface IProps {
    title: string,
    prevUrl?:string,
    onBack?: (back: boolean) => void,
    handleCancelPayment?: () => void,
    element?: any,
}


function HeadMobile(props: IProps) {
    const { title, onBack, handleCancelPayment, element,prevUrl } = props;
    const location: any = useLocation()

    const history = useHistory();
    const onBackClick = () => {
        if (handleCancelPayment) {
            handleCancelPayment()
        }
        if (onBack) {
            return onBack(false)
        }
        if (location?.state?.payment_url) {
            history.push("/");
        }
        if(prevUrl){
            history.push(prevUrl)
        }
        else {
            history.goBack()
        }
    }
    return (
        <div style={{ ...style.headCnt, position: "fixed", zIndex: "100" }} className="flex-row-sp head-mobile">
            <button
                onClick={onBackClick}
                style={style.headBtn}
            >
                <img src={icon.chevronLeft} alt="" />
            </button>
            <span style={style.headTitle} className="title">
                {title}
            </span>
            {
                element ? element : <div style={{ width: "24px", height: "24px" }} ></div>
            }
        </div>
    );
}

export default HeadMobile;

const style = {
    headCnt: {
        padding: "6px 12px",
        backgroundColor: "var(--white)",
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
        top: 0,
        left: 0,
        right: 0
    },
    headTitle: {
        fontSize: "18px",
        lineHeight: "34px",
        fontWeight: 700,
        color: "var(--text-black)"
    },
    headBtn: {
        border: "none",
        outline: "none",
        backgroundColor: "transparent"
    }
}