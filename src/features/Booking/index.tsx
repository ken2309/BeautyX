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
import useFullScreen from "../../utils/useFullScreen";
import { EXTRA_FLAT_FORM } from "../../api/extraFlatForm";
import { FLAT_FORM_TYPE } from "../../rootComponents/flatForm";
import PaymentMethodCpn from "../PaymentMethod/index";
import { formatDatePost } from "../../utils/formatDate";
import { extraPaymentMethodId } from "../PaymentMethod/extraPaymentMethodId";
import MapOrg from "../MerchantDetail/components/OrgMap/MapOrg";
import BookingNowBill from "./components/BookingNowBill";

const date = dayjs();
function Booking() {
    const { SERVICES_BOOK } = useSelector((state: any) => state);
    const IS_MB = useFullScreen();
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const { USER } = useSelector((state: any) => state.USER);
    const { payments_method } = useSelector(
        (state: any) => state.PAYMENT.PAYMENT
    );
    const branchRef = useRef<any>();
    const history = useHistory();
    const dispatch = useDispatch();
    const location: any = useLocation();
    useEffect(() => {
        if (location.state) {
            const action = {
                org: location.state.org,
                services: location.state.services,
            };
            dispatch(addServiceBookNow(action));
        } else {
            history.push("/home");
        }
    }, [location.state]);
    const { org, servicesBook } = SERVICES_BOOK;
    const branches = org?.branches.concat(org);
    //const [branch, setChooseBranch] = useState<any>();
    const [open, setOpen] = useState(false);
    const [chooseE_wall, setChooseE_wall] = useState<any>();
    const [bookTime, setBookTime] = useState({
        date: date.format("DD-MM-YYYY"),
        time: null,
        note: "",
        branch_id: null,
    });
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
    const services = servicesBook.map((item: any) => {
        return {
            id: item.service.id,
            quantity: item.quantity,
        };
    });

    //
    const payment_method_id = extraPaymentMethodId(
        payments_method,
        chooseE_wall
    );
    const params_string = {
        products: [],
        services: services,
        treatment_combo: [],
        payment_method_id: payment_method_id,
        coupon_code: listCouponCode.length > 0 ? listCouponCode : [],
        description: "",
        branch_id: bookTime.branch_id,
    };
    //console.log(params_string)
    async function handlePostOrder() {
        //setLoading(true)
        const dayBook = formatDatePost(bookTime.date);
        const params = pickBy(params_string, identity);
        try {
            const response = await order.postOrder(org?.id, params);
            const state_payment = await response.data.context;
            const desc = await state_payment.payment_gateway.description;
            const transaction_uuid =
                state_payment.payment_gateway.transaction_uuid;
            if (response.data.context.status !== "CANCELED") {
                const action = {
                    note: "",
                    time_start: `${dayBook} ${bookTime.time}:00`,
                    branch: bookTime.branch_id,
                    org_id: org?.id,
                    order_id: response.data.context.id,
                    service_ids: services?.map((item: any) => item?.id),
                    quantity: services[0].quantity,
                };
                history.push({
                    pathname: `/trang-thai-don-hang/${desc}`,
                    search: transaction_uuid,
                    state: { state_payment, action },
                });
            } else {
                //setPopUpFail(true)
            }
            //setLoading(false);
        } catch (err) {
            console.log(err);
            //setLoading(false);
        }
    }
    const onChangeCardMap = (itemMap: any) => {
        setBookTime({
            ...bookTime,
            branch_id: itemMap.subdomain ? null : itemMap.id,
        });
    };

    const handleBooking = () => {
        if (USER) {
            if (bookTime.time) {
                if (location.state.TYPE === "BOOK_NOW") {
                    if (FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX) {
                        if (chooseE_wall) return handlePostOrder();
                    } else {
                        return handlePostOrder();
                    }
                } else {
                    //run post appointment
                }
            } else {
                //pop up choose time request
            }
        } else {
            history.push("/sign-in?1");
        }
    };
    return (
        <>
            <HeadTitle title="Đặt hẹn" />
            {IS_MB ? <HeadMobile title="Đặt hẹn" /> : <Head />}
            <div
                className="booking-wrap"
            >
                <div className="booking-cnt">
                    <div className="booking-cnt__left">
                        {/* {org && (
                            <MapOrg
                                onChangeCardMap={onChangeCardMap}
                                org={org}
                            />
                        )} */}
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
                                    <span style={{ color: "var(--red-cl)" }} >Vui lòng chọn thời gian</span>
                                )}
                            </div>
                            <ButtonLoading
                                title="Chọn"
                                onClick={() => setOpen(true)}
                                loading={false}
                            />
                        </div>
                        <div className="booking-cnt__right-time">
                            <span className="book-section-title">Ghi chú</span>
                            <br />
                            <textarea
                                name=""
                                id=""
                                cols={30}
                                rows={1}
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
                            <BookingNowBill />
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
            />
            <Footer />
        </>
    );
}

export default Booking;
