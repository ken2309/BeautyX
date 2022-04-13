import React, { useContext, useEffect, useState } from "react";
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
import orgApi from "../../api/organizationApi";
//import branchApi from "../../api/branchApi";
import DetailTab from "./components/DetailTab";
import DetailTabMb from "../../featuresMobile/DetailTabMb";
import MerchantMb from "../../featuresMobile/MerchantMb";
import HeadTitle from "../HeadTitle/index";
import { Product } from "../../interface/product";
import productApi from "../../api/productApi";
import { IOrganization } from "../../interface/organization";
import { IBranch } from "../../interface/branch";
// view for mobile
import RecommendListMb from "../../featuresMobile/RecomendList";
import { AppContext } from "../../context/AppProvider";
//import * as Sentry from '@sentry/react'

const id_tab = 1;
function MerchantDetail() {
  //const scope = new Sentry.Scope();
  const { tempCount, setTempleCount } = useContext(AppContext);
  const location: any = useLocation();
  const mer_id = parseInt(
    `${location.search.slice(1, location.search.length)}`
  );
  const [loading, setLoading] = useState(false);
  const [org, setOrg] = useState<IOrganization>();
  const [branches, setBranches] = useState<IBranch[]>([]);
  const [productsSale, setProductsSale] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    async function handleGetOrgById() {
      setLoading(true);
      if (location.state) {
        setOrg(location.state);
        setBranches(location.state.branches);
        if (location.state.is_favorite === true) {
          setFollow(true);
        } else {
          setFollow(false);
        }
        setLoading(false);
      } else {
        try {
          const res = await orgApi.getOrgById(mer_id);
          setOrg(res.data.context);
          setBranches(res.data.context.branches);
          if (res.data.context.is_favorite === true) {
            setFollow(true);
          } else {
            setFollow(false);
          }
          setLoading(false);
        } catch (err) {
          console.log(err);
          // scope.setTag("section", "articles");
          // Sentry.setUser({ email: "john.doe@example.com" });
          // Sentry.captureException(new Error("something went wrong"), () => scope);
        }
      }
    }
    async function handleGetProductSale() {
      const res = await productApi.getByOrgId({
        org_id: mer_id,
        page: 1,
      });
      setProductsSale(res.data.context.data);
    }
    handleGetProductSale();
    handleGetOrgById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, mer_id]);
  return (
    <div className="mb-cnt">
      <HeadTitle title={org?.name ? org.name : "Loading..."} />
      <Head />
      <DetailHead
        follow={follow}
        setFollow={setFollow}
        tempCount={tempCount}
        setTempleCount={setTempleCount}
        loading={loading}
        org={org}
      />
      <DetailTab setActiveTab={setActiveTab} activeTab={activeTab} />
      {/* for mobile */}
      <DetailTabMb setActiveTab={setActiveTab} activeTab={activeTab} />
      {/* ---------- */}
      <div
        className="tabMer-detail"
        style={{ backgroundColor: "var(--bg-gray)", paddingBottom: "64px" }}
      >
        <Container>
          <div
            style={
              id_tab === activeTab ? { display: "block" } : { display: "none" }
            }
          >
            <DetailMer merDetail={org} />
            {/* for mobile */}
            <MerchantMb branches={branches} />
            {/* ---------- */}
            <DetailBranchList branches={branches} />
            <DetailSaleList productsSale={productsSale} merDetail={org} />
            {/* for mobile */}
            <RecommendListMb productsSale={productsSale} org={org} />
            {/* ----- */}
          </div>
          <SaleByMerchant activeTab={activeTab} mer_id={mer_id} org={org} />
          <ServiceByMerchant activeTab={activeTab} mer_id={mer_id} org={org} />
          <ProductByMerchant mer_id={mer_id} activeTab={activeTab} org={org} />
          <ComboByMerchant org={org} org_id={mer_id} activeTab={activeTab} />
        </Container>
      </div>
      <Footer />
      {/* <Bottom /> */}
    </div>
  );
}

export default MerchantDetail;
