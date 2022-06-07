/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Head from "../Head";
import { Container, Tab } from "@mui/material";
import DetailCard from "../ProductDetail/components/DetailCard";
import { useLocation } from "react-router-dom";
import DetailHead from "../ProductDetail/components/DetailHead";
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
import OrgReviews from "../MerchantDetail/components/OrgPages/OrgReviews";

function ServiceDetail(props: any) {
    const location: any = useLocation();
    const dispatch = useDispatch();
    const ORG = useSelector((state: any) => state.ORG);
    const { SERVICE, COMMENTS } = useSelector((state: any) => state.SERVICE);
    const params: any = extraParamsUrl();
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
        if (!location.state) {
            callServiceDetail();
            callOrgDetail();
        }
        callServiceComments();
    }, []);

    const service = location.state ? location.state.service : SERVICE.service;
    const org = location.state ? location.state.org : ORG.org;

    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
    ];
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        setValue(value);
        // let top;
        // switch (value) {
        //     case 1:
        //         top =  0;
        //         break;
        //     case 6:
        //         top = refReview?.current?.offsetTop + 180;
        //         break;
        //     default:
        //         break;
        // }
        // if (is_mb) {
        //     window.scrollTo({
        //         top: top,
        //         behavior: "smooth",
        //     });
        // }
    };
    // const onSwitchTab = (value: any) => {
    //     switch (value) {
    //         case 1:
    //             return <p>tab 1</p>;
    //         case 2:
    //             return <OrgInformation org={org} />;
    //         case 3:
    //             return (
    //                 // <Review
    //                 //     comments={comments}
    //                 //     totalItem={totalItem}
    //                 //     commentable_type={"SERVICE"}
    //                 //     id={org.id}
    //                 // />
    //                 <></>
    //             );
    //     }
    // };
    return (
        <>
            <HeadTitle
                title={
                    service?.service_name ? service.service_name : "Loading..."
                }
            />
            <Head />
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
                                        <div className="service-detail__description">
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
                                                comments={COMMENTS.comments}
                                                totalItem={COMMENTS.totalItem}
                                                commentable_type={"SERVICE"}
                                                id={ORG.org?.id}
                                                detail_id={service?.id}
                                            />
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div className="org-information-cnt">
                                            {/* <OrgInformation
                                                // refMap={refMap}
                                                org={org}
                                            /> */}
                                            {/* <OrgReviews
                                                // refReview={refReview}
                                                org={org}
                                            /> */}
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <>tab 3</>
                                    </TabPanel>
                                </div>
                            </TabContext>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default ServiceDetail;
