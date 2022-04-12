import React, { useEffect, useState } from "react";
import productsApi from "../../api/productApi";
import ProductCate from "./Components/ProductCate";
import ProductList from "./Components/ProductList";
import ServiceCateMb from "../ServiceByMerchant/components/ServiceCateMb";

function ProductByMerchant(props: any) {
  const { activeTab, mer_id, org } = props;
  const [dataCates, setDataCates] = useState({
    cates: [],
    loading: true
  })
  const [dataProducts, setDataProducts] = useState({
    products: [],
    page: 1,
    page_count: 1
  })
  const [cate_id, setCate_id] = useState(0);
  useEffect(() => {
    async function handleGetPrByOrgId() {
      try {
        if (!cate_id || cate_id === 0) {
          const res = await productsApi.getByOrgId({
            org_id: mer_id,
            page: dataProducts.page
          });
          setDataProducts({
            ...dataProducts,
            products: res.data.context.data,
            page_count: res.data.context.last_page
          })
        } else {
          const resByCate_id = await productsApi.getByOrgId_cateId({
            org_id: mer_id,
            cate_id: cate_id,
            page: dataProducts.page,
          });
          setDataProducts({
            ...dataProducts,
            products: resByCate_id.data.context.data,
            page_count: resByCate_id.data.context.last_page
          })
        }
      } catch (err) {
        console.log(err);
      }
    }
    handleGetPrByOrgId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cate_id, mer_id, dataProducts.page]);
  return (
    <div style={activeTab === 3 ? { display: "block" } : { display: "none" }}>
      <div
        className="flex-row-sp ser-content"
        style={{ alignItems: "flex-start" }}
      >
        <ProductCate
          mer_id={mer_id}
          cate_id={cate_id}
          setCate_id={setCate_id}
          dataCates={dataCates}
          setDataCates={setDataCates}
          dataProducts={dataProducts}
          setDataProducts={setDataProducts}
        />
        {/* for mobile */}
        <ServiceCateMb
          categories={dataCates.cates}
          chooseCate={cate_id}
          setChooseCate={setCate_id}
          dataServices={dataProducts}
          setDataServices={setDataProducts}
        />
        {/* ----- */}
        <ProductList
          org={org}
          mer_id={mer_id}
          dataProducts={dataProducts}
          setDataProducts={setDataProducts}
        />
      </div>
    </div>
  );
}

export default ProductByMerchant;
