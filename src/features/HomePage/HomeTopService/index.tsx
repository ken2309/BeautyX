/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IServicePromo } from "../../../interface/servicePromo";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeTopService.css";
import { fetchAsyncServicesBought } from '../../../redux/home/homePageSlice'
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from '../../../redux/status'


export default function HomeTopService() {
    const dispatch = useDispatch();
    const { SERVICES_BOUGHT } = useSelector((state: any) => state.HOME_PAGE);
    const { services, status } = SERVICES_BOUGHT;

    const callServicesTopBought = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncServicesBought({
                page: 1,
                sort: "-bought_count"
            }))
        }
    }

    useEffect(() => {
        callServicesTopBought()
    }, []);

    return (
        <div className="home-top__service">
            <HomeTitle
                title={`Top Dịch Vụ Bán Chạy`}
                // url={"/"}
                // seemore={"Xem chi tiết >"}
            />
            <div className="top-service__list">
                {services?.map((item: IServicePromo, index: number) => (
                    <ServicePromoItem key={index} service={item} />
                ))}
            </div>
        </div>
    );
}
