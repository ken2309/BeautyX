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

function ProductDetail(props: any) {
  const { t } = useContext(AppContext);
  const location: any = useLocation();
  const search = location.search.slice(1, location.search.length);
  const params = search.split(",");
  const is_type = parseInt(params[2]);
  const [product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<Product[]>([]);
  const [org, setOrg] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const values = useMemo(
    () => ({
      org_id: params[0],
      id: params[1],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params[1]]
  );
  useEffect(() => {
    async function handleGetOrg_Products() {
      setLoading(true);
      scrollTop();
      try {
        if (location.state) {
          setOrg(location.state.org);
          setProduct(location.state.detail);
        } else {
          const resOrg = await orgApi.getOrgById(params[0]);
          setOrg(resOrg.data.context);
          const res = await productsApi.getDetailById(values);
          setProduct(res.data.context);
        }
        const resProducts = await productsApi.getByOrgId({
          org_id: params[0],
          page: 1,
        });
        setProducts(resProducts.data.context.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    handleGetOrg_Products();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state, params[0]]);

  //ad values is product:true
  const productsIs = [];
  for (var item of products) {
    const product = { ...item, is_product: true };
    productsIs.push(product);
  }
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
            is_type={is_type}
            loading={loading}
          />
          <DetailCard
            org={org}
            product={product}
            is_type={is_type}
            loading={loading}
          />
        </div>
        <RecommendList org={org} list={products} is_type={is_type} />
        {/* for mobile */}
        {/* <RecommendListMb org={org} productsSale={products} /> */}
      </Container>
      <Footer />
    </div>
  );
}

export default ProductDetail;
