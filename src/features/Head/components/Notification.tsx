import React from "react";
import icon from "../../../constants/icon";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function Notification(props: any) {
    const { openNo } = props;
    const { USER } = useSelector((state: any) => state.USER);
    const { appsToday } = useSelector((state: any) => state.APP.APPS);
    const history = useHistory();
    return (
        <div
            style={
                openNo === true
                    ? { top: "3rem", opacity: "1", visibility: "visible" }
                    : { top: "5rem", opacity: "0", visibility: "hidden" }
            }
            className="hd-noti"
            id="notification"
        >
            <div className="flex-row-sp hd-noti__head">
                <span className="hd-noti__head-text">Thông báo</span>
                <span className="flex-row hd-noti__head-count  cursor-pointer">
                    Đánh dấu tất cả đã xem
                    <img
                        className="hd-noti__head-imgcheck"
                        src={icon.Check}
                        alt=""
                    />
                </span>
            </div>
            <ul className="hd-noti__list">
                {appsToday.length > 0 ? (
                    <li onClick={() => history.push("/lich-hen?tab=1")}>
                        <div className="flex-row">
                            <img
                                style={{ width: "12px", height: "12px" }}
                                src={icon.dotPurple}
                                alt=""
                            />
                            <div className="no-box-item__text">
                                <p className="no-box-item__text-name">
                                    Thông báo lịch hẹn
                                </p>
                                <p className="no-box-item__text-content">
                                    {USER?.fullname} ơi ! Hôm nay bạn có{" "}
                                    {appsToday.length} lịch hẹn. Xem ngay nhé
                                </p>
                                <p className="no-box-item__text-time">
                                    Xem lịch hẹn
                                </p>
                            </div>
                        </div>
                    </li>
                ) : (
                    <p className="noti-empty">Bạn không có thông báo !</p>
                )}
            </ul>
            {/* <ButtonCus
                width='fit-content'
                text='Xem tất cả thông báo'
                fontSize='14px'
                lineHeight='20px'
                color='var(--purple)'
                border='solid 1px var(--purple)'
                borderRadius='26px'
                imgIcon={icon.next}
                onClick={() => history.push('/notifications')}
            /> */}
        </div>
    );
}

export default Notification;
