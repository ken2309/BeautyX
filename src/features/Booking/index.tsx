/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeadTitle from "../HeadTitle";
import Head from "../Head";
import "./style.css";
import onErrorImg from "../../utils/errorImg";
import ServiceBookItem from "./components/ServiceItem";
import { useHistory, useLocation } from "react-router-dom";
import { addServiceBookNow } from "../../redux/servicesBookSlice";
import icon from "../../constants/icon";
import ButtonLoading from "../../components/ButtonLoading";
import BookingTime from "./components/BookingTime";
import dayjs from "dayjs";
import Footer from "../Footer";
import order from "../../api/orderApi";
import { pickBy, identity } from "lodash";
import HeadMobile from "../HeadMobile";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../../rootComponents/flatForm";
import PaymentMethodCpn from "../PaymentMethod/index";
import { formatDatePost } from "../../utils/formatDate";
import { extraPaymentMethodId } from "../PaymentMethod/extraPaymentMethodId";
import MapOrg from "../MerchantDetail/components/OrgMap/MapOrg";
import BookingNowBill from "./components/BookingNowBill";
import { formatAddCart } from "../../utils/cart/formatAddCart";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { STATUS } from "../../redux/status";
import apointmentApi from "../../api/apointmentApi";
import Notification from "../../components/Notification";
import { onSetStatusApp } from "../../redux/appointment/appSlice";
import AlertSnack from "../../components/AlertSnack";

// ==== api tracking ====
//import tracking from "../../api/trackApi";
import { formatProductList } from "../../utils/tracking";
import { onRefreshServicesNoBookCount } from "../../redux/order/orderSlice";
import useDeviceMobile from "../../utils/useDeviceMobile";
// end
const date = dayjs();
function Booking() {
    const dispatch = useDispatch();
    const { SERVICES_BOOK } = useSelector((state: any) => state);
    const { org, status } = useSelector((state: any) => state.ORG);
    const IS_MB = useDeviceMobile();
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const [openAlertSnack, setOpenAlertSnack] = useState({
        title: "",
        open: false,
    });
    const [openNoti, setOpenNoti] = useState({
        title: "",
        open: false,
        titleLeft: "",
        titleRight: "",
        onClickLeft: () => { },
        onClickRight: () => { },
    });
    const { USER } = useSelector((state: any) => state.USER);
    const { payments_method } = useSelector(
        (state: any) => state.PAYMENT.PAYMENT
    );
    const branchRef = useRef<any>();
    const history = useHistory();
    const location: any = useLocation();

    const callOrgDetail = () => {
        if (location.state.org.id !== org?.id || status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrg(location.state.org.id));
        }
    };
    useEffect(() => {
        if (location.state) {
            callOrgDetail();
            const action = {
                org: location.state.org,
                services: location.state.services,
            };
            dispatch(addServiceBookNow(action));
        } else {
            history.push("/home");
        }
    }, [location.state]);
    const { servicesBook } = SERVICES_BOOK;
    console.log(servicesBook)
    const branches = org?.branches?.concat(org);
    const [open, setOpen] = useState(false);
    const [chooseE_wall, setChooseE_wall] = useState<any>();
    const [bookTime, setBookTime] = useState({
        date: date.format("DD-MM-YYYY"),
        time: null,
        note: "",
        branch_id: null,
    });
    const services = servicesBook.map((item: any) => {
        return {
            id: item.service?.id,
            quantity: item.quantity,
        };
    });
    const [seatAmount, SetSeatAmount] = useState(services[0]?.quantity||1);
    const onDropBranchList = () => {
        branchRef?.current?.classList?.toggle("drop-show-branches");
    };
    const onChooseBranch = (item: any) => {
        onDropBranchList();
        setBookTime({
            ...bookTime,
            branch_id: item.subdomain ? null : item.id,
        });
    };
    const listCouponCode = servicesBook
        ?.map((item: any) => item?.service)
        ?.map((i: any) => i?.discount)
        ?.map((j: any) => j?.coupon_code)
        ?.filter(Boolean);

    //
    const payment_method_id = extraPaymentMethodId(payments_method, chooseE_wall);
    const params_string = {
        products: [],
        services: services,
        treatment_combo: [],
        payment_method_id: payment_method_id,
        coupon_code: listCouponCode.length > 0 ? listCouponCode : [],
        description: "",
        branch_id: bookTime.branch_id,
    };
    const listPayment = location.state?.services.map((item: any) => {
        const is_type = 2;
        const sale_price =
            item.service?.special_price > 0
                ? item.service?.special_price
                : item.service?.price;
        const values = formatAddCart(
            item.service,
            org,
            is_type,
            item.quantity,
            sale_price,
            item.service.discount
        );
        return values;
    });

    const dayBook = formatDatePost(bookTime.date);
    const action = {
        note: '[ Số lượng người: '+seatAmount+' ] '+bookTime.note,
        time_start: `${dayBook} ${bookTime.time}:00`,
        branch_id: bookTime.branch_id,
        order_id: location.state.order_id,
        service_ids: services?.map((item: any) => item?.id),
    };
    async function handlePostOrder() {
        const params = pickBy(params_string, identity);
        try {
            //tracking.PAY_CONFIRM_CLICK(org?.id, formatProductList(params.products))
            const response = await order.postOrder(org?.id, params);
            const state_payment = await response.data.context;
            const transaction_uuid =
                state_payment.payment_gateway.transaction_uuid;
            if (response.data.context.status !== "CANCELED") {
                const actionAfter = {
                    ...action,
                    org_id: org?.id,
                    order_id: response.data.context.id,
                    quantity: services[0]?.quantity,
                };
                history.push({
                    pathname: `/trang-thai-don-hang/`,
                    search: transaction_uuid,
                    state: { state_payment, actionAfter, listPayment },
                });
            } else {
                setOpenNoti({
                    open: true,
                    title: "Tạo đơn hàng thất bại",
                    titleLeft: "Đã hiểu",
                    titleRight: "Về trang chủ",
                    onClickLeft: () =>
                        setOpenNoti({ ...openNoti, open: false }),
                    onClickRight: () => history.push("/home"),
                });
            }
            //setLoading(false);
        } catch (err) {
            console.log(err);
            setOpenNoti({
                open: true,
                title: "Tạo đơn hàng thất bại",
                titleLeft: "Đã hiểu",
                titleRight: "Về trang chủ",
                onClickLeft: () => setOpenNoti({ ...openNoti, open: false }),
                onClickRight: () => history.push("/home"),
            });
        }
    }
    //func appointment
    const gotoAppointment = () => {
        dispatch(onSetStatusApp());
        history.push("/lich-hen?tab=1");
    };
    const handlePostApps = async () => {
        try {
            await apointmentApi.postAppointment(action, org?.id);
            dispatch(onRefreshServicesNoBookCount())
            setOpenNoti({
                open: true,
                title: "Đặt hẹn thành công",
                titleLeft: "Xem lịch hẹn",
                titleRight: "Về trang chủ",
                onClickLeft: () => gotoAppointment(),
                onClickRight: () => history.push("/home"),
            });
        } catch (error) {
            console.log(error);
            setOpenNoti({
                open: true,
                title: "Có lỗi xảy ra trong quá trình đặt hẹn",
                titleLeft: "Đã hiểu",
                titleRight: "Về trang chủ",
                onClickLeft: () => setOpenNoti({ ...openNoti, open: false }),
                onClickRight: () => history.push("/home"),
            });
        }
    };
    const onChangeCardMap = (itemMap: any) => {
        setBookTime({
            ...bookTime,
            branch_id: itemMap.subdomain ? null : itemMap.id,
        });
    };
    const handleSeatsAmount = (props:any) => {
        switch(props){
            case 'asc':
                SetSeatAmount(seatAmount+1);
                break;
            case 'desc':
                SetSeatAmount(seatAmount-1);
                break;
            default:
                break;
        }
    }

    const handleBooking = () => {
        if (USER) {
            if (bookTime.time) {
                if (location.state.TYPE === "BOOK_NOW") {
                    if (FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX) {
                        if (chooseE_wall) return handlePostOrder();
                        else {
                            setOpenAlertSnack({
                                ...openAlertSnack,
                                open: true,
                                title: 'Bạn Chưa chọn phương thức thanh toán!'
                            })
                        }
                    } else {
                        return handlePostOrder();
                    }
                } else {
                    handlePostApps();
                }
            } else {
                //pop up choose time request
                setOpenAlertSnack({
                    ...openAlertSnack,
                    open: true,
                    title: 'Bạn cần chọn Thời Gian cho buổi hẹn!'
                })
            }
        } else {
            history.push("/sign-in?1");
        }
    };
    return (
        <>
            <AlertSnack
                title={openAlertSnack.title}
                open={openAlertSnack.open}
                status="FAIL"
                onClose={() => setOpenAlertSnack({
                    ...openAlertSnack, open: false
                })}
            />
            <HeadTitle title="Đặt hẹn" />
            {IS_MB ? <HeadMobile title="Đặt hẹn" /> : <Head />}
            <div className="booking-wrap">
                <div className="booking-cnt">
                    <div className="booking-cnt__left">
                        {IS_MB === false && org && (
                            <MapOrg
                                onChangeCardMap={onChangeCardMap}
                                org={org}
                            />
                        )}
                    </div>
                    <div className="booking-cnt__right">
                        <div className="booking-cnt__right-org">
                            <img
                                src={org?.image_url}
                                onError={(e) => onErrorImg(e)}
                                alt=""
                                className="org-avt"
                            />
                            <div className="book-org-detail">
                                <p className="org-name">{org?.name}</p>
                                <p className="org-address">
                                    {org?.full_address}
                                </p>
                            </div>
                        </div>
                        <div className="booking-cnt__right-services">
                            <ul className="booking-service-list">
                                {servicesBook.map(
                                    (item: any, index: number) => (
                                        <li key={index}>
                                            <ServiceBookItem
                                                org={org}
                                                service={item}
                                            />
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="booking-cnt__right-branches">
                            <span className="book-section-title">Địa điểm</span>
                            <div className="branch-drop">
                                <div
                                    onClick={onDropBranchList}
                                    className="flex-row-sp branch-choose"
                                >
                                    <span className="flex-row">
                                        <img
                                            style={{ marginRight: "4px" }}
                                            src={icon.mapPinRed}
                                            alt=""
                                        />
                                        {bookTime.branch_id
                                            ? org?.branches?.find(
                                                (i: any) =>
                                                    i.id ===
                                                    bookTime.branch_id
                                            )?.full_address
                                            : org?.full_address}
                                    </span>
                                    {org?.branches?.length > 0 && (
                                        <img
                                            src={icon.arrowDownPurple}
                                            alt=""
                                        />
                                    )}
                                </div>
                                {org?.branches?.length > 0 && (
                                    <ul ref={branchRef} className="branch-list">
                                        {branches?.map(
                                            (item: any, index: number) => (
                                                <li
                                                    onClick={() =>
                                                        onChooseBranch(item)
                                                    }
                                                    style={
                                                        bookTime.branch_id ===
                                                            item.id
                                                            ? {
                                                                color: "var(--text-black)",
                                                            }
                                                            : {}
                                                    }
                                                    key={index}
                                                >
                                                    {item?.full_address}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="flex-row-sp booking-cnt__right-time">
                            <div className="book-time">
                                <span className="book-section-title">
                                    Thời gian
                                </span>
                                {bookTime.time && bookTime.time ? (
                                    <span>
                                        {bookTime.date} {bookTime.time}
                                    </span>
                                ) : (
                                    <span style={{ color: "var(--red-cl)" }}>
                                        Vui lòng chọn thời gian
                                    </span>
                                )}
                            </div>
                            <ButtonLoading
                                title="Chọn"
                                onClick={() => setOpen(true)}
                                loading={false}
                            />
                        </div>
                        <div className="flex-row-sp booking-cnt__right-time">
                            <div className="book-seats-amount">
                                <span className="book-section-title">
                                    Số lượng người
                                </span>
                                <div className="seats_amount-cnt">
                                    <button className="desc" disabled={(seatAmount === 1)?true:false} onClick={()=>handleSeatsAmount('desc')}>{'-'}</button>
                                    <div className="book-section-title amount">{seatAmount}</div>
                                    <button className="asc"  disabled={(seatAmount >= 10 && seatAmount<=services[0]?.quantity)?true:false} onClick={()=>handleSeatsAmount('asc')}>{'+'}</button>
                                </div>
                            </div>

                        </div>
                        <div className="booking-cnt__right-time">
                            <span className="book-section-title">Ghi chú</span>
                            <br />
                            <textarea
                                onChange={(e) =>
                                    setBookTime({
                                        ...bookTime,
                                        note: e.target.value,
                                    })
                                }
                                name=""
                                id=""
                                cols={30}
                                rows={5}
                            ></textarea>
                        </div>
                        <div
                            style={
                                FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX &&
                                    location.state.TYPE === "BOOK_NOW"
                                    ? { display: "block" }
                                    : { display: "none" }
                            }
                        >
                            <PaymentMethodCpn
                                e={chooseE_wall}
                                onPaymentMethodChange={setChooseE_wall}
                            />
                        </div>
                        <div className="booking-cnt__bot">
                            {location.state.TYPE === "BOOK_NOW" && (
                                <BookingNowBill />
                            )}
                            <ButtonLoading
                                title={
                                    location.state?.TYPE === "BOOK_NOW"
                                        ? "Thanh toán và đặt hẹn ngay"
                                        : "Đặt hẹn ngay"
                                }
                                loading={false}
                                onClick={handleBooking}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <BookingTime
                bookTime={bookTime}
                setBookTime={setBookTime}
                open={open}
                setOpen={setOpen}
                org={org}
            />
            <Notification
                content={openNoti.title}
                open={openNoti.open}
                titleBtnLeft={openNoti.titleLeft}
                titleBtnRight={openNoti.titleRight}
                onClickLeft={openNoti.onClickLeft}
                onClickRight={openNoti.onClickRight}
            />
            <Footer />
        </>
    );
}

export default Booking;
