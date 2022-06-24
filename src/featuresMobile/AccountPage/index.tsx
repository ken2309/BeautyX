import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import icon from "../../constants/icon";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import Bottom from "../Bottom";
import "./accountPage.css";
import AccountForm from "./Components/AccountForm";
import DialogChangeInfo from "./Components/DialogChangeInfo";
import OrderMb from "./Components/Orders";

export default function AccountMobile() {
    const { USER } = useSelector((state: any) => state.USER);
    const params: any = extraParamsUrl();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const openAcc = params?.address ? true : false;
    const openOrder = params?.order ? true : false;
    const refOrder: any = useRef();
    const handleToggle = () => {
        refOrder.current.classList.toggle("active");
        history.push('/tai-khoan/lich-su-mua?order=true')
    };
    const gotoAppointment = () => {
        const prevUrl = '/tai-khoan/thong-tin-ca-nhan';
        history.push({
            pathname: "/lich-hen",
            state: { prevUrl }
        })
    }
    const gotoAddress = () => {
        history.push("/tai-khoan/thong-tin-ca-nhan?address=true")
    }
    return (
        <div className="accountMobile">
            {
                USER &&
                <DialogChangeInfo USER={USER} open={open} setOpen={setOpen} />
            }
            {/* top */}
            <div className="accountMobile-top">
                <div className="accountMobile-top__img">
                    <img src={USER?.avatar} alt="" />
                </div>
                <div className="accountMobile-top__info">
                    <p className="accountMobile-top__name">{USER?.fullname}</p>
                    <div className="accountMobile-top__phone">
                        <img src={icon.phoneWhite} alt="" />
                        <span>{USER?.telephone}</span>
                    </div>
                    <div className="accountMobile-top__email">
                        <img src={icon.emailWhite} alt="" />
                        <span>{USER?.email}</span>
                    </div>
                </div>
                <div
                    onClick={() => setOpen(true)}
                    className="accountMobile-top__edit"
                >
                    <p>Sửa</p>
                    <img src={icon.editWhiteAcc} alt="" />
                </div>
            </div>
            {/* mid */}
            <div className="accountMobile-mid">
                <ul className="accountMobile-mid__list">
                    <li
                        onClick={() => {
                            handleToggle();
                        }}
                        className="accountMobile-mid__item"
                    >
                        <div className="item-left__wrap">
                            <div className="item-left">
                                <div>
                                    <img src={icon.boxAcc} alt="" />
                                </div>
                                <span>Đơn hàng</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                        <div ref={refOrder} className="item-bot__wrap">
                            <div className="item-bot__item">
                                <img src={icon.tickBlue} alt="" />
                                <span>Đã thanh toán</span>
                            </div>
                            <div className="item-bot__item">
                                <img src={icon.xCircleRed} alt="" />
                                <span>Đã hủy</span>
                            </div>
                        </div>
                    </li>
                    <li className="accountMobile-mid__item">
                        <div
                            onClick={gotoAppointment}
                            className="item-left__wrap"
                        >
                            <div className="item-left">
                                <div>
                                    <img src={icon.calendarAcc} alt="" />
                                </div>
                                <span>Lịch hẹn</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                    </li>
                    <li className="accountMobile-mid__item">
                        <div className="item-left__wrap">
                            <div className="item-left">
                                <div>
                                    <img src={icon.heartAcc} alt="" />
                                </div>
                                <span>Đang theo dõi</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                    </li>
                    <li className="accountMobile-mid__item">
                        <div
                            onClick={gotoAddress}
                            className="item-left__wrap"
                        >
                            <div className="item-left">
                                <div>
                                    <img src={icon.markerAcc} alt="" />
                                </div>
                                <span>Địa chỉ giao hàng</span>
                            </div>
                            <img src={icon.arownAcc} alt="" />
                        </div>
                    </li>
                </ul>
            </div>
            {/* bot */}
            <div className="accountMobile-bot">
                <div className="accountMobile-bot__tutorial">
                    <img src={icon.book} alt="" />
                    <p>Hướng dẩn sử dụng</p>
                </div>
            </div>
            <Bottom />
            <AccountForm open={openAcc} />
            <OrderMb openOrder={openOrder} />
        </div>
    );
}
