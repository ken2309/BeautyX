import React, { useContext, useEffect, useState } from "react";
import Head from "../../Head";
import HeadTitle from "../../HeadTitle";
import { Container } from "@mui/material";
import "../home-result.css";
import HomeTitleSection from "../../Homev2/components/HomeTitleSection/index";
import FilterServices from "../../FilterServices";
import servicePromoApi from "../../../api/servicePromoApi";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import { IServicePromo } from "../../../interface/servicePromo";
import { Pagination } from "@mui/material";
import scrollTop from "../../../utils/scrollTop";
import { AppContext } from "../../../context/AppProvider";

function HomePromo(props: any) {
    const { t } = useContext(AppContext);
    const [dataSort, setDataSort] = useState("-discount_percent");
    const [data, setData] = useState({
        services: [],
        page: 1,
        lastPage: 1,
    });
    async function getServicesPromo() {
        try {
            const res = await servicePromoApi.getServicesPromo({
                page: data.page,
                sort: dataSort,
            });
            setData({
                ...data,
                services: res.data.data.hits,
                lastPage: res?.data.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getServicesPromo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page, dataSort]);
    const onPageChange = (e: any, value: any) => {
        setData({
            ...data,
            page: value,
        });
        scrollTop();
    };
    return (
        <>
            <Head />
            <HeadTitle title={`${t("home_2.hot_beauty_deal")}`} />
            <Container>
                <div className="home-result-ser-cnt">
                    <HomeTitleSection
                        title={`${t("home_2.hot_beauty_deal")}`}
                    />
                    <FilterServices
                        dataSort={dataSort}
                        setDataSort={setDataSort}
                        setData={setData}
                    />
                </div>
                <div className="home-promo-ser home-promo-ser__mb">
                    <ul className="ser-list ser-list__mb home-result__cus">
                        {data.services.map(
                            (item: IServicePromo, index: number) => (
                                <li
                                    key={index}
                                    className="ser-list-item__mb ser-item__cus"
                                >
                                    <ServicePromoItem service={item} />
                                </li>
                            )
                        )}
                    </ul>
                </div>
                <div style={{ marginBottom: "24px" }}>
                    <Pagination
                        color="secondary"
                        shape="rounded"
                        count={data.lastPage}
                        onChange={onPageChange}
                    />
                </div>
            </Container>
        </>
    );
}

export default HomePromo;
