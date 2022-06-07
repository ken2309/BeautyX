/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import productsApi from "../../api/productApi";
import orgApi from "../../api/organizationApi";
import { Container } from "@mui/material";
import "./product.css";
import Head from "../Head";
import DetailCard from "./components/DetailCard";
import DetailHead from "./components/DetailHead";
import Footer from "../Footer";
import RecommendList from "../RecommendList/index";
import { Product } from "../../interface/product";
import { AppContext } from "../../context/AppProvider";
import HeadTitle from "../HeadTitle";
import scrollTop from "../../utils/scrollTop";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { STATUS } from '../../redux/status';
import { fetchAsyncProductDetail, fetchAsyncProductCmt } from '../../redux/org_products/productSlice'
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";

function ProductDetail(props: any) {
  const { t } = useContext(AppContext);
  const dispatch = useDispatch();
  const ORG = useSelector((state: any) => state.ORG);
  const { PRODUCT, COMMENTS } = useSelector((state: any) => state.PRODUCT);
  const location: any = useLocation();
  const params: any = extraParamsUrl();
  const callProductDetail = () => {
    if (parseInt(params.id) !== PRODUCT.product.id || PRODUCT.status !== STATUS.SUCCESS) {
      const values = {
        id: params.id,
        org_id: params.org
      }
      dispatch(fetchAsyncProductDetail(values))
    }
  }
  const callOrgDetail = () => {
    if (parseInt(params.org) !== ORG.org?.id || ORG.status !== STATUS.SUCCESS) {
      dispatch(fetchAsyncOrg(params.org))
    }
  }
  const callProductComments = () => {
    console.log(parseInt(params.id), COMMENTS.product_id, COMMENTS.status_cmt)
    if (parseInt(params.id) !== COMMENTS.product_id || COMMENTS.status_cmt !== STATUS.SUCCESS) {
      const values = {
        type: "PRODUCT",
        page: 1,
        id: params.id,
        org_id: params.org
      }
      dispatch(fetchAsyncProductCmt(values))
    }
  }
  useEffect(() => {
    if (!location.state) {
      callProductDetail()
      callOrgDetail()
    }
    callProductComments()
  }, [])
  const product = location.state ? location.state.product : PRODUCT.product;
  const org = location.state ? location.state.org : ORG.org;

  return (
    <div className="product">
      <HeadTitle
        title={product?.product_name ? product.product_name : "Loading..."}
      />
      <Head />
      <Container>
        <div className="product-cnt">
          <DetailHead
            t={t}
            product={product}
            org={org}
            is_type={1}
            loading={false}
          />
          <DetailCard
            org={org}
            product={product}
            is_type={1}
            loading={false}
          />
        </div>
        {/* <RecommendList org={org} list={products} is_type={is_type} /> */}
      </Container>
      <Footer />
    </div>
  );
}

export default ProductDetail;
