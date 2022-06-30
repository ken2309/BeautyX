/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "../Head";
import { Container, Drawer, Tab } from "@mui/material";
import "./serviceDetail.css";
import HeadTitle from "../HeadTitle";
import Footer from "../Footer";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { useDispatch, useSelector } from "react-redux";
import ServiceDetailLeft from "./components/ServiceDetailLeft";
import ServiceDetailRight from "./components/ServiceDetailRight";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
    fetchAsyncServiceDetail,
    fetchAsyncServiceCmt,
} from "../../redux/org_services/serviceSlice";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { STATUS } from "../../redux/status";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import Review from "../Reviews";
import icon from "../../constants/icon";
import DetailOrgCard from "./components/DetailOrgCard";
import useFullScreen from "../../utils/useFullScreen";
import HeadOrg from "../MerchantDetail/components/HeadOrg";
import DetailPolicy from "./components/DetailPolicy";
import DetailRecommend from "./components/DetailRecommend";
import { handleScroll, handleChangeScroll } from "./onScrollChange";
import ReviewsContainer from "../ReviewsContainer";
import ModalLoad from "../../components/ModalLoad";
import PageNotFound from "../../components/PageNotFound";
import { useHistory } from "react-router-dom";

function ServiceDetail(props: any) {
    const dispatch = useDispatch();
    const IS_MB = useFullScreen();
    const ORG = useSelector((state: any) => state.ORG);
    const { SERVICE, COMMENTS } = useSelector((state: any) => state.SERVICE);
    const params: any = extraParamsUrl();
    const history = useHistory();

    const is_mobile = useFullScreen();
    const service = SERVICE.service;
    const org = ORG.org;
    const [open, setOpen] = useState({
        NOW: true,
        open: false,
    });
    const [openAllCmt, setOpenAllCmt] = useState(false);
    const handleOpenSeemoreCmt = () => {
        setOpenAllCmt(true);
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
    // call api service detail
    const callServiceDetail = () => {
        if (
            parseInt(params.id) !== SERVICE.service.id ||
            SERVICE.org_id !== params.org ||
            SERVICE.status !== STATUS.SUCCESS
        ) {
            const values = {
                org_id: params.org,
                ser_id: params.id,
            };
            dispatch(fetchAsyncServiceDetail(values));
        }
    };
    // call api org detail
    const callOrgDetail = () => {
        if (
            parseInt(params.org) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org));
        }
    };
    // call api service comment
    const callServiceComments = () => {
        if (
            parseInt(params.id) !== COMMENTS.service_id ||
            COMMENTS.status_cmt !== STATUS.SUCCESS
        ) {
            const values = {
                type: "SERVICE",
                page: 1,
                id: params.id,
                org_id: params.org,
            };
            dispatch(fetchAsyncServiceCmt(values));
        }
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
        callServiceDetail();
        callOrgDetail();
        callServiceComments();

    }, [params.id]);

    const handleBack = () => {
        history.goBack();
        //console.log(params)
        const values = {
            org_id: params.org,
            ser_id: params.id,
        };
        if (params.org && params.id) {
            dispatch(fetchAsyncServiceDetail(values));
        }
    }

    return (
        <>
            {SERVICE.status === STATUS.LOADING && <ModalLoad />}
            {SERVICE.status === STATUS.FAIL && <PageNotFound />}
            {/* title page servive */}
            <HeadTitle
                title={
                    service?.service_name ? service.service_name : "Loading..."
                }
            />
            {IS_MB ? <HeadOrg onBackFunc={handleBack} org={org} /> : <Head />}
            {
                SERVICE.status === STATUS.SUCCESS &&
                <Container>
                    {/* service detail */}
                    <div className="service-detail">
                        {/* service head detail */}
                        <div className="service-detail__head">
                            <ServiceDetailLeft org={org} service={service} />
                            <ServiceDetailRight
                                org={org}
                                service={service}
                                NOW={open.NOW}
                            />
                        </div>
                        {/* service body */}
                        <div className="service-detail__body">
                            {/* service tab detail */}
                            <div className="service-detail__tab">
                                {/* service tab menu */}
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
                                        {/* description */}
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

                                        {/* comment */}
                                        <TabPanel value={value}>
                                            <div
                                                ref={refReview}
                                                className="service-detail__comment"
                                            >
                                                <Review
                                                    comments={COMMENTS.comments}
                                                    totalItem={COMMENTS.totalItem}
                                                    commentable_type={"SERVICE"}
                                                    id={ORG.org?.id}
                                                    page={COMMENTS.page}
                                                    detail_id={service?.id}
                                                    openSeeMoreCmt={
                                                        handleOpenSeemoreCmt
                                                    }
                                                />
                                                {COMMENTS.comments &&
                                                    COMMENTS.comments.length >= 8 ? (
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
                                                    totalItem={COMMENTS.totalItem}
                                                    page={COMMENTS.page}
                                                    commentable_type="SERVICE"
                                                />
                                            </div>
                                        </TabPanel>

                                        {/* org */}
                                        <TabPanel value={value}>
                                            <div
                                                ref={refMap}
                                                className="service-detail__org"
                                            >
                                                {ORG.status === STATUS.SUCCESS && (
                                                    <>
                                                        <p className="service-detail__title">
                                                            Doanh nghiệp
                                                        </p>
                                                        <div className="service-detail__org-mb">
                                                            <DetailOrgCard
                                                                org={org}
                                                            />
                                                        </div>
                                                        <OrgInformation org={org} />
                                                    </>
                                                )}
                                            </div>
                                        </TabPanel>

                                        {/* policy */}
                                        <TabPanel value={value}>
                                            <div ref={refPolicy}>
                                                <DetailPolicy org={org} />
                                            </div>
                                        </TabPanel>
                                    </div>
                                </TabContext>
                            </div>
                            <DetailRecommend org={org} />
                        </div>
                        {/* service bottom buttom add cart */}
                        <div className="service-detail__bottom">
                            {
                                (service?.is_momo_ecommerce_enable && org?.is_momo_ecommerce_enable) ?
                                    <>
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
                                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                                            <p>Thêm vào giỏ hàng</p>
                                        </button>
                                        {/* drawer service detail */}
                                        <Drawer
                                            open={open.open}
                                            anchor="bottom"
                                            onClose={() => setOpen({ ...open, open: false })}
                                        >
                                            <div className="active-mb">
                                                <div className="service-detail">
                                                    <ServiceDetailRight
                                                        service={service}
                                                        org={org}
                                                        setOpenDrawer={setOpen}
                                                        NOW={open.NOW}
                                                    />
                                                </div>
                                            </div>
                                        </Drawer>
                                    </>
                                    :
                                    <span className="detail-right__no">
                                        Dịch vụ này chưa được kích hoạt bán hàng Online
                                    </span>
                            }
                        </div>
                    </div>
                </Container>
            }
            {/* footer */}
            <Footer />
        </>
    );
}

export default ServiceDetail;
