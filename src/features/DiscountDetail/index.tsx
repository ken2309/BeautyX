/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "../Head";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAsyncDiscountDetail,
    onSetItemDiscount,
} from "../../redux/org_discounts/orgDiscountsSlice";
import HeadTitle from "../HeadTitle";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import { Container, Drawer, Tab } from "@mui/material";
import { STATUS } from "../../redux/status";
import "../ServiceDetail/serviceDetail.css";
import "../ProductDetail/product.css";
import "./style.css";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import DiscountDetailLeft from "./components/DiscountDetailLeft";
import DiscountDetailRight from "./components/DiscountDetailRight";
import {
    fetchAsyncServiceCmt,
    fetchAsyncServiceDetail,
} from "../../redux/org_services/serviceSlice";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Review from "../Reviews";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import icon from "../../constants/icon";
import DetailOrgCard from "../ServiceDetail/components/DetailOrgCard";
import useFullScreen from "../../utils/useFullScreen";
import HeadOrg from "../MerchantDetail/components/HeadOrg";
import {
    handleChangeScroll,
    handleScroll,
} from "../ServiceDetail/onScrollChange";
import DetailPolicy from "../ServiceDetail/components/DetailPolicy";
import ReviewsContainer from "../ReviewsContainer";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";

function DiscountDetail() {
    const location: any = useLocation();
    console.log(location.state);
    const { DISCOUNT } = useSelector((state: any) => state.ORG_DISCOUNTS);
    const IS_MB = useFullScreen();
    const discount: IDiscountPar = DISCOUNT.discount;
    const status_detail = DISCOUNT.status;
    const is_mobile = useFullScreen();
    const [open, setOpen] = useState({
        NOW: true,
        open: false,
    });
    const [openAllCmt, setOpenAllCmt] = useState(false);
    const handleOpenSeemoreCmt = () => {
        setOpenAllCmt(true);
    };

    const dispatch = useDispatch();
    const params: any = extraParamsUrl();
    const ORG = useSelector((state: any) => state.ORG);
    const org = ORG.org;

    const { SERVICE, COMMENTS } = useSelector((state: any) => state.SERVICE);
    const values = {
        org_id: params.org_id,
        id: params.dis_id,
    };
    const service = SERVICE.service;

    const callDiscountDetail = () => {
        if (
            status_detail !== STATUS.SUCCESS ||
            discount.id !== parseInt(params.dis_id)
        ) {
            dispatch(fetchAsyncDiscountDetail(values));
        }
    };
    const callOrgDetail = () => {
        if (
            parseInt(params.org_id) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org_id));
        }
    };
    const handleOnSetItemDiscount = () => {
        if (status_detail === STATUS.SUCCESS) {
            const values = discount.items.find(
                (item: IITEMS_DISCOUNT) => item.productable_id == params.item_id
            );
            dispatch(onSetItemDiscount(values));
        }
    };
    const callServiceDetail = () => {
        if (
            parseInt(params.item_id) !== SERVICE.service.id ||
            SERVICE.status !== STATUS.SUCCESS
        ) {
            const values = {
                org_id: params.org_id,
                ser_id: params.item_id,
            };
            dispatch(fetchAsyncServiceDetail(values));
        }
    };
    const callServiceComments = () => {
        if (
            parseInt(params.item_id) !== COMMENTS.service_id ||
            COMMENTS.status_cmt !== STATUS.SUCCESS
        ) {
            const values = {
                type: "SERVICE",
                page: 1,
                id: params.item_id,
                org_id: params.org_id,
            };
            dispatch(fetchAsyncServiceCmt(values));
        }
    };

    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
        { id: 4, title: "Hướng dẫn & Điều khoản" },
    ];

    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    let refMap = useRef<any>();
    let refPolicy = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    const scrollPolicy = refPolicy?.current?.offsetTop;

    // handle onclick active menu
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        const top = handleChangeScroll(
            is_mobile,
            value,
            setValue,
            refDesc,
            refReview,
            refMap,
            refPolicy
        );
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", () =>
            handleScroll(
                is_mobile,
                setValue,
                scrollReview,
                scrollDesc,
                scrollMap,
                scrollPolicy
            )
        );
        return () => {
            window.removeEventListener(
                "scroll",
                () =>
                    handleScroll(
                        is_mobile,
                        setValue,
                        scrollReview,
                        scrollDesc,
                        scrollMap,
                        scrollPolicy
                    ),
                false
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        callDiscountDetail();
        callServiceDetail();
        callServiceComments();
        callOrgDetail();
    }, []);

    useEffect(() => {
        handleOnSetItemDiscount();
    }, [status_detail]);

    return (
        <>
            <HeadTitle
                title={
                    status_detail === "LOADING" ? "Loading..." : discount?.title
                }
            />
            {IS_MB ? <HeadOrg org={ORG.org} /> : <Head />}
            {status_detail === STATUS.SUCCESS && (
                <Container>
                    <div className="service-detail">
                        <div className="service-detail__head">
                            <DiscountDetailLeft
                                org={ORG.org}
                                discount={discount}
                                detail={service}
                            />
                            <DiscountDetailRight
                                org={ORG.org}
                                discount={discount}
                                detail={service}
                            />
                        </div>
                        <div className="service-detail__body">
                            <div className="service-detail__tab">
                                <TabContext value={value}>
                                    <TabList onChange={handleChange}>
                                        {tabs.map((item: any, i: number) => (
                                            <Tab
                                                key={i}
                                                label={item.title}
                                                value={item.id}
                                            />
                                        ))}
                                    </TabList>
                                    <div className="service-detail__tabitem">
                                        <TabPanel value={value}>
                                            <div
                                                ref={refDesc}
                                                className="service-detail__description"
                                            >
                                                <p>
                                                    Mô tả:{" "}
                                                    {service.description
                                                        ? service.description
                                                        : "Đang cập nhật"}
                                                </p>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value}>
                                            <div
                                                ref={refReview}
                                                className="service-detail__comment"
                                            >
                                                <Review
                                                    comments={COMMENTS.comments}
                                                    totalItem={
                                                        COMMENTS.totalItem
                                                    }
                                                    commentable_type={"SERVICE"}
                                                    page={COMMENTS.page}
                                                    id={ORG.org?.id}
                                                    detail_id={service?.id}
                                                    openSeeMoreCmt={
                                                        handleOpenSeemoreCmt
                                                    }
                                                />
                                                {COMMENTS.comments &&
                                                COMMENTS.comments.length >=
                                                    8 ? (
                                                    <div
                                                        style={{
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                        onClick={() => {
                                                            setOpenAllCmt(true);
                                                        }}
                                                        className="seemore-cmt"
                                                    >
                                                        <p>{"Xem tất cả >>"}</p>
                                                    </div>
                                                ) : null}
                                                <ReviewsContainer
                                                    open={openAllCmt}
                                                    setOpen={setOpenAllCmt}
                                                    comments={COMMENTS.comments}
                                                    org_id={ORG.org?.id}
                                                    totalItem={
                                                        COMMENTS.totalItem
                                                    }
                                                    page={COMMENTS.page}
                                                    commentable_type="SERVICE"
                                                />
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value}>
                                            <div
                                                ref={refMap}
                                                className="service-detail__org"
                                            >
                                                {ORG.status ===
                                                    STATUS.SUCCESS && (
                                                    <>
                                                        <p className="service-detail__title">
                                                            Doanh nghiệp
                                                        </p>
                                                        <div className="service-detail__org-mb">
                                                            <DetailOrgCard
                                                                org={ORG?.org}
                                                            />
                                                        </div>
                                                        <OrgInformation
                                                            org={ORG?.org}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value}>
                                            <div ref={refPolicy}>
                                                <DetailPolicy org={org} />
                                            </div>
                                        </TabPanel>
                                    </div>
                                </TabContext>
                            </div>
                        </div>
                        <div className="service-detail__bottom">
                            <button
                                onClick={() => {
                                    setOpen({ NOW: true, open: true });
                                }}
                                style={{ backgroundColor: "var(--orange)" }}
                            >
                                <p>Đặt hẹn ngay</p>
                            </button>
                            <button
                                onClick={() => {
                                    setOpen({ NOW: false, open: true });
                                }}
                                className="btn-addcart"
                            >
                                <img
                                    src={icon.ShoppingCartSimpleWhite}
                                    alt=""
                                />
                                <p>Thêm vào giỏ hàng</p>
                            </button>
                        </div>
                        <Drawer
                            open={open.open}
                            anchor="bottom"
                            onClose={() => setOpen({ ...open, open: false })}
                        >
                            <div className="active-mb">
                                <div className="service-detail">
                                    <DiscountDetailRight
                                        discount={discount}
                                        org={ORG.org}
                                        detail={service}
                                        NOW={open.NOW}
                                    />
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </Container>
            )}
            <Footer />
        </>
    );
}

export default DiscountDetail;