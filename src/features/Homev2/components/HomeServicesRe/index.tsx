import React, { useContext, useEffect, useState } from "react";
import "../../home-se.css";
import HomeTitleSection from "../HomeTitleSection/index";
import servicePromoApi from "../../../../api/servicePromoApi";
import ServicePromoItem from "../../../ViewItemCommon/ServicePromoItem";
import { IServicePromo } from "../../../../interface/servicePromo";
import { AppContext } from "../../../../context/AppProvider";

function HomeServicesRe(props: any) {
    const { t } = useContext(AppContext);
    const [data, setData] = useState({
        services: [],
        page: 1,
        lastPage: 1,
    });
    async function getServicesRecommend() {
        try {
            const res = await servicePromoApi.getServicesRe();
            setData({
                ...data,
                services: res.data.data.hits,
                lastPage: res.data.last_page,
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getServicesRecommend();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="home-se-re">
            <HomeTitleSection title={t("Home.sale_for_me")} />
            <div className="home-promo-ser">
                <ul className="ser-list">
                    {data.services
                        .slice(0, 18)
                        .map((item: IServicePromo, index: number) => (
                            <li key={index}>
                                <ServicePromoItem service={item} />
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default HomeServicesRe;
