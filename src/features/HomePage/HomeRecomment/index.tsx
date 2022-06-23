import React, { useEffect, useState } from "react";
import servicePromoApi from "../../../api/servicePromoApi";
import { IServicePromo } from "../../../interface/servicePromo";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeRecomment.css";
interface IData {
    services: IServicePromo[];
    page: number;
    lastPage: number;
}
export default function HomeRecomment() {
    const [data, setData] = useState<IData>({
        services: [],
        page: 1,
        lastPage: 1,
    });
    const getServiceRecomment = async () => {
        try {
            const res = await servicePromoApi.getServicesRe();
            setData({ ...data, services: res.data.data.hits });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getServiceRecomment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="home-recomment">
            <HomeTitle title={"Gợi ý dành cho bạn"} />
            <ul className="home-recomment__list">
                {data?.services?.map((item: IServicePromo, index: number) => (
                    <li className="home-recomment__item">
                        <ServicePromoItem service={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
