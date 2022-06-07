/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Head from "../Head";
import { Container } from "@mui/material";
import DetailCard from "../ProductDetail/components/DetailCard";
import { useLocation } from "react-router-dom";
import DetailHead from "../ProductDetail/components/DetailHead";
import "./serviceDetail.css";
import HeadTitle from "../HeadTitle";
import Footer from "../Footer";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncServiceDetail, fetchAsyncServiceCmt } from '../../redux/org_services/serviceSlice';
import { fetchAsyncOrg } from '../../redux/org/orgSlice'
import { STATUS } from '../../redux/status'

function ServiceDetail(props: any) {
    const location: any = useLocation();
    const dispatch = useDispatch();
    const ORG = useSelector((state: any) => state.ORG);
    const { SERVICE, COMMENTS } = useSelector((state: any) => state.SERVICE);
    const params: any = extraParamsUrl();
    const callServiceDetail = () => {
        if (parseInt(params.id) !== SERVICE.service.id || SERVICE.status !== STATUS.SUCCESS) {
            const values = {
                org_id: params.org,
                ser_id: params.id
            }
            dispatch(fetchAsyncServiceDetail(values))
        }
    }
    const callOrgDetail = () => {
        if (parseInt(params.org) !== ORG.org?.id || ORG.status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrg(params.org))
        }
    }
    const callServiceComments = () => {
        if (parseInt(params.id) !== COMMENTS.service_id || COMMENTS.status_cmt !== STATUS.SUCCESS) {
            const values = {
                type: "SERVICE",
                page: 1,
                id: params.id,
                org_id: params.org
            }
            dispatch(fetchAsyncServiceCmt(values))
        }
    }
    useEffect(() => {
        if (!location.state) {
            callServiceDetail()
            callOrgDetail()
        }
        callServiceComments()
    }, [])

    const service = location.state ? location.state.service : SERVICE.service;
    const org = location.state ? location.state.org : ORG.org;

    return (
        <div className="dealhot-service__detail">
            <div className="product">
                <HeadTitle
                    title={
                        service?.service_name
                            ? service.service_name
                            : "Loading..."
                    }
                />
                <Head />
                <Container>
                    <div className="product-cnt">
                        <DetailHead
                            product={service}
                            org={org}
                            //listServices={services}
                            is_type={2}
                        />
                        <DetailCard
                            org={org}
                            product={service}
                            is_type={2}
                            loading={false}
                        />
                    </div>
                    {/* <RecommendList
                        org={org}
                        //list={services}
                        is_type={2}
                    /> */}
                </Container>
                <Footer />
            </div>
        </div>
    );
}

export default ServiceDetail;
