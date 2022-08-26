/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IServicePromo } from "../../../interface/servicePromo";
import FilterService from "../../Filter/FilterService";
import ServicePromoItem from "../../ViewItemCommon/ServicePromoItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncServicesPromo } from '../../../redux/home/homePageSlice';
import { STATUS } from '../../../redux/status'
import { blockService } from "../../../utils/blockCardItem";


function HomePromo(props: any) {
    const { SERVICES_PROMO } = useSelector((state: any) => state.HOME_PAGE);
    const { FILTER_PROMO } = useSelector((state: any) => state.FILTER);
    const dispatch = useDispatch();
    const { services, status, query } = SERVICES_PROMO

    const servicesList = services.map((i: IServicePromo) => {
        return {
            ...i,
            is_block: blockService(i.price, i.special_price)
        }
    })

    const callServicesPromo = () => {
        if (status !== STATUS.SUCCESS && status !== STATUS.FAIL) {
            dispatch(fetchAsyncServicesPromo({
                page: 1,
                sort: FILTER_PROMO.query
            }))
        }
    }
    useEffect(() => {
        callServicesPromo()
    }, [])

    const onChangeServicesByFilter = (item: any) => {
        if (query !== item.query) {
            dispatch(fetchAsyncServicesPromo({
                page: 1,
                sort: item.query
            }))
        }
    }
    return (
        <>
            {
                status === STATUS.FAIL
                    ?
                    <></>
                    :
                    <div className="home-se-promo">
                        <FilterService
                            onChangeFilter={onChangeServicesByFilter}
                        />
                        <div className="home-promo-ser">
                            <ul className="ser-list">
                                {servicesList
                                    .filter((i:any) => i.is_block === false)
                                    .slice(0, 18)
                                    .map((item: IServicePromo, index: number) => (
                                        <li key={index}>
                                            <ServicePromoItem service={item} />
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
            }
        </>
    );
}

export default HomePromo;
