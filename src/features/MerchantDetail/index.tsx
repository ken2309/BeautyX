/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Head from "../Head/index";
import Footer from "../Footer";
import HeadTitle from "../HeadTitle/index";
import {
    fetchAsyncOrg,
    fetchOrgGalleries,
    onActiveTab,
} from "../../redux/org/orgSlice";
import {
    fetchAsyncServicesSpecial,
    fetchProductsSpecial,
    onSaveOrgId,
} from "../../redux/org_specials/orgSpecialSlice";
import { fetchAsyncOrgDiscounts } from "../../redux/org_discounts/orgDiscountsSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatOrgParam } from "../../utils/formatParams";
import { STATUS } from "../../redux/status";
import HeadOrg from "./components/HeadOrg";
import useFullScreen from "../../utils/useDeviceMobile";
import OrgDetail from "./components/OrgDetail";
import OrgContainer from "./components/OrgContainer";
import "./style.css";
import { Container } from "@mui/material";
import ModalLoad from "../../components/ModalLoad";
//import { clearServices } from '../../redux/org_services/orgServivesSlice';
//import { clearProducts } from '../../redux/org_products/orgProductsSlice';
import PageNotFound from "../../components/PageNotFound";
import { onSetEmptyChooseCatePr } from "../../redux/org_products/orgProductsSlice";
import { onSetEmptyChooseCate } from "../../redux/org_services/orgServivesSlice";
import "../../assets/styles/main.css";

function MerchantDetail() {
    const IS_MB = useFullScreen();
    const location: any = useLocation();
    const dispatch = useDispatch();
    const param = formatOrgParam(location.pathname);
    const { sub_domain } = param;

    const ORG = useSelector((state: any) => state.ORG);
    const ORG_SPECIALS = useSelector((state: any) => state.ORG_SPECIALS);
    const { SERVICES_SPECIAL, PRODUCTS_SPECIAL, org_id } = ORG_SPECIALS;
    const { status_ser } = SERVICES_SPECIAL;
    const { status_pr } = PRODUCTS_SPECIAL;
    const ORG_DISCOUNTS = useSelector((state: any) => state.ORG_DISCOUNTS);

    const { org, status, tab, GALLERIES } = ORG;
    const callOrgDetail = () => {
        if (sub_domain !== org?.subdomain) {
            dispatch(fetchAsyncOrg(sub_domain));
            dispatch(onActiveTab(1));
            dispatch(onSetEmptyChooseCatePr());
            dispatch(onSetEmptyChooseCate());
            //dispatch(clearServices())
            //dispatch(clearProducts())
        }
    };
    const callGalleriesOrg_DiscountsOrg = () => {
        if (status === STATUS.SUCCESS) {
            if (
                GALLERIES.org_id !== org?.id ||
                GALLERIES.status !== STATUS.SUCCESS
            ) {
                dispatch(fetchOrgGalleries(org?.id));
            }
            if (
                ORG_DISCOUNTS.org_id !== org?.id ||
                ORG_DISCOUNTS.DISCOUNTS.status_list !== STATUS.SUCCESS
            ) {
                const values = { org_id: org?.id };
                dispatch(fetchAsyncOrgDiscounts(values));
            }
        }
    };
    const callOrgSpecial = () => {
        if (status === STATUS.SUCCESS) {
            const values = {
                org_id: org?.id,
                page: 1,
                special: true,
                isEnable: org?.is_momo_ecommerce_enable && true,
            };
            dispatch(onSaveOrgId(org?.id));
            if (org?.id !== org_id || status_ser !== STATUS.SUCCESS) {
                dispatch(fetchAsyncServicesSpecial(values));
            }
            if (org?.id !== org_id || status_pr !== STATUS.SUCCESS) {
                dispatch(fetchProductsSpecial(values));
            }
        }
    };
    useEffect(() => {
        callGalleriesOrg_DiscountsOrg();
        callOrgSpecial();
    }, [status]);
    useEffect(() => {
        callOrgDetail();
    }, [sub_domain]);

    useEffect(() => {
        if (
            ORG_DISCOUNTS.DISCOUNTS.status_list === STATUS.SUCCESS &&
            status_ser === STATUS.SUCCESS &&
            status_pr === STATUS.SUCCESS
        ) {
            if (
                ORG_DISCOUNTS.DISCOUNTS.totalItem === 0 &&
                SERVICES_SPECIAL.totalItem === 0 &&
                PRODUCTS_SPECIAL.totalItem === 0
            ) {
                dispatch(onActiveTab(tab === 1 ? 2 : tab));
            }
        }
    }, [ORG_DISCOUNTS.DISCOUNTS, SERVICES_SPECIAL, PRODUCTS_SPECIAL]);
    return (
        <div className="mb-cnt">
            {status === STATUS.LOADING && <ModalLoad />}
            {!ORG.org && <PageNotFound />}
            <HeadTitle title={org?.name ? org.name : "Đang tải..."} />
            {IS_MB ? <HeadOrg org={org} isShowSearch={true} /> : <Head />}
            {status === STATUS.SUCCESS && (
                <>
                    <OrgDetail
                        org={org}
                        galleries={GALLERIES?.galleries}
                        status_galleries={GALLERIES.status}
                    />
                    <Container>
                        <OrgContainer org={org} tab={tab} />
                    </Container>
                </>
            )}
            <Footer />
        </div>
    );
}

export default MerchantDetail;
