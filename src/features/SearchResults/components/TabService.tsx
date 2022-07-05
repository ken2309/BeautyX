import React, { useEffect, useState } from 'react';
import FilterServices from '../../FilterServices';
import servicePromoApi from '../../../api/servicePromoApi';
import { IServicePromo } from '../../../interface/servicePromo';
import ServicePromoItem from '../../ViewItemCommon/ServicePromoItem';
import useFullScreen from '../../../utils/useFullScreen';
import ServiceResultItem from '../../Search/components/ServiceResultItem';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IData {
    services: IServicePromo[],
    page: number,
    totalItem: number
}

function TabService(props: any) {
    const { keyword, acTab } = props;
    const IS_MB = useFullScreen();
    const [dataSort, setDataSort] = useState('default')
    const [data, setData] = useState<IData>({
        services: [],
        page: 1,
        totalItem: 1
    })
    async function getServicesByKeyword() {
        try {
            const res = await servicePromoApi.getByKeyword({
                keyword: keyword,
                page: data.page
            });
            setData({
                ...data,
                services: [...data.services, ...res?.data.data.hits],
                totalItem: res?.data.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    async function getServicesBySort() {
        try {
            const res = await servicePromoApi.getBySort({
                keyword: keyword,
                page: data.page,
                dataSort: dataSort
            });
            setData({
                ...data,
                services: [...data.services, ...res?.data.data.hits],
                totalItem: res?.data.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    async function getServicesByUserLocation() {
        try {
            const res = await servicePromoApi.getByUserLocation({
                keyword: keyword,
                page: data.page
            })
            setData({
                ...data,
                services: [...data.services, ...res?.data.data.hits],
                totalItem: res?.data.total
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (dataSort === 'default') {
            getServicesByKeyword()
        } else if (dataSort === 'none') {
            getServicesByUserLocation()
        } else {
            getServicesBySort()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.page, dataSort, keyword]);

    const onViewMore = () => {
        if (data.services.length >= 15 && data.services.length < data.totalItem) {
            setData({
                ...data,
                page: data.page + 1
            })
        }
    }

    return (
        acTab === 1 ?
            <div>
                <FilterServices
                    dataSort={dataSort}
                    setDataSort={setDataSort}
                    data={data}
                    setData={setData}
                />
                <InfiniteScroll
                    dataLength={data.services.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul className="re-ser-list">
                        {
                            data.services.map((item: IServicePromo, index: number) => (
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