import React, { useEffect, useState } from "react";
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
import DetailTab from "./components/DetailTab";
import DetailTabMb from "../../featuresMobile/DetailTabMb";
import MerchantMb from "../../featuresMobile/MerchantMb";
import HeadTitle from "../HeadTitle/index";
import { Product } from "../../interface/product";
import productApi from "../../api/productApi";
import { IOrganization } from "../../interface/organization";
// view for mobile
import RecommendListMb from "../../featuresMobile/RecomendList";


function MerchantDetail() {
  const location: any = useLocation();
  const mer_id = parseInt(
    `${location.search.slice(1, location.search.length)}`
  );
  const [org, setOrg] = useState<IOrganization>();
  const [loading, setLoading] = useState<boolean>(true)
  const [productsSale, setProductsSale] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<number>(1);
  const handleGetOrgDetail = async () => {
    try {
      const res = await orgApi.getOrgById(mer_id);
      setOrg(res.data.context);
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }
  const handleGetOrgPromo = async () => {
    try {
      const res = await productApi.getByOrgId({
        org_id: mer_id,
        page: 1,
      });
      setProductsSale(res.data.context.data);
    } catch (error) {

    }
  }
  const setOrgDetail = () => {
    if (location.state) {
      setOrg(location.state);
      setLoading(false)
    } else {
      handleGetOrgDetail()
    }
  }
  useEffect(() => {
    setOrgDetail()
    handleGetOrgPromo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="mb-cnt">
      <HeadTitle title={org?.name ? org.name : 'Đang tải...'} />
      <Head />
      <DetailHead
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
          {
            activeTab === 1 &&
            <>
              <DetailMer org={org} />
              {/* for mobile */}
              <MerchantMb org={org} />
              {/* ---------- */}
              <DetailBranchList branches={org?.branches} />
              <DetailSaleList productsSale={productsSale} merDetail={org} />
              {/* for mobile */}
              <RecommendListMb productsSale={productsSale} org={org} />
            </>
          }
          <SaleByMerchant activeTab={activeTab} mer_id={mer_id} org={org} />
          <ServiceByMerchant activeTab={activeTab} mer_id={mer_id} org={org} />
          <ProductByMerchant mer_id={mer_id} activeTab={activeTab} org={org} />
          <ComboByMerchant org={org} org_id={mer_id} activeTab={activeTab} />
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default MerchantDetail;
