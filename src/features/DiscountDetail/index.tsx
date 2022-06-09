/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Head from '../Head';
import { extraParamsUrl } from '../../utils/extraParamsUrl';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAsyncDiscountDetail,
    onSetItemDiscount
} from '../../redux/org_discounts/orgDiscountsSlice';
import HeadTitle from '../HeadTitle';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../interface/discount';
import { Container, Drawer, Tab } from '@mui/material'
import '../ProductDetail/product.css';
import { STATUS } from '../../redux/status';
import '../ServiceDetail/serviceDetail.css';
import '../ProductDetail/product.css';
import './style.css'
import { fetchAsyncOrg } from '../../redux/org/orgSlice';
import DiscountDetailLeft from './components/DiscountDetailLeft';
import DiscountDetailRight from './components/DiscountDetailRight';
import { fetchAsyncServiceCmt, fetchAsyncServiceDetail } from '../../redux/org_services/serviceSlice';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Review from '../Reviews';
import OrgInformation from '../MerchantDetail/components/OrgPages/OrgInformation';
import icon from '../../constants/icon';
import DetailOrgCard from '../ServiceDetail/components/DetailOrgCard';
import useFullScreen from '../../utils/useFullScreen';
import HeadOrg from '../MerchantDetail/components/HeadOrg';

function DiscountDetail() {
    const { DISCOUNT } = useSelector((state: any) => state.ORG_DISCOUNTS);
    const IS_MB = useFullScreen();
    const discount: IDiscountPar = DISCOUNT.discount;
    const status_detail = DISCOUNT.status

    const dispatch = useDispatch();
    const params: any = extraParamsUrl();
    const ORG = useSelector((state: any) => state.ORG);
    const { SERVICE, COMMENTS } = useSelector((state: any) => state.SERVICE);
    const values = {
        org_id: params.org_id,
        id: params.dis_id
    }
    const callDiscountDetail = () => {
        if (status_detail !== STATUS.SUCCESS || discount.id !== parseInt(params.dis_id)) {
            dispatch(fetchAsyncDiscountDetail(values))
        }
    }
    const callOrgDetail = () => {
        if (parseInt(params.org_id) !== ORG.org?.id || ORG.status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncOrg(params.org_id))
        }
    }
    const handleOnSetItemDiscount = () => {
        if (status_detail === STATUS.SUCCESS) {
            const values = discount.items.find((item: IITEMS_DISCOUNT) => item.productable_id == params.item_id)
            dispatch(onSetItemDiscount(values))
        }
    }
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
    };
    const callServiceComments = () => {
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
    useEffect(() => {
        callDiscountDetail()
        callServiceDetail();
        callServiceComments();
        callOrgDetail()
    }, [])
    useEffect(() => {
        handleOnSetItemDiscount()
    }, [status_detail])
    const service = SERVICE.service;

    const [value, setValue] = useState<any>(1);
    let tabs = [
        { id: 1, title: "Mô tả" },
        { id: 2, title: "Đánh giá" },
        { id: 3, title: "Doanh nghiệp" },
    ];
    let refMap = useRef<any>();
    let refDesc = useRef<any>();
    let refReview = useRef<any>();
    const scrollMap = refMap?.current?.offsetTop;
    const scrollDesc = refDesc?.current?.offsetTop;
    const scrollReview = refReview?.current?.offsetTop;

    const handleChange = (event: React.SyntheticEvent, value: any) => {
        let top;
        switch (value) {
            case 1:
                setValue(value);
                top = refDesc?.current?.offsetTop - 72;
                break;
            case 2:
                top = refReview?.current?.offsetTop - 72;
                setValue(value);
                break;
            case 3:
                top = refMap?.current?.offsetTop - 72;
                break;
            default:
                break;
        }
        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    };

    function handleScroll() {
        if (window.scrollY + 120 <= scrollReview) {
            setValue(1);
        } else if (
            window.scrollY + 120 >= scrollDesc &&
            window.scrollY + 120 <= scrollMap
        ) {
            setValue(2);
        } else if (window.scrollY + 120 >= scrollReview) {
            setValue(3);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll, false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });
    const [open, setOpen] = useState(false);

    return (
        <>
            <HeadTitle
                title={status_detail === "LOADING" ? 'Loading...' : discount?.title}
            />
            {IS_MB ? <HeadOrg org={ORG.org} />:<Head/>}
            {
                status_detail === STATUS.SUCCESS &&
                <Container>
                    <div className="service-detail">
                        <div className="service-detail__head">
                            <DiscountDetailLeft
                                org={ORG.org}
                                discount={discount}
                                detail={service}
                            />
                            <DiscountDetailRight
                                org={ORG.org}
                                discount={discount}
                                detail={service}
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
                                            <div
                                                ref={refDesc}
                                                className="service-detail__description"
                                            >
                                                <p>
                                                    Mô tả:{" "}
                                                    {service.description
                                                        ? service.description
                                                        : "Đang cập nhật"}
                                                </p>
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value}>
                                            <div className="service-detail__comment">
                                                <Review
                                                    refReview={refReview}
                                                    comments={COMMENTS.comments}
                                                    totalItem={COMMENTS.totalItem}
                                                    commentable_type={"SERVICE"}
                                                    page={COMMENTS.page}
                                                    id={ORG.org?.id}
                                                    detail_id={service?.id}
                                                />
                                            </div>
                                        </TabPanel>
                                        <TabPanel value={value}>
                                            <div
                                                ref={refMap}
                                                className="service-detail__org"
                                            >
                                                {ORG.status === STATUS.SUCCESS && (
                                                    <>
                                                        <div className="service-detail__org-mb">
                                                            <DetailOrgCard org={ORG?.org} />
                                                        </div>
                                                        <OrgInformation org={ORG?.org} />
                                                    </>
                                                )}
                                            </div>
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
                                    <DiscountDetailRight
                                        discount={discount}
                                        org={ORG.org}
                                        detail={service}
                                    />
                                </div>
                            </div>
                        </Drawer>
                    </div>
                </Container>
            }
        </>
    );
}

export default DiscountDetail;