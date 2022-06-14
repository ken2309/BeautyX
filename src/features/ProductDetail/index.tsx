/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import "./product.css";
import Head from "../Head";
import Footer from "../Footer";
import HeadTitle from "../HeadTitle";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { STATUS } from "../../redux/status";
import {
    fetchAsyncProductDetail,
    fetchAsyncProductCmt,
} from "../../redux/org_products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import "../ServiceDetail/serviceDetail.css";
import "./product.css";
import { Container, Drawer, Tab } from "@mui/material";
import ProductDetailLeft from "./components/ProductDetailLeft";
import ProductDetailRight from "./components/ProductDetailRight";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import useFullScreen from "../../utils/useFullScreen";
import icon from "../../constants/icon";
import Review from "../Reviews";
import HeadOrg from "../MerchantDetail/components/HeadOrg";
import {
    handleChangeScroll,
    handleScroll,
} from "../ServiceDetail/onScrollChange";
import DetailPolicy from "../ServiceDetail/components/DetailPolicy";
import ProductDetailRecomment from "./components/ProductDetailRecomment";

function ProductDetail(props: any) {
    const dispatch = useDispatch();
    const IS_MB = useFullScreen();
    const ORG = useSelector((state: any) => state.ORG);
    const { PRODUCT, COMMENTS } = useSelector((state: any) => state.PRODUCT);
    const params: any = extraParamsUrl();
    const is_mobile = useFullScreen();
    const [open, setOpen] = useState(false);
    const product = PRODUCT.product;
    const org = ORG.org;
    const [value, setValue] = useState<any>(1);

    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
        { id: 4, title: "Hướng dẫn & Điều khoản" },
    ];

    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    let refMap = useRef<any>();
    let refPolicy = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    const scrollPolicy = refPolicy?.current?.offsetTop;

    // handle onclick active menu
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        const top = handleChangeScroll(
            is_mobile,
            value,
            setValue,
            refDesc,
            refReview,
            refMap,
            refPolicy
        );
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };

    const callProductDetail = () => {
        if (
            parseInt(params.id) !== PRODUCT.product.id ||
            PRODUCT.status !== STATUS.SUCCESS
        ) {
            const values = {
                id: params.id,
                org_id: params.org,
            };
            dispatch(fetchAsyncProductDetail(values));
        }
    };
    const callOrgDetail = () => {
        if (
            parseInt(params.org) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org));
        }
    };
    const callProductComments = () => {
        if (
            parseInt(params.id) !== COMMENTS.product_id ||
            COMMENTS.status_cmt !== STATUS.SUCCESS
        ) {
            const values = {
                type: "PRODUCT",
                page: 1,
                id: params.id,
                org_id: params.org,
            };
            dispatch(fetchAsyncProductCmt(values));
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", () =>
            handleScroll(
                is_mobile,
                setValue,
                scrollReview,
                scrollDesc,
                scrollMap,
                scrollPolicy
            )
        );
        return () => {
            window.removeEventListener(
                "scroll",
                () =>
                    handleScroll(
                        is_mobile,
                        setValue,
                        scrollReview,
                        scrollDesc,
                        scrollMap,
                        scrollPolicy
                    ),
                false
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        callProductDetail();
        callOrgDetail();
        callProductComments();
    }, [params.id]);

    return (
        <div className="product">
            <HeadTitle
                title={
                    product?.product_name ? product.product_name : "Loading..."
                }
            />
            {IS_MB ? <HeadOrg org={org} /> : <Head />}
            <Container>
                <div className="service-detail">
                    <div className="service-detail__head">
                        <ProductDetailLeft org={org} product={product} />
                        <ProductDetailRight org={org} product={product} />
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
                                        <div
                                            ref={refDesc}
                                            className="service-detail__description"
                                        >
                                            <p>
                                                Mô tả:{" "}
                                                {product?.description
                                                    ? product.description
                                                    : "Đang cập nhật"}
                                            </p>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div
                                            ref={refReview}
                                            className="service-detail__comment"
                                        >
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
                                        <div
                                            ref={refMap}
                                            className="org-information-cnt"
                                        >
                                            <div className="service-detail__org">
                                                {ORG.status ===
                                                    STATUS.SUCCESS && (
                                                    <OrgInformation org={org} />
                                                )}
                                            </div>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value}>
                                        <div ref={refPolicy}>
                                            <DetailPolicy org={org} />
                                        </div>
                                    </TabPanel>
                                </div>
                            </TabContext>
                        </div>
                        <ProductDetailRecomment org={org} />
                    </div>
                    {/* service bottom buttom add cart                                             */}
                    <div className="service-detail__bottom">
                        <button>
                            <p>Mua ngay</p>
                        </button>
                        <button
                            onClick={() => {
                                setOpen(true);
                            }}
                            className="btn-addcart"
                        >
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                            <p>Thêm vào giỏ hàng</p>
                        </button>
                        {/* drawer service detail */}
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
                </div>
            </Container>
            <Footer />
        </div>
    );
}

export default ProductDetail;
