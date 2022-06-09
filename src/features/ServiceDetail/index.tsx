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

function ServiceDetail(props: any) {
    const dispatch = useDispatch();
    const IS_MB = useFullScreen();
    const ORG = useSelector((state: any) => state.ORG);
    const { SERVICE, COMMENTS } = useSelector((state: any) => state.SERVICE);
    const params: any = extraParamsUrl();
    const is_mobile = useFullScreen();
    const service = SERVICE.service;
    const org = ORG.org;
    const [open, setOpen] = useState(false);
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
        let top;
        switch (value) {
            case 1:
                // header height: 49, menu height: 48, padding top: 16px = 113
                if (is_mobile) {
                    top = refDesc?.current?.offsetTop - 113;
                } else {
                    top = refDesc?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            case 2:
                if (is_mobile) {
                    top = refReview?.current?.offsetTop - 113;
                } else {
                    top = refReview?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            case 3:
                if (is_mobile) {
                    top = refMap?.current?.offsetTop - 113;
                } else {
                    top = refMap?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            case 4:
                if (is_mobile) {
                    top = refPolicy?.current?.offsetTop - 113;
                } else {
                    top = refPolicy?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            default:
                break;
        }
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };

    // handle scroll active menu
    function handleScroll() {
        if (is_mobile) {
            if (window.scrollY + 113 < scrollReview) {
                setValue(1);
            } else if (
                window.scrollY + 113 > scrollDesc &&
                window.scrollY + 113 < scrollMap
            ) {
                setValue(2);
            } else if (
                window.scrollY + 113 > scrollReview &&
                window.scrollY + 113 < scrollPolicy
            ) {
                setValue(3);
            } else if (window.scrollY + 113 > scrollMap) {
                setValue(4);
            }
        } else {
            if (window.scrollY + 72 < scrollReview) {
                setValue(1);
            } else if (
                window.scrollY + 72 > scrollDesc &&
                window.scrollY + 72 < scrollMap
            ) {
                setValue(2);
            } else if (
                window.scrollY + 72 > scrollReview &&
                window.scrollY + 72 < scrollPolicy
            ) {
                setValue(3);
            } else if (window.scrollY + 72 > scrollMap) {
                setValue(4);
            }
        }
    }

    // call api service detail
    const callServiceDetail = () => {
        console.log(params.id, SERVICE.service.id);
        if (
            parseInt(params.id) !== SERVICE.service.id ||
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
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        callServiceDetail();
        callOrgDetail();
        callServiceComments();
    }, [params.id]);

    return (
        <>
            {/* title page servive */}
            <HeadTitle
                title={
                    service?.service_name ? service.service_name : "Loading..."
                }
            />
            {IS_MB ? <HeadOrg org={org} /> : <Head />}
            <Container>
                {/* service detail */}
                <div className="service-detail">
                    {/* service head detail */}
                    <div className="service-detail__head">
                        <ServiceDetailLeft org={org} service={service} />
                        <ServiceDetailRight org={org} service={service} />
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
                                                totalItem={COMMENTS.totalItem}
                                                commentable_type={"SERVICE"}
                                                id={ORG.org?.id}
                                                page={COMMENTS.page}
                                                detail_id={service?.id}
                                            />
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div
                                            ref={refMap}
                                            className="service-detail__org"
                                        >
                                            {ORG.status === STATUS.SUCCESS && (
                                                <>
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
                    {/* service bottom buttom add cart                                             */}
                    <div className="service-detail__bottom">
                        <button>
                            <p>Mua ngay</p>
                        </button>
                        <button
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="btn-addcart"
                        >
                            <p>Thêm vào giỏ hàng</p>
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                        </button>
                        {/* drawer service detail */}
                        <Drawer
                            open={open}
                            anchor="bottom"
                            onClose={() => setOpen(false)}
                        >
                            <div className="active-mb">
                                <div className="service-detail">
                                    <ServiceDetailRight
                                        service={service}
                                        org={org}
                                    />
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </div>
            </Container>
            {/* footer */}
            <Footer />
        </>
    );
}

export default ServiceDetail;
