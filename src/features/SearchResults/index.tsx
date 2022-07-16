/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useEffect, useState } from "react";
import Head from "../Head";
import HeadTitle from "../HeadTitle";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import "./search-results.css";
import { Container } from "@mui/material";
import TabService from "./components/TabService";
import Footer from "../Footer";
import TabOrgs from "./components/TabOrgs";
import icon from "../../constants/icon";
import { Drawer } from "@mui/material";
import TabProduct from "./components/TabProduct";
import { useDispatch, useSelector } from "react-redux";
import {
    onSetTabResult,
    fetchAsyncOrgsByFilter,
    fetchServicesByFilter,
    fetchProductsByFilter,
    onSetEmptyOrgs,
} from "../../redux/search/searchResultSlice";
import useFullScreen from "../../utils/useDeviceMobile";
import HeadMobile from "../HeadMobile";
import BackTopButton from "../../components/BackTopButton";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import Map from "../../components/Map";
import { STATUS } from "../../redux/status";
import FilterOrgs from "../Filter/FilterOrgs";
import { extraParamsUrl } from "../../utils/extraParamsUrl";

function SearchResults(props: any) {
    const history = useHistory();
    const { t } = useContext(AppContext);
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const location: any = useLocation();
    const params: any = extraParamsUrl();
    // const searchKey = decodeURI(
    //     location.search.slice(1, location.search.length)
    // );
    const searchKey = params?.keyword;
    const { tab, RE_ORGS, RE_SERVICES, RE_PRODUCTS } = useSelector(
        (state: any) => state.SEARCH_RESULT
    );

    const { FILTER_ORG } = useSelector((state: any) => state.FILTER);
    const FILTER_ORGS_VAL = {
        ...FILTER_ORG,
        tags: FILTER_ORG.tags.join("|"),
        province_code: FILTER_ORG.province?.province_code,
        district_code: FILTER_ORG.district?.district_code,
    };
    const [openMap, setOpenMap] = useState(false);

    let tabs = [
        {
            id: 1,
            title: t("Mer_de.services"),
            total: location.state?.servicesTotal,
        },
        {
            id: 2,
            title: t("Mer_de.products"),
            total: location.state?.productsTotal,
        },
        {
            id: 3,
            title: t("my_ser.business"),
            total: location.state?.orgsTotal,
        },
    ];
    if (location.state) {
        tabs = tabs.sort((a, b) => b.total - a.total);
    }
    const callOrgsByKeyword = () => {
        if (RE_ORGS.status !== STATUS.SUCCESS) {
            dispatch(onSetTabResult(tabs[0].id));
            dispatch(
                fetchAsyncOrgsByFilter({
                    keyword: searchKey,
                    page: 1,
                })
            );
        }
    };
    const callServicesByKeyword = () => {
        if (RE_SERVICES.status !== STATUS.SUCCESS) {
            dispatch(
                fetchServicesByFilter({
                    page: 1,
                    keyword: searchKey,
                })
            );
        }
    };
    const callProductsByKeyword = () => {
        if (RE_PRODUCTS.status !== STATUS.SUCCESS) {
            dispatch(
                fetchProductsByFilter({
                    page: 1,
                    keyword: searchKey,
                })
            );
        }
    };

    useEffect(() => {
        callOrgsByKeyword();
        callServicesByKeyword();
        callProductsByKeyword();
    }, [searchKey]);
    const [openFilter, setOpenFilter] = useState(false);
    const onActiveTab = useCallback((tab) => {
        dispatch(onSetTabResult(tab.id));
    }, []);

    const handleApplyFilterOrgs = () => {
        setOpenFilter(false);
        dispatch(onSetEmptyOrgs());
        dispatch(
            fetchAsyncOrgsByFilter({
                ...FILTER_ORGS_VAL,
                page: 1,
                keyword: searchKey,
            })
        );
    };

    //
    const onGoBack = () => {
        history.goBack();
        dispatch(onToggleSearchCnt(true));
    };
    return (
        <>
            <HeadTitle
                title={`${t("Search_result.text_result")} : ${searchKey}`}
            />
            {IS_MB ? (
                <HeadMobile
                    element={
                        tab === 3 && (
                            <button onClick={() => setOpenFilter(true)}>
                                <img src={icon.settingsSliders} alt="" />
                            </button>
                        )
                    }
                    onBackFunc={onGoBack}
                    title="Kết quả tìm kiếm"
                />
            ) : (
                <Head prev_url="/homepage" />
            )}
            <Container>
                <div className="se-re-cnt">
                    <div className="se-re-cnt__left">
                        <div className="se-re-cnt__left-top">
                            <ul className="se-re-cnt__left-list">
                                {tabs.map((item) => (
                                    <li
                                        style={
                                            tab === item.id
                                                ? {
                                                      backgroundColor:
                                                          "var(--purple)",
                                                      color: "var(--bgWhite)",
                                                  }
                                                : {}
                                        }
                                        onClick={() => onActiveTab(item)}
                                        key={item.id}
                                    >
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {tab === 3 &&
                            <>
                                {
                                    IS_MB ?
                                        <Drawer
                                            anchor="right"
                                            open={openFilter}
                                            onClose={() => setOpenFilter(false)}
                                        >
                                            <div
                                                style={{ width: "80vw", height: "100vh" }}
                                            >
                                                <FilterOrgs
                                                    onApplyFilterOrgs={handleApplyFilterOrgs}
                                                />
                                            </div>
                                        </Drawer>
                                        :
                                        <FilterOrgs
                                            onApplyFilterOrgs={handleApplyFilterOrgs}
                                        />
                                }
                            </>
                        }
                    </div>
                    <div className="se-re-cnt__right">
                        <div
                            style={{
                                paddingRight: "6px 12px",
                                paddingBottom: "6px",
                            }}
                            className="cnt-right__top"
                        >
                            <span className="se-re-cnt-title">
                                {t("se.search_results_for_keyword")} : "
                                {searchKey}"
                            </span>

                            {tab === 3 && (
                                <div
                                    onClick={() => {
                                        setOpenMap(true);
                                    }}
                                    className="open-map"
                                >
                                    <div className="flexX-gap-4">
                                        <p>{t("pr.map")}</p>
                                        <img
                                            src={icon.mapPinRed}
                                            alt=""
                                            style={{ width: "16px" }}
                                        ></img>
                                    </div>
                                </div>
                            )}
                        </div>
                        <TabService keyword={searchKey} acTab={tab} />
                        <TabProduct keyword={searchKey} acTab={tab} />
                        <TabOrgs
                            acTab={tab}
                            keyword={searchKey}
                            FILTER_ORGS_VAL={FILTER_ORGS_VAL}
                        />
                    </div>
                </div>
            </Container>
            {RE_ORGS.orgs.length > 0 && (
                <Map
                    data={RE_ORGS.orgs}
                    open={openMap}
                    setOpenMap={setOpenMap}
                />
            )}
            <BackTopButton />
            <Footer />
        </>
    );
}

export default SearchResults;
