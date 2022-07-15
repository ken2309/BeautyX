import React, { useContext } from "react";
import icon from "../../../constants/icon";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../context/AppProvider";

function Notification(props: any) {
    const { openNo } = props;
    const { USER } = useSelector((state: any) => state.USER);
    const { appsToday } = useSelector((state: any) => state.APP.APPS);
    const { ORDER_SERVICES_NOT_BOOK_COUNT } = useSelector((state: any) => state.ORDER);
    const history = useHistory();
    const { t } = useContext(AppContext);
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
                <span className="hd-noti__head-text">{t("Header.noti")}</span>
                <span className="flex-row hd-noti__head-count  cursor-pointer">
                    {t("Header.mark_all_as_viewed")}
                    <img
                        className="hd-noti__head-imgcheck"
                        src={icon.Check}
                        alt=""
                    />
                </span>
            </div>
            <ul className="hd-noti__list">
                {
                    appsToday.length > 0 &&
                    <li onClick={() => history.push("/lich-hen?tab=1")}>
                        <div className="flex-row">
                            <img
                                style={{ width: "12px", height: "12px" }}
                                src={icon.dotPurple}
                                alt=""
                            />
                            <div className="no-box-item__text">
                                <p className="no-box-item__text-name">
                                    {t("Header.appointment_notice")}
                                </p>
                                <p className="no-box-item__text-content">
                                    {`${t("Header.hello")}! ${
                                        USER?.fullname
                                    }, ${t("Header.today_you_have")}  ${
                                        appsToday.length
                                    } ${t("Header.appointment")}. ${t(
                                        "Header.see_it_now"
                                    )} `}
                                </p>
                                <p className="no-box-item__text-time">
                                    {t("Header.see_calendar")} {">>"}
                                </p>
                            </div>
                        </div>
                    </li>
                }
                {
                    ORDER_SERVICES_NOT_BOOK_COUNT > 0 &&
                    <li onClick={() => history.push("/lich-hen?tab=2")}>
                        <div className="flex-row">
                            <img
                                style={{ width: "12px", height: "12px" }}
                                src={icon.dotPurple}
                                alt=""
                            />
                            <div className="no-box-item__text">
                                <p className="no-box-item__text-name">
                                    Thông báo đặt hẹn
                                </p>
                                <p className="no-box-item__text-content">
                                    {USER?.fullname} ơi ! Bạn có{" "}
                                    {ORDER_SERVICES_NOT_BOOK_COUNT} gói dịch vụ chưa đặt hẹn. Xem ngay nhé
                                </p>
                                <p className="no-box-item__text-time">
                                    Xem dịch vụ
                                </p>
                            </div>
                        </div>
                    </li>
                }
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
