/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { shareLink } from "../../utils/formatUrlString";
import { fetchAsyncOrg } from "../../redux/org/orgSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, Drawer } from "@mui/material";
import HeadTitle from "../HeadTitle";
import Head from "../Head";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { AppContext } from "../../context/AppProvider";
import { STATUS } from "../../redux/status";
import {
    fetchAsyncComboDetail,
    fetchAsyncCommentsCombo,
} from "../../redux/org_combos/comboSlice";
import ComboDetailLeft from "./components/ComboDetailLeft";
import ComboDetailRight from "./components/ComboDetailRight";
import OrgInformation from "../MerchantDetail/components/OrgPages/OrgInformation";
import Review from "../Reviews";
import "../ServiceDetail/serviceDetail.css";
import "./style.css";
import "../ProductDetail/product.css";
import icon from "../../constants/icon";
import DetailOrgCard from "../ServiceDetail/components/DetailOrgCard";
import HeadOrg from "../MerchantDetail/components/HeadOrg";
import useFullScreen from "../../utils/useFullScreen";
import {
    handleChangeScroll,
    handleScroll,
} from "../ServiceDetail/onScrollChange";
import DetailPolicy from "../ServiceDetail/components/DetailPolicy";

function ComboDetail() {
    const { t } = useContext(AppContext);
    const IS_MB = useFullScreen();
    const params: any = shareLink();
    const dispatch = useDispatch();
    const ORG = useSelector((state: any) => state.ORG);
    const { COMBO, COMMENTS } = useSelector((state: any) => state.COMBO);
    const is_mobile = useFullScreen();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<any>(1);

    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
        { id: 4, title: "Hướng dẫn & Điều khoản" },
    ];

    const org = ORG.org;
    const combo = COMBO.combo;

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

    const callOrgDetail = () => {
        if (
            parseInt(params.org_id) !== ORG.org?.id ||
            ORG.status !== STATUS.SUCCESS
        ) {
            dispatch(fetchAsyncOrg(params.org_id));
        }
    };
    const callComboDetail = () => {
        if (
            parseInt(params.id) !== COMBO.combo.id ||
            COMBO.status !== STATUS.SUCCESS
        ) {
            const values = {
                com_id: params.id,
                org_id: params.org_id,
            };
            dispatch(fetchAsyncComboDetail(values));
        }
    };
    const callComboComments = () => {
        if (
            parseInt(params.id) !== COMMENTS.combo_id ||
            COMMENTS.status !== STATUS.SUCCESS
        ) {
            const values = {
                type: "TREATMENT_COMBO",
                page: 1,
                id: params.id,
                org_id: params.org_id,
            };
            dispatch(fetchAsyncCommentsCombo(values));
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
        callOrgDetail();
        callComboDetail();
        callComboComments();
    }, []);

    return (
        <div className="product">
            {IS_MB ? <HeadOrg org={org} /> : <Head />}
            <HeadTitle title={combo?.name ? combo?.name : "Loading..."} />
            <Container>
                <div className="service-detail">
                    <div className="service-detail__head">
                        <ComboDetailLeft org={org} combo={combo} />
                        <ComboDetailRight org={org} combo={combo} />
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
                                            <p>{"Đang cập nhật"}</p>
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
                                                commentable_type={
                                                    "TREATMENT_COMBO"
                                                }
                                                page={COMMENTS.page}
                                                id={ORG.org?.id}
                                                detail_id={combo?.id}
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
                                                    <>
                                                        <p className="service-detail__title">
                                                            Doanh nghiệp
                                                        </p>
                                                        <div className="service-detail__org-mb">
                                                            <DetailOrgCard
                                                                org={org}
                                                            />
                                                        </div>
                                                        <OrgInformation
                                                            org={org}
                                                        />
                                                    </>
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
                    </div>
                    {/* btn add cart */}
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
                    </div>
                    <Drawer
                        open={open}
                        anchor="bottom"
                        onClose={() => setOpen(false)}
                    >
                        <div className="active-mb">
                            <div className="service-detail">
                                <ComboDetailRight combo={combo} org={org} />
                            </div>
                        </div>
                    </Drawer>
                </div>
            </Container>
        </div>
    );
}

export default ComboDetail;
