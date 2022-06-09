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
import { fetchAsyncOrg, onActiveTab } from "../../redux/org/orgSlice";
import { STATUS } from "../../redux/status";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import Review from "../Reviews";
import icon from "../../constants/icon";
import DetailOrgCard from "./components/DetailOrgCard";
import useFullScreen from "../../utils/useFullScreen";
import HeadOrg from '../MerchantDetail/components/HeadOrg';

function ServiceDetail(props: any) {
    const dispatch = useDispatch();
    const IS_MB = useFullScreen();
    const ORG = useSelector((state: any) => state.ORG);
    const { SERVICE, COMMENTS } = useSelector((state: any) => state.SERVICE);
    const params: any = extraParamsUrl();

    const service = SERVICE.service;
    const org = ORG.org;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
    ];

    let refMap = useRef<any>();
    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;

    const handleChange = (event: React.SyntheticEvent, value: any) => {
        dispatch(onActiveTab(value));
        let top;
        switch (value) {
            case 1:
                setValue(value);
                top = refDesc?.current?.offsetTop - 72;
                break;
            case 2:
                top = refReview?.current?.offsetTop - 72;
                setValue(value);
                break;
            case 3:
                top = refMap?.current?.offsetTop - 72;
                break;
            default:
                break;
        }
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };

    function handleScroll() {
        if (window.scrollY + 120 <= scrollReview) {
            dispatch(onActiveTab(1));
            setValue(1);
        } else if (
            window.scrollY + 120 >= scrollDesc &&
            window.scrollY + 120 <= scrollMap
        ) {
            dispatch(onActiveTab(2));
            setValue(2);
        } else if (window.scrollY + 120 >= scrollReview) {
            dispatch(onActiveTab(3));
            setValue(3);
        }
    }

    const callServiceDetail = () => {
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

    const callOrgDetail = () => {
        if (
            parseInt(params.org) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org));
        }
    };

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
        callServiceDetail();
        callOrgDetail();
        callServiceComments();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <>
            <HeadTitle
                title={
                    service?.service_name ? service.service_name : "Loading..."
                }
            />
            {IS_MB ? <HeadOrg org={org} /> : <Head />}
            <Container>
                <div className="service-detail">
                    <div className="service-detail__head">
                        <ServiceDetailLeft org={org} service={service} />
                        <ServiceDetailRight org={org} service={service} />
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
                                        {/* {onSwitchTab(value)} */}
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
                                        <div className="service-detail__comment">
                                            <Review
                                                refReview={refReview}
                                                comments={COMMENTS.comments}
                                                totalItem={COMMENTS.totalItem}
                                                commentable_type={"SERVICE"}
                                                id={ORG.org?.id}
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
                                                        <DetailOrgCard org={org} />
                                                    </div>
                                                    <OrgInformation org={org} />
                                                </>
                                            )}
                                        </div>
                                    </TabPanel>
                                </div>
                            </TabContext>
                        </div>
                    </div>

                    <div className="service-detail__button">
                        <button>
                            <p>Buy now</p>
                        </button>
                        <button
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="btn-addcart"
                        >
                            <p>Add to cart</p>
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                        </button>
                    </div>

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
            </Container>
            <Footer />
        </>
    );
}

export default ServiceDetail;
