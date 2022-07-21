import React, { useContext, useEffect } from "react";
import "./popupSuccess.css";
import icon from "../../constants/icon";
import { Dialog } from "@mui/material";
import ButtonCus from "../../components/ButtonCus";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

function PopupSuccess(props: any) {
    const history = useHistory();
    const { t } = useContext(AppContext);
    const { popup, setPopup, title, useInPayment } = props;
    const handleClose = () => {
        setPopup(false);
    };
    useEffect(() => {
        if (popup === true && !useInPayment) {
            const timer = setTimeout(() => {
                handleClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [popup]);
    const goBack = () => {
        setPopup(false);
        history.push("/");
    };
    const gotoBooking = () => {
        setPopup(false);
        history.push("/popup");
    };
    return (
        <Dialog open={popup}>
            <div className="flex-column pu-success">
                <img className="pu-success__img" src={icon.success} alt="" />
                <p style={{ color: "unset" }} className="pu-success__title">
                    <span className="pu-success__title">{title}</span>
                </p>
                <div
                    style={
                        useInPayment === true
                            ? { display: "block" }
                            : { display: "none" }
                    }
                    className="pu-success__booking"
                >
                    <div className="flex-row">
                        <ButtonCus
                            borderRadius="18px"
                            margin="16px 16px 0px 0px"
                            text={t("pm.later")}
                            color="var(--purple)"
                            backColor="var(--bg-color)"
                            onClick={goBack}
                        />
                        <ButtonCus
                            borderRadius="18px"
                            margin="16px 0px 0px 16px"
                            text={t("pm.booking_now")}
                            color="var(--bg-color)"
                            backColor="var(--purple)"
                            onClick={gotoBooking}
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default PopupSuccess;
