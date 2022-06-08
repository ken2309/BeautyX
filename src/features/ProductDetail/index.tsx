/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./product.css";
import Head from "../Head";
import Footer from "../Footer";
import HeadTitle from "../HeadTitle";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { STATUS } from '../../redux/status';
import {
  fetchAsyncProductDetail,
  fetchAsyncProductCmt
} from '../../redux/org_products/productSlice'
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import '../ServiceDetail/serviceDetail.css';
import './product.css'
import { Container, Drawer, Tab } from "@mui/material";
import ProductDetailLeft from "./components/ProductDetailLeft";
import ProductDetailRight from "./components/ProductDetailRight";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Review from "../Reviews";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import icon from "../../constants/icon";
import DetailOrgCard from "../ServiceDetail/components/DetailOrgCard";

function ProductDetail(props: any) {
  const dispatch = useDispatch();
  const ORG = useSelector((state: any) => state.ORG);
  const { PRODUCT, COMMENTS } = useSelector((state: any) => state.PRODUCT);
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
    callProductDetail()
    callOrgDetail()
    callProductComments()
  }, [])
  const product = PRODUCT.product;
  const org = ORG.org

  const [value, setValue] = useState<any>(1);
  let tabs = [
    { id: 1, title: "Mô tả" },
    { id: 2, title: "Đánh giá" },
    { id: 3, title: "Doanh nghiệp" },
  ];
  const [open, setOpen] = useState(false);
  const handleChange = (event: React.SyntheticEvent, value: any) => {
    setValue(value);
  }

  return (
    <div className="product">
      <HeadTitle
        title={product?.product_name ? product.product_name : "Loading..."}
      />
      <Head />
      <Container>
        <div className="service-detail">
          <div className="service-detail__head">
            <ProductDetailLeft
              org={org} product={product}
            />
            <ProductDetailRight
              org={org} product={product}
            />
          </div>
          <div className="service-detail__body">
            <div className="service-detail__tab">
              <TabContext value={value}>
                <TabList onChange={handleChange}>
                  {tabs.map((item: any, i: number) => (
                    <Tab
                      key={i}
                      label={item.title}
                      value={item.id}
                    />
                  ))}
                </TabList>
                <div className="service-detail__tabitem">
                  <TabPanel value={value}>
                    {/* {onSwitchTab(value)} */}
                    <div className="service-detail__description">
                      <p>
                        Mô tả:{" "}
                        {product?.description
                          ? product.description
                          : "Đang cập nhật"}
                      </p>
                    </div>
                  </TabPanel>
                  <TabPanel value={value}>
                    <div className="service-detail__comment">
                      <Review
                        comments={COMMENTS.comments}
                        totalItem={COMMENTS.totalItem}
                        commentable_type={"PRODUCT"}
                        id={ORG.org?.id}
                        detail_id={product?.id}
                      />
                    </div>
                  </TabPanel>
                  <TabPanel value={value}>
                    <div className="org-information-cnt">
                      <div className="service-detail__org">
                        {ORG.status === STATUS.SUCCESS && (
                          <>
                            <div className="service-detail__org-mb">
                              <DetailOrgCard org={org} />
                            </div>
                            <OrgInformation org={org} />
                          </>
                        )}
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel value={value}>
                    <>tab 3</>
                  </TabPanel>
                </div>
              </TabContext>
            </div>
          </div>
          <div className="service-detail__button">
            <button>
              <p>Buy now</p>
            </button>
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="btn-addcart"
            >
              <p>Add to cart</p>
              <img src={icon.ShoppingCartSimpleWhite} alt="" />
            </button>
          </div>
          <Drawer
            open={open}
            anchor="bottom"
            onClose={() => setOpen(false)}
          >
            <div className="active-mb">
              <div className="service-detail">
                <ProductDetailRight
                  product={product}
                  org={org}
                />
              </div>
            </div>
          </Drawer>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default ProductDetail;
