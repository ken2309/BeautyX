import React, { useEffect, useState } from "react";
import servicePromoApi from "../../../api/servicePromoApi";
import { IServicePromo } from "../../../interface/servicePromo";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeTopService.css";
interface IData {
    services: IServicePromo[];
    page: number;
    sort: string;
}
export default function HomeTopService() {
    const [data, setData] = useState<IData>({
        services: [],
        page: 1,
        sort: "bought_count",
    });
    const getBySort = async () => {
        const values = {
            page: data.page,
            sort: data.sort,
        };
        try {
            const res = await servicePromoApi.getBySort(values);
            setData({
                ...data,
                services: res?.data?.data?.hits,
            });
        } catch (error) {
            console.log("error", error);
        }
    };
    useEffect(() => {
        getBySort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="home-top__service">
            <HomeTitle
                title={`Top Dịch Vụ Bán Chạy`}
                url={"/"}
                seemore={"Xem chi tiết >"}
            />
            <div className="top-service__list">
                {data?.services?.map((item: IServicePromo, index: number) => (
                    <ServicePromoItem key={index} service={item} />
                ))}
            </div>
        </div>
    );
}
