import React, { useState, useContext } from "react";
import { AppContext } from "../../../../context/AppProvider";
import AppointmentDetail from "../../../AppointmentDetail/index";
import { STATUS } from "../../../../utils/statusApp";
import useFullScreen from "../../../../utils/useFullScreen";
import PopupQr from "../../../AppointmentDetail/PopupQr";
import dayjs from "dayjs";

export default function HomeLoggedCalendarAppointmentItem(props: any) {
    const { t } = useContext(AppContext);
    const IS_MB = useFullScreen();
    const { datingList } = props;
    // day of week
    const dateDayjs =
        dayjs()
            .set("date", datingList.date.split("/")[0])
            .set("month", datingList.date.split("/")[1])
            .set("year", datingList.date.split("/")[2])
            .subtract(1, "month")
            .day() + 1;
    const [openPopupDetail, setOpenPopupDetail] = useState(false);
    const [openQr, setOpenQr] = useState(false);
    function handleOpenPopupDetail() {
        setOpenPopupDetail(true);
    }
    const checkdotstt = (stt: any) => {
        switch (stt) {
            case STATUS.ARRIVED:
                return <span className="appointment-status status-dot-green" />;
            case STATUS.CONFIRMED:
                return <span className="appointment-status status-dot-blue" />;
            case STATUS.DONE:
                return <span className="appointment-status status-dot-pink" />;
            case STATUS.CANCEL:
                return <span className="appointment-status status-dot-red" />;
            default:
                return <span className="appointment-status status-dot-red" />;
        }
    };
    return (
        <div>
            <div className="calendar-appointment__item">
                <div className="calendar-appointment__item-row">
                    {!IS_MB && checkdotstt(datingList.status)}
                    <div className="appointment-item-time-mb">
                        <div className="flex-column container">
                            <span
                                style={{ fontSize: "14px" }}
                                className="day-week"
                            >
                                {dateDayjs !== 1
                                    ? `Thứ ${dateDayjs}`
                                    : "Chủ nhật"}
                            </span>
                            <span className="time">
                                {datingList.time_start}
                            </span>
                            <span className="day">{datingList.date}</span>
                        </div>
                    </div>
                    <div className="calendar-appointment__item-column">
                        <div className="calendar-appointment__item-time">
                            <p>{datingList.time_start}</p>
                            <p>{"-"}</p>
                            <p>{datingList.time_end}</p>
                        </div>
                        <p className="calendar-appointment__item-name">
                            {datingList.organization?.name}
                        </p>
                        <p className="calendar-appointment__item-address">
                            {datingList.branch
                                ? datingList.branch?.full_address
                                : datingList.organization?.full_address}
                        </p>
                        <div className="flex-row">
                            {IS_MB && (
                                <button
                                    onClick={() => setOpenQr(true)}
                                    className="calendar-appointment__item-detail"
                                >
                                    Quét mã QR
                                </button>
                            )}
                            <button
                                onClick={handleOpenPopupDetail}
                                className="calendar-appointment__item-detail"
                            >
                                {t("app.details")} {">"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AppointmentDetail
                datingList={datingList}
                openPopupDetail={openPopupDetail}
                setOpenPopupDetail={setOpenPopupDetail}
            />
            <PopupQr
                qr={datingList.qr_link}
                open={openQr}
                setOpen={setOpenQr}
            />
        </div>
    );
}
