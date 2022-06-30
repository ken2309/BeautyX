/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useContext, useState } from "react";
import Head from "../Head";
import HeadTitle from "../HeadTitle";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import "./search-results.css";
import { Container } from "@mui/material";
import FilterOrgs from "../FilterOrgs";
import TabService from "./components/TabService";
import Footer from "../Footer";
import TabOrgs from "./components/TabOrgs";
import TabLocation from "./components/TabLocation";
import orgApi from "../../api/organizationApi";
import icon from "../../constants/icon";
import { Drawer } from "@mui/material";
import { IOrganization } from "../../interface/organization";
import TabProduct from "./components/TabProduct";
import { useDispatch, useSelector } from "react-redux";
import { onSetTabResult } from "../../redux/search/searchResultSlice";
import useFullScreen from "../../utils/useFullScreen";
import HeadMobile from "../HeadMobile";
import BackTopButton from "../../components/BackTopButton";
import { onToggleSearchCnt } from "../../redux/search/searchSlice";
import Map from "../../components/Map/Map";
import EmptyRes from '../EmptyRes';

interface IData {
    orgs: IOrganization[];
    page: number;
    totalItem: number;
}

function SearchResults(props: any) {
    const history = useHistory();
    const { t } = useContext(AppContext);
    const IS_MB = useFullScreen();
    const dispatch = useDispatch();
    const location = useLocation();
    const searchKey = decodeURI(
        location.search.slice(1, location.search.length)
    );
    const { tab } = useSelector((state: any) => state.SEARCH_RESULT);
    const [openMap, setOpenMap] = useState(false);

    const tabs = [
        { id: 1, title: t("Mer_de.services") },
        { id: 2, title: t("Mer_de.products") },
        { id: 3, title: t("my_ser.business") },
    ];
    const [openFilter, setOpenFilter] = useState(false);
    const onActiveTab = useCallback((tab) => {
        dispatch(onSetTabResult(tab.id));
    }, []);
    //filter for org
    const [data, setData] = useState<IData>({
        orgs: [],
        page: 1,
        totalItem: 0,
    });
    const [orgFilter, setOrgFilter] = useState({
        tags: [],
        province_code: 0,
        min_price: 0,
        max_price: 0,
    });
    async function handleOrgsByKeyword() {
        try {
            const res = await orgApi.getOrgByKeyword({
                keyword: searchKey,
                page: data.page,
                tags: orgFilter.tags.join("|"),
                province: orgFilter.province_code,
                price: {
                    min: orgFilter.min_price,
                    max: orgFilter.max_price,
                },
            });
            setData({
                ...data,
                orgs: [...data.orgs, ...res.data.context.data],
                totalItem: res.data.context.total,
            });
        } catch (error) {
            console.log(error);
        }
    }
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
                <HeadMobile onBackFunc={onGoBack} title="Kết quả tìm kiếm" />
            ) : (
                <Head />
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
                        {tab === 3 ?
                            data.orgs.length > 0 &&
                            (
                                <>
                                    <FilterOrgs
                                        orgFilter={orgFilter}
                                        setOrgFilter={setOrgFilter}
                                        data={data}
                                        setData={setData}
                                        handleOrgsByKeyword={handleOrgsByKeyword}
                                    />
                                    <div className="home-result-org-cnt__mb">
                                        <div className="flex-row-sp cnt">
                                            <span className="title">
                                                Bộ lọc tìm kiếm
                                        </span>
                                            <button
                                                onClick={() => setOpenFilter(true)}
                                                className="filter-btn"
                                            >
                                                <img src={icon.filter} alt="" />
                                            </button>
                                            <Drawer
                                                anchor="right"
                                                open={openFilter}
                                                onClose={() => setOpenFilter(false)}
                                            >
                                                <FilterOrgs
                                                    orgFilter={orgFilter}
                                                    setOrgFilter={setOrgFilter}
                                                    setData={setData}
                                                    handleOrgsByKeyword={
                                                        handleOrgsByKeyword
                                                    }
                                                    setOpenFilter={setOpenFilter}
                                                />
                                            </Drawer>
                                        </div>
                                    </div>

                                </>
                            )
                            : (
                                <></>
                            )}
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

                            {tab === 1 || tab === 2 || (data?.orgs.length == 0) ? null : (
                                <div
                                    onClick={() => {
                                        setOpenMap(true);
                                    }}
                                    className="open-map"
                                >
                                    <div className="flexX-gap-4">
                                        <p>Bản đồ</p>
                                        <img
                                            src="/static/media/mapPinRed.2be9ae82.svg"
                                            alt=""
                                            style={{ width: "16px" }}
                                        ></img>
                                    </div>
                                </div>
                            )}
                        </div>
                        <TabService keyword={searchKey} acTab={tab} />
                        <TabProduct keyword={searchKey} acTab={tab} />
                        {
                            tab === 3 && (data?.orgs.length == 0) && <EmptyRes title={'Không tìm được kết quả phù hợp cho "' + searchKey + '"'} />
                        }
                        <TabOrgs
                            orgFilter={orgFilter}
                            keyword={searchKey}
                            acTab={tab}
                            data={data}
                            setData={setData}
                            handleOrgsByKeyword={handleOrgsByKeyword}
                        />

                        <TabLocation acTab={tab} searchKey={searchKey} />
                    </div>
                </div>
            </Container>
            {data.orgs.length > 0 && <Map data={data.orgs} open={openMap} setOpenMap={setOpenMap} />}
            <BackTopButton />
            <Footer />
        </>
    );
}

export default SearchResults;
