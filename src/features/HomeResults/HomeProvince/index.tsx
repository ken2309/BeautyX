import React, { useEffect, useState } from "react";
import Head from "../../Head";
import HeadTitle from "../../HeadTitle";
import { useLocation } from "react-router-dom";
import { Container, Drawer } from "@mui/material";
import FilterOrgs from "../../FilterOrgs";
import orgApi from "../../../api/organizationApi";
import OrgItem from "../../ViewItemCommon/OrgItem";
import { IOrganization } from "../../../interface/organization";
import InfiniteScroll from "react-infinite-scroll-component";
import HeadMobile from "../../HeadMobile";
import useFullScreen from "../../../utils/useFullScreen";
import icon from "../../../constants/icon";
import BackTopButton from "../../../components/BackTopButton";
import Footer from "../../Footer";
import Map from "../../../components/Map/Map";

interface IData {
    orgs: IOrganization[];
    page: number;
    totalItem: number;
}

function HomeProvince(props: any) {
    const location = useLocation();
    const search = location.search.slice(1, location.search.length);
    const searchArr = search.split(",");
    const IS_MB = useFullScreen();
    const [openMap, setOpenMap] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const province_name = decodeURI(searchArr[0]);
    const province_code = searchArr[1];
    const [orgFilter, setOrgFilter] = useState({
        tags: [],
        province_code: parseInt(province_code),
        min_price: 0,
        max_price: 0,
    });
    const [data, setData] = useState<IData>({
        orgs: [],
        page: 1,
        totalItem: 1,
    });
    async function getOrgsByProvince() {
        try {
            const res = await orgApi.getOrgsByProvinceCode({
                page: data.page,
                province: orgFilter.province_code,
                tags: orgFilter.tags.join("|"),
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
        getOrgsByProvince();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgFilter.tags, data.page]);

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
                    title={province_name}
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
            <HeadTitle title={`Khu vực : ${province_name}`} />
            <Container>
                <div className="home-result-org-cnt">
                    <div className="home-result-org-cnt__left">
                        <FilterOrgs
                            hideProvinces={true}
                            orgFilter={orgFilter}
                            setOrgFilter={setOrgFilter}
                            setData={setData}
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
                                    hideProvinces={true}
                                    orgFilter={orgFilter}
                                    setOrgFilter={setOrgFilter}
                                    setData={setData}
                                />
                            </Drawer>
                        </div>
                    </div>
                    <div className="home-result-org-cnt__right">
                        <div className="cnt-right__top">
                            <span className="se-re-cnt-title">
                                Khu vực : "{province_name}"
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
                                        src={icon.mapPinRed}
                                        alt=""
                                        style={{ width: "16px" }}
                                    ></img>
                                </div>
                            </div>
                        </div>
                        <InfiniteScroll
                            hasMore={true}
                            dataLength={data.orgs.length}
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

export default HomeProvince;
