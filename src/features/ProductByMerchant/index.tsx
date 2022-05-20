/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ProductCate from "./Components/ProductCate";
import ProductList from "./Components/ProductList";
import ProductsCateMb from "./Components/ProductsCateMb";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncCateProducts,
  fetchAsyncProducts,
  clearProducts
} from '../../redux/org_products/orgProductsSlice';
import { STATUS } from '../../redux/status';

function ProductByMerchant(props: any) {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const { ORG } = useSelector((state: any) => state);
  const { org, status } = ORG;
  const [cate_id, setCate_id] = useState(null);
  const callCategories = () => {
    if (status === STATUS.SUCCESS) {
      dispatch(fetchAsyncCateProducts(org?.id))
    }
  }
  const callProducts = () => {
    dispatch(clearProducts())
    if (status === STATUS.SUCCESS) {
      const values = {
        page: 1,
        cate_id: null,
        org_id: org?.id
      }
      dispatch(fetchAsyncProducts(values))
    }
  }
  useEffect(() => {
    callCategories()
    callProducts()
  }, [status])
  return (
    <div style={activeTab === 3 ? { display: "block" } : { display: "none" }}>
      <div
        className="flex-row-sp ser-content"
        style={{ alignItems: "flex-start" }}
      >
        <ProductCate
          org={org}
          cate_id={cate_id}
          setCate_id={setCate_id}
        />
        <ProductsCateMb
          org={org}
          cate_id={cate_id}
          setCate_id={setCate_id}
        />
        {/* ----- */}
        <ProductList
          org={org}
          cate_id={cate_id}
        />
      </div>
    </div>
  );
}

export default ProductByMerchant;
