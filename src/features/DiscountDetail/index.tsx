/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import Head from "../Head";
import { extraParamsUrl } from "../../utils/extraParamsUrl";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAsyncDiscountDetail,
    onSetItemDiscount,
} from "../../redux/org_discounts/orgDiscountsSlice";
import HeadTitle from "../HeadTitle";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../interface/discount";
import { Container, Drawer, Tab } from "@mui/material";
import { STATUS } from "../../redux/status";
import "../ServiceDetail/serviceDetail.css";
import "../ProductDetail/product.css";
import "./style.css";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import DiscountDetailLeft from "./components/DiscountDetailLeft";
import DiscountDetailRight from "./components/DiscountDetailRight";
import {
    fetchAsyncServiceCmt,
    fetchAsyncServiceDetail,
} from "../../redux/org_services/serviceSlice";
import {
    fetchAsyncProductDetail,
    fetchAsyncProductCmt,
} from "../../redux/org_products/productSlice";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Review from "../Reviews";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import icon from "../../constants/icon";
import DetailOrgCard from "../ServiceDetail/components/DetailOrgCard";
import HeadOrg from "../MerchantDetail/components/HeadOrg";
import {
    handleChangeScroll,
    handleScroll,
} from "../ServiceDetail/onScrollChange";
import DetailPolicy from "../ServiceDetail/components/DetailPolicy";
import ReviewsContainer from "../ReviewsContainer";
import Footer from "../Footer";
import LoadDetail from "../../components/LoadingSketion/LoadDetail";

// google tag event
import { GoogleTagPush, GoogleTagEvents } from "../../utils/dataLayer";
import useDeviceMobile from "../../utils/useDeviceMobile";
import { AppContext } from "../../context/AppProvider";
// end
function DiscountDetail() {
    const { DISCOUNT } = useSelector((state: any) => state.ORG_DISCOUNTS);
    const IS_MB = useDeviceMobile();
    const discount: IDiscountPar = DISCOUNT.discount;
    const status_detail = DISCOUNT.status;
    const is_mobile = useDeviceMobile();
    const { t } = useContext(AppContext);
    const [open, setOpen] = useState({
        NOW: true,
        open: false,
    });
    const [openAllCmt, setOpenAllCmt] = useState(false);
    const handleOpenSeemoreCmt = () => {
        setOpenAllCmt(true);
    };

    const dispatch = useDispatch();
    const params: any = extraParamsUrl();
    const TYPE = params.type;
    const ORG = useSelector((state: any) => state.ORG);
    const org = ORG.org;

    const COMMENTS_SERVICE = useSelector(
        (state: any) => state.SERVICE.COMMENTS
    );
    const COMMENTS_PRODUCT = useSelector(
        (state: any) => state.PRODUCT.COMMENTS
    );
    const { SERVICE } = useSelector((state: any) => state.SERVICE);
    const { PRODUCT } = useSelector((state: any) => state.PRODUCT);
    let COMMENTS = COMMENTS_SERVICE;
    let detail = SERVICE.service;
    if (TYPE === "product") {
        COMMENTS = COMMENTS_PRODUCT;
        detail = PRODUCT.product;
    }
    const values = {
        // org_id: params.org_id,
        id: params.dis_id,
    };

    const callDiscountDetail = () => {
        if (
            status_detail !== STATUS.SUCCESS ||
            discount.id !== parseInt(params.dis_id)
        ) {
            dispatch(fetchAsyncDiscountDetail(values));
        }
    };
    const callOrgDetail = () => {
        if (
            parseInt(params.org_id) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org_id));
        }
    };
    const handleOnSetItemDiscount = () => {
        if (status_detail === STATUS.SUCCESS) {
            const values = discount.items.find(
                (item: IITEMS_DISCOUNT) => item.productable_id == params.item_id
                // (item: IITEMS_DISCOUNT) => 138 == params.item_id
            );
            dispatch(onSetItemDiscount(values));
        }
    };
    //type service
    const callServiceDetail = () => {
        if (
            parseInt(params.item_id) !== SERVICE.service.id ||
            SERVICE.status !== STATUS.SUCCESS
        ) {
            const values = {
                org_id: params.org_id,
                ser_id: params.item_id,
            };
            dispatch(fetchAsyncServiceDetail(values));
        }
        if (
            parseInt(params.item_id) !== COMMENTS.service_id ||
            COMMENTS.status_cmt !== STATUS.SUCCESS
        ) {
            const values = {
                type: "SERVICE",
                page: 1,
                id: params.item_id,
                org_id: params.org_id,
            };
            dispatch(fetchAsyncServiceCmt(values));
        }
    };
    // type product
    const callProductDetail = () => {
        if (
            parseInt(params.item_id) !== PRODUCT.product_id ||
            SERVICE.status !== STATUS.SUCCESS
        ) {
            const values = {
                org_id: params.org_id,
                id: params.item_id,
            };
            dispatch(fetchAsyncProductDetail(values));
        }
        if (
            parseInt(params.item_id) !== COMMENTS.product_id ||
            COMMENTS.status_cmt !== STATUS.SUCCESS
        ) {
            const values = {
                type: "PRODUCT",
                page: 1,
                id: params.item_id,
                org_id: params.org_id,
            };
            dispatch(fetchAsyncProductCmt(values));
        }
    };

    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: t("pr.description") },
        { id: 2, title: t("Mer_de.feedback") },
        { id: 3, title: t("my_ser.business") },
        { id: 4, title: t("se.instructions_terms") },
    ];

    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    let refMap = useRef<any>();
    let refPolicy = useRef<any>();
    let refLimitText = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    const scrollPolicy = refPolicy?.current?.offsetTop;
    const handleSeemoreText = () => {
        refLimitText?.current.classList.toggle("unlimit-text");
        refLimitText?.current.nextSibling?.classList.toggle("change-text");
    };
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
        GoogleTagPush(GoogleTagEvents.PROMOTION_LOAD);
        callDiscountDetail();
        if (TYPE === "service") {
            callServiceDetail();
        } else if (TYPE === "product") {
            callProductDetail();
        }
        callOrgDetail();
    }, []);

    useEffect(() => {
        handleOnSetItemDiscount();
    }, [status_detail]);

    return (
        <>
            {status_detail !== STATUS.SUCCESS && <LoadDetail />}
            <HeadTitle
                title={
                    status_detail === "LOADING" ? "Loading..." : discount?.title
                }
            />
            {IS_MB ? <HeadOrg org={ORG.org} /> : <Head />}
            {status_detail === STATUS.SUCCESS && (
                <Container>
                    <div className="service-detail">
                        <div className="service-detail__head">
                            <DiscountDetailLeft
                                org={ORG.org}
                                discount={discount}
                                detail={detail}
                            />
                            <DiscountDetailRight
                                org={ORG.org}
                                discount={discount}
                                detail={detail}
                                COMMENTS={COMMENTS}
                                TYPE_DE={TYPE}
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
                                            <div
                                                ref={refDesc}
                                                className="service-detail__description"
                                            >
                                                <p
                                                    ref={refLimitText}
                                                    className="service-description"
                                                >
                                                    {t("pr.description")}:{" "}
                                                    {detail?.description
                                                        ? detail?.description
                                                        : t(
                                                            "detail_item.updating"
                                                        )}
                                                </p>
                                                {detail?.description &&
                                                    (is_mobile === true
                                                        ? detail?.description
                                                            .length > 100
                                                        : detail?.description
                                                            .length > 300) ? (
                                                    <div
                                                        onClick={() =>
                                                            handleSeemoreText()
                                                        }
                                                        className="seemore-btn"
                                                    >
                                                        <p>Xem thêm &or;</p>
                                                        <p>Thu gọn &and;</p>
                                                    </div>
                                                ) : null}
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value}>
                                            <div
                                                ref={refReview}
                                                className="service-detail__comment"
                                            >
                                                <Review
                                                    comments={COMMENTS.comments}
                                                    totalItem={
                                                        COMMENTS.totalItem
                                                    }
                                                    commentable_type={"SERVICE"}
                                                    page={COMMENTS.page}
                                                    id={ORG.org?.id}
                                                    detail_id={detail?.id}
                                                    openSeeMoreCmt={
                                                        handleOpenSeemoreCmt
                                                    }
                                                />
                                                {COMMENTS.comments &&
                                                    COMMENTS.comments.length >=
                                                    8 ? (
                                                    <div
                                                        style={{
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                        onClick={() => {
                                                            setOpenAllCmt(true);
                                                        }}
                                                        className="seemore-cmt"
                                                    >
                                                        <p>
                                                            {t(
                                                                "detail_item.see_more"
                                                            )}
                                                        </p>
                                                    </div>
                                                ) : null}
                                                <ReviewsContainer
                                                    open={openAllCmt}
                                                    setOpen={setOpenAllCmt}
                                                    comments={COMMENTS.comments}
                                                    org_id={ORG.org?.id}
                                                    totalItem={
                                                        COMMENTS.totalItem
                                                    }
                                                    page={COMMENTS.page}
                                                    commentable_type="SERVICE"
                                                />
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value}>
                                            <div
                                                ref={refMap}
                                                className="service-detail__org"
                                            >
                                                {ORG.status ===
                                                    STATUS.SUCCESS && (
                                                        <>
                                                            <p className="service-detail__title">
                                                                {t(
                                                                    "detail_item.merchant"
                                                                )}
                                                            </p>
                                                            <div className="service-detail__org-mb">
                                                                <DetailOrgCard
                                                                    org={ORG?.org}
                                                                />
                                                            </div>
                                                            <OrgInformation
                                                                org={ORG?.org}
                                                            />
                                                        </>
                                                    )}
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
                        </div>
                        <div className="service-detail__bottom">
                            <button
                                onClick={() => {
                                    setOpen({ NOW: true, open: true });
                                }}
                                style={{ backgroundColor: "var(--orange)" }}
                            >
                                <p>{t("detail_item.booking_now")}</p>
                            </button>
                            <button
                                onClick={() => {
                                    setOpen({ NOW: false, open: true });
                                }}
                                className="btn-addcart"
                            >
                                <img
                                    src={icon.ShoppingCartSimpleWhite}
                                    alt=""
                                />
                                <p>{t("detail_item.add_cart")}</p>
                            </button>
                        </div>
                        <Drawer
                            open={open.open}
                            anchor="bottom"
                            onClose={() => setOpen({ ...open, open: false })}
                        >
                            <div className="active-mb">
                                <div className="service-detail">
                                    <DiscountDetailRight
                                        discount={discount}
                                        org={ORG.org}
                                        detail={detail}
                                        COMMENTS={COMMENTS}
                                        NOW={open.NOW}
                                        TYPE_DE={TYPE}
                                    />
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </Container>
            )}
            <Footer />
        </>
    );
}

export default DiscountDetail;
