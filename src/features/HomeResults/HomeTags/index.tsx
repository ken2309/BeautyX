import React, { useEffect, useState } from "react";
import Head from "../../Head";
import { Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import HeadTitle from "../../HeadTitle";
import "../home-result.css";
import "../../MerchantDetail/components/OrgMap/orgMap.css";
import FilterOrgs from "../../FilterOrgs";
import orgApi from "../../../api/organizationApi";
import OrgItem from "../../ViewItemCommon/OrgItem";
import { IOrganization } from "../../../interface/organization";
import { Drawer } from "@mui/material";
import icon from "../../../constants/icon";
import InfiniteScroll from "react-infinite-scroll-component";
import HeadMobile from "../../HeadMobile";
import useFullScreen from "../../../utils/useFullScreen";
import BackTopButton from "../../../components/BackTopButton";
import Footer from "../../Footer";
import Map from "../../../components/Map";

interface IData {
    orgs: IOrganization[];
    page: number;
    totalItem: number;
}

function HomeTags(props: any) {
    const location = useLocation();
    const IS_MB = useFullScreen();
    const [openFilter, setOpenFilter] = useState(false);
    const [openMap, setOpenMap] = useState(false);
    const [orgFilter, setOrgFilter] = useState({
        tags: [],
        province_code: 0,
        min_price: 0,
        max_price: 0,
    });
    const [data, setData] = useState<IData>({
        orgs: [],
        page: 1,
        totalItem: 1,
    });
    const tag_name = decodeURI(
        location.search.slice(1, location.search.length)
    );

    async function handleGetOrgsSingleTag() {
        try {
            const res = await orgApi.getOrgsByTag({
                page: data.page,
                tag: tag_name,
                province: orgFilter.province_code,
                price: { min: orgFilter.min_price, max: orgFilter.max_price },
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
    useEffect(() => {
        handleGetOrgsSingleTag();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page, orgFilter.province_code]);

    const onViewMore = () => {
        if (data.orgs.length >= 15 && data.orgs.length < data.totalItem) {
            setData({
                ...data,
                page: data.page + 1,
            });
        }
    };
    return (
        <>
            {IS_MB ? (
                <HeadMobile
                    title={tag_name}
                    element={
                        <button
                            onClick={() => setOpenFilter(true)}
                            className="filter-btn"
                        >
                            <img src={icon.filter} alt="" />
                        </button>
                    }
                />
            ) : (
                <Head />
            )}
            <HeadTitle title={`Kết quả tìm kiếm cho : ${tag_name}`} />
            <Container>
                <div className="home-result-org-cnt">
                    <div className="home-result-org-cnt__left">
                        <FilterOrgs
                            hideTags={true}
                            orgFilter={orgFilter}
                            setOrgFilter={setOrgFilter}
                            setData={setData}
                            handleOrgsByKeyword={handleGetOrgsSingleTag}
                        />
                    </div>
                    <div className="home-result-org-cnt__mb">
                        <div className="flex-row-sp cnt">
                            <Drawer
                                anchor="right"
                                open={openFilter}
                                onClose={() => setOpenFilter(false)}
                            >
                                <FilterOrgs
                                    hideTags={true}
                                    orgFilter={orgFilter}
                                    setOrgFilter={setOrgFilter}
                                    setData={setData}
                                    handleOrgsByKeyword={handleGetOrgsSingleTag}
                                    setOpenFilter={setOpenFilter}
                                />
                            </Drawer>
                        </div>
                    </div>
                    <div className="home-result-org-cnt__right">
                        <div className="cnt-right__top">
                            <span className="se-re-cnt-title">
                                Kết quả tìm kiếm cho : "{tag_name}"
                            </span>
                            <div
                                onClick={() => {
                                    setOpenMap(true);
                                }}
                                className="open-map"
                            >
                                <div className="flexX-gap-4">
                                    <p>Bản đồ</p>
                                    <img
                                        style={{ width: "16px" }}
                                        src={icon.mapPinRed}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <InfiniteScroll
                            dataLength={data.orgs.length}
                            hasMore={true}
                            loader={<></>}
                            next={onViewMore}
                        >
                            <ul className="re-ser-list">
                                {data.orgs.map(
                                    (item: IOrganization, index: number) => (
                                        <li key={index}>
                                            <OrgItem org={item} />
                                        </li>
                                    )
                                )}
                            </ul>
                        </InfiniteScroll>
                    </div>
                </div>
            </Container>
            <Map data={data.orgs} open={openMap} setOpenMap={setOpenMap} />
            <BackTopButton />
            <Footer />
        </>
    );
}

export default HomeTags;
