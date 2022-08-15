/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import Head from "../../Head";
import HeadTitle from "../../HeadTitle";
import { Container } from "@mui/material";
import "../home-result.css";
import HomeTitleSection from "../../HomePage/HomeTitleSection/index/index";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import { IServicePromo } from "../../../interface/servicePromo";
import { AppContext } from "../../../context/AppProvider";
import { extraParamsUrl } from "../../../utils/extraParamsUrl";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncServicesPromo } from "../../../redux/home/homePageSlice";
import FilterService from "../../Filter/FilterService";
import { STATUS } from "../../../redux/status";
import { onSetFilterPromo } from '../../../redux/filter/filterSlice';
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import useFullScreen from "../../../utils/useDeviceMobile";
import HeadMobile from "../../HeadMobile";
import ServiceResultItem from "../../Search/components/ServiceResultItem";
import BackTopButton from "../../../components/BackTopButton";
import Footer from "../../Footer";
import LoadingMore from "../../../components/LoadingMore";
import { LoadingServices } from "../../../components/LoadingSketion";
import { blockService } from "../../../utils/blockCardItem";

function HomePromo(props: any) {
    const { t } = useContext(AppContext);
    const IS_MB = useFullScreen();
    const history = useHistory();
    const { SERVICES_PROMO } = useSelector((state: any) => state.HOME_PAGE);
    const dispatch = useDispatch();
    const { services, status, query, page, totalItem } = SERVICES_PROMO
    const params: any = extraParamsUrl();

    const callServicesPromo = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncServicesPromo({
                page: 1,
                sort: params?.sort
            }))
        }
    }

    const onChangeServicesByFilter = (item: any) => {
        if (query !== item.query) {
            history.push(`/deal-lam-dep-cuc-HOT?sort=${item.query}`)
            dispatch(fetchAsyncServicesPromo({
                page: 1,
                sort: item.query
            }))
        }
    }
    useEffect(() => {
        callServicesPromo()
        const action = {
            id: 1,
            query: params?.sort
        }
        dispatch(onSetFilterPromo(action))
    }, [])

    const onViewMore = () => {
        if (services.length >= 15 && services.length < totalItem) {
            dispatch(fetchAsyncServicesPromo({
                page: page + 1,
                sort: params?.sort
            }))
        }
    }
    const servicesList = services.map((i: IServicePromo) => {
        return {
            ...i,
            is_block: blockService(i.price, i.special_price)
        }
    })

    return (
        <>
            {
                IS_MB ?
                    <HeadMobile
                        title="TOP Deal khủng"
                        prevUrl="/homepage"
                    />
                    :
                    <Head prev_url="/homepage" />
            }
            <HeadTitle title={`${t("home_2.hot_beauty_deal")}`} />
            <Container>
                {
                    !IS_MB &&
                    <div className="home-result-ser-cnt">
                        <HomeTitleSection
                            title={`${t("home_2.hot_beauty_deal")}`}
                        />
                    </div>
                }
                <div className="home-promo-ser home-promo-ser__mb">
                    <FilterService
                        onChangeFilter={onChangeServicesByFilter}
                    />
                    {(status !== STATUS.SUCCESS && page === 1) && <LoadingServices />}
                    <InfiniteScroll
                        next={onViewMore}
                        hasMore={true}
                        loader={<></>}
                        dataLength={services.length}
                    >
                        <ul className="ser-list ser-list__mb home-result__cus">
                            {servicesList
                                .filter((i: any) => i.is_block === false)
                                .map(
                                    (item: IServicePromo, index: number) => (
                                        <li
                                            key={index}
                                            className="ser-list-item__mb ser-item__cus"
                                        >
                                            {
                                                IS_MB ?
                                                    <ServiceResultItem service={item} />
                                                    :
                                                    <ServicePromoItem service={item} />
                                            }
                                        </li>
                                    )
                                )}
                        </ul>
                    </InfiniteScroll>
                </div>
                {services.length === totalItem ? <></> : <LoadingMore />}
                <div style={{ marginBottom: "24px" }}>
                </div>
            </Container>
            <BackTopButton />
            <Footer />
        </>
    );
}

export default HomePromo;
