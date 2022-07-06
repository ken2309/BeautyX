import React from 'react';
import { IServicePromo } from '../../../interface/servicePromo';
import ServicePromoItem from '../../ViewItemCommon/ServicePromoItem';
import useFullScreen from '../../../utils/useFullScreen';
import ServiceResultItem from '../../Search/components/ServiceResultItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServicesByFilter } from '../../../redux/search/searchResultSlice';


function TabService(props: any) {
    const { keyword, acTab } = props;
    const dispatch = useDispatch();
    const IS_MB = useFullScreen();
    const { services, page, totalItem } = useSelector((state: any) => state.SEARCH_RESULT.RE_SERVICES);
    const onViewMore = () => {
        if (services.length >= 30 && services.length < totalItem) {
            dispatch(fetchServicesByFilter({
                page: page + 1,
                keyword: keyword
            }))
        }
    }

    return (
        acTab === 1 ?
            <div>
                <InfiniteScroll
                    dataLength={services.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul className="re-ser-list">
                        {
                            services.map((item: IServicePromo, index: number) => (
                                <li className='re-ser-list__item'
                                    key={index}
                                >
                                    {IS_MB ? <ServiceResultItem service={item} /> : <ServicePromoItem service={item} />}
                                </li>
                            ))
                        }
                    </ul>
                </InfiniteScroll>
            </div>
            :
            <></>
    );
}

export default TabService;