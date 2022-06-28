import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import servicePromoApi from "../../../api/servicePromoApi";
import { IServicePromo } from "../../../interface/servicePromo";
import { fetchAsyncHotDealPromo } from "../../../redux/home/HomeHotDeal/homeHotDealSlide";
import FilterServices from "../../FilterServices";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";

interface IData {
    services: IServicePromo[];
    lastPage: number;
    page: 1;
}

function HomePromo(props: any) {
    const dispatch = useDispatch();
    const hotdeal = useSelector((state: any) => state.HOTDEAL.HOTDEAL);
    console.log("hotdeal", hotdeal.hotdeal);
    const [data, setData] = useState<IData>({
        services: hotdeal.hotdeal,
        lastPage: 1,
        page: 1,
    });
    // console.log("data", data.services);
    const [dataSort, setDataSort] = useState("-discount_percent");
    async function getServicesPromo() {
        try {
            const res = await servicePromoApi.getServicesPromo({
                page: data.page,
                sort: dataSort,
            });
            setData({
                ...data,
                services: res.data.data.hits,
            });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        // const values = {
        //     page: data.page,
        //     sort: dataSort,
        // };
        // dispatch(fetchAsyncHotDealPromo({ values }));
        getServicesPromo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSort]);
    return (
        <div className="home-se-promo">
            <FilterServices
                dataSort={dataSort}
                setDataSort={setDataSort}
                setData={setData}
            />
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

export default HomePromo;
