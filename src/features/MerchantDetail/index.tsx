/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Head from "../Head/index";
import Footer from "../Footer";
import HeadTitle from "../HeadTitle/index";
import { fetchAsyncOrg, fetchOrgGalleries, onActiveTab } from '../../redux/org/orgSlice';
import { fetchAsyncServicesSpecial, fetchProductsSpecial } from '../../redux/org_specials/orgSpecialSlice'
import { useDispatch, useSelector } from 'react-redux';
import { formatOrgParam } from "../../utils/formatParams";
import { STATUS } from '../../redux/status';
import HeadOrg from "./components/HeadOrg";
import useFullScreen from "../../utils/useFullScreen";
import OrgDetail from "./components/OrgDetail";
import OrgContainer from "./components/OrgContainer";
import './style.css';
import { Container } from '@mui/material';
import { extraParamsUrl } from "../../utils/extraParamsUrl";


function MerchantDetail() {
  const IS_MB = useFullScreen();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const param = formatOrgParam(location.pathname);
  const { sub_domain } = param;


  const ORG = useSelector((state: any) => state.ORG);
  const ORG_SPECIALS = useSelector((state: any) => state.ORG_SPECIALS);
  const { SERVICES_SPECIAL, PRODUCTS_SPECIAL } = ORG_SPECIALS;

  const { org, status, tab, GALLERIES } = ORG;
  const callOrgDetail = () => {
    if (sub_domain !== org?.subdomain) {
      dispatch(fetchAsyncOrg(sub_domain))
      dispatch(onActiveTab(1))
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
  return (
    <div className="mb-cnt">
      <HeadTitle title={org?.name ? org.name : 'Đang tải...'} />
      {IS_MB ? <HeadOrg org={org} /> : <Head />}
      <OrgDetail
        org={org}
        galleries={GALLERIES?.galleries}
      />
      <Container>
        <OrgContainer org={org} tab={tab} />
      </Container>
      <Footer />
    </div>
  );
}

export default MerchantDetail;
