import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncServices, clearServices } from '../../../redux/org_services/orgServivesSlice';
import { extraParamsUrl } from '../../../utils/extraParamsUrl';
import { STATUS } from '../../../redux/status';
import { Service } from '../../../interface/service';
import ServiceItem from '../../ViewItemCommon/ServiceItem';


function DetailRecommend(props: any) {
    const params: any = extraParamsUrl();
    const { org } = props;
    const dispatch = useDispatch();
    const { SERVICES } = useSelector((state: any) => state.ORG_SERVICES);
    const { SERVICE } = useSelector((state: any) => state.SERVICE);
    const callServicesRecommend = () => {
        if (SERVICE.status === STATUS.SUCCESS) {
            const values = {
                page: 1,
                org_id: params.org,
                cate_id: SERVICE.service.category?.id
            }
            dispatch(clearServices())
            dispatch(fetchAsyncServices(values))
        }
    }
    useEffect(() => {
        callServicesRecommend()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SERVICE.status])
    return (
        <div className="detail-recommend">
            <div className="detail-recommend__title">
                Dịch vụ tương tự
            </div>
            <ul className="detail-recommend__list">
                {
                    SERVICES.services.map((item: Service, index: number) => (
                        <li
                            key={index}
                        >
                            <ServiceItem
                                service={item}
                                org={org}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default DetailRecommend;