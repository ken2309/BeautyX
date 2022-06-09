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
import useFullScreen from "../../utils/useFullScreen";
import icon from "../../constants/icon";

function ComboDetail() {
    const { t } = useContext(AppContext);
    const params: any = shareLink();
    const dispatch = useDispatch();
    const ORG = useSelector((state: any) => state.ORG);
    const { COMBO, COMMENTS } = useSelector((state: any) => state.COMBO);
    const is_mobile = useFullScreen();
    const [open, setOpen] = useState(false);

    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    let refMap = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;
    console.log(scrollMap, scrollDesc, scrollReview);

    // handle onclick active menu
    const handleChange = (event: React.SyntheticEvent, value: any) => {
        let top;
        switch (value) {
            case 1:
                if (is_mobile) {
                    top = refDesc?.current?.offsetTop;
                } else {
                    top = refDesc?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            case 2:
                if (is_mobile) {
                    top = refReview?.current?.offsetTop;
                } else {
                    top = refReview?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            case 3:
                if (is_mobile) {
                    top = refMap?.current?.offsetTop;
                } else {
                    top = refMap?.current?.offsetTop - 72;
                }
                setValue(value);
                break;
            default:
                break;
        }
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };

    // handle scroll active menu
    function handleScroll() {
        if (is_mobile) {
            if (window.scrollY + 16 < scrollReview) {
                setValue(1);
            } else if (
                window.scrollY + 16 > scrollDesc &&
                window.scrollY + 16 < scrollMap
            ) {
                setValue(2);
            } else if (window.scrollY + 16 > scrollReview) {
                setValue(3);
            }
        } else {
            if (window.scrollY + 72 < scrollReview) {
                setValue(1);
            } else if (
                window.scrollY + 72 > scrollDesc &&
                window.scrollY + 72 < scrollMap
            ) {
                setValue(2);
            } else if (window.scrollY + 72 > scrollReview) {
                setValue(3);
            }
        }
    }
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
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    useEffect(() => {
        callOrgDetail();
        callComboDetail();
        callComboComments();
    }, []);

    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
    ];

    const org = ORG.org;
    const combo = COMBO.combo;

    return (
        <div className="combo">
            <Head />
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
                                                    <OrgInformation org={org} />
                                                )}
                                            </div>
                                        </div>
                                    </TabPanel>
                                </div>
                            </TabContext>
                        </div>
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
                            <p>Thêm vào giỏ hàng</p>
                            <img src={icon.ShoppingCartSimpleWhite} alt="" />
                        </button>
                        {/* drawer service detail */}
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
                </div>
            </Container>
        </div>
    );
}

export default ComboDetail;
