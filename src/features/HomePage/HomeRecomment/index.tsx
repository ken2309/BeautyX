/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { IServicePromo } from "../../../interface/servicePromo";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import HomeTitle from "../Components/HomeTitle";
import "./homeRecomment.css";
import { fetchAsyncServicesRandom } from '../../../redux/home/homePageSlice'
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from '../../../redux/status'
import { AppContext } from "../../../context/AppProvider";

export default function HomeRecomment() {
    const { t } = useContext(AppContext);
    const dispatch = useDispatch();
    const { SERVICES_RANDOM } = useSelector((state: any) => state.HOME_PAGE);
    const { services, status } = SERVICES_RANDOM;

    const callServicesRandom = () => {
        if (status !== STATUS.SUCCESS) {
            dispatch(fetchAsyncServicesRandom({
                page: 1,
                sort: "random"
            }))
        }
    }

    useEffect(() => {
        callServicesRandom()
    }, []);

    return (
        <div className="home-recomment">
            <HomeTitle title={t("home_2.suggestions_for_you")} />
            <ul className="home-recomment__list">
                {services?.map((item: IServicePromo, index: number) => (
                    <li className="home-recomment__item" key={index}>
                        <ServicePromoItem service={item} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
