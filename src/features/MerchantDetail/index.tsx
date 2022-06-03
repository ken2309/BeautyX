/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Head from "../Head/index";
import "./merchantDetail.css";
import { Container } from "@mui/material";
import DetailHead from "./components/DetailHead";
import DetailMer from "./components/DetailMer";
import DetailBranchList from "./components/DetailBranchList";
import DetailSaleList from "./components/DetailSaleList";
import ServiceByMerchant from "../ServiceByMerchant/index";
import ProductByMerchant from "../ProductByMerchant/index";
import ComboByMerchant from "../ComboByMerchant/index";
import SaleByMerchant from "../SaleByMerchant";
import Footer from "../Footer";
import DetailTab from "./components/DetailTab";
import DetailTabMb from "../../featuresMobile/DetailTabMb";
import MerchantMb from "../../featuresMobile/MerchantMb";
import HeadTitle from "../HeadTitle/index";
import { fetchAsyncOrg, fetchOrgGalleries } from '../../redux/org/orgSlice';
import { fetchAsyncServicesSpecial, fetchProductsSpecial } from '../../redux/org_specials/orgSpecialSlice'
import { useDispatch, useSelector } from 'react-redux';
import { formatOrgParam } from "../../utils/formatParams";
import { STATUS } from '../../redux/status';


function MerchantDetail() {
  const location: any = useLocation();
  const dispatch = useDispatch();
  const sub_domain = formatOrgParam(location.pathname);
  const ORG = useSelector((state: any) => state.ORG);
  const ORG_SPECIALS = useSelector((state: any) => state.ORG_SPECIALS);
  const { SERVICES_SPECIAL, PRODUCTS_SPECIAL } = ORG_SPECIALS;

  const { org, status, tab, GALLERIES } = ORG;
  const callOrgDetail = () => {
    if (sub_domain !== org?.subdomain) {
      dispatch(fetchAsyncOrg(sub_domain))
    }
  }
  const callGalleriesOrg = () => {
    if (status === STATUS.SUCCESS) {
      if (GALLERIES.org_id !== org?.id || GALLERIES.status !== STATUS.SUCCESS) {
        dispatch(fetchOrgGalleries(org?.id))
      }
    }
  }
  const callOrgSpecial = () => {
    if (status === STATUS.SUCCESS) {
      const values = {
        org_id: org?.id,
        page: 1
      }
      dispatch(fetchAsyncServicesSpecial(values));
      dispatch(fetchProductsSpecial(values))
    }
  }
  useEffect(() => {
    callGalleriesOrg()
    callOrgSpecial()
  }, [status])
  useEffect(() => {
    callOrgDetail()
  }, [sub_domain])
  console.log(sub_domain);
  return (
    <div className="mb-cnt">
      <HeadTitle title={org?.name ? org.name : 'Đang tải...'} />
      <Head />
      <DetailHead
        status={status}
        org={org}
      />
      <DetailTab tab={tab} />
      <DetailTabMb tab={tab} />
      <div
        className="tabMer-detail"
        style={{ backgroundColor: "var(--bg-gray)", paddingBottom: "64px" }}
      >
        <Container>
          {
            tab === 1 &&
            <>
              <DetailMer org={org} />
              <MerchantMb org={org} />
              <DetailBranchList branches={org?.branches} />
              {
                SERVICES_SPECIAL.totalItem > 0 &&
                PRODUCTS_SPECIAL.totalItem > 0 &&
                <DetailSaleList org={org} />
              }
            </>
          }
          <SaleByMerchant activeTab={tab} org={org} />
          <ServiceByMerchant activeTab={tab} />
          <ProductByMerchant activeTab={tab} />
          <ComboByMerchant activeTab={tab} />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default MerchantDetail;
