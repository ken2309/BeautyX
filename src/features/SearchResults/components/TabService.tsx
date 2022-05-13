import React, { useEffect, useState } from 'react';
import FilterServices from '../../FilterServices';
import servicePromoApi from '../../../api/servicePromoApi';
import { IServicePromo } from '../../../interface/servicePromo';
import ServicePromoItem from '../../ViewItemCommon/ServicePromoItem';
import { Pagination } from '@mui/material';
import scrollTop from '../../../utils/scrollTop';

function TabService(props: any) {
    const { keyword, acTab, itemCount, setItemCount } = props;
    const [dataSort, setDataSort] = useState('default')
    const [data, setData] = useState({
        services: [],
        page: 1,
        lastPage: 1
    })
    async function getServicesByKeyword() {
        try {
            const res = await servicePromoApi.getByKeyword({
                keyword: keyword,
                page: data.page
            });
            setItemCount({ ...itemCount, servicesCount: res.data.total })
            setData({
                ...data,
                services: res?.data.data.hits,
                lastPage: res?.data.last_page
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
                services: res?.data.data.hits,
                lastPage: res?.data.last_page
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
                services: res?.data.data.hits,
                lastPage: res?.data.last_page
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

    const onPageChange = (e: any, value: any) => {
        setData({
            ...data,
            page: value
        })
        scrollTop()
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
                <ul className="re-ser-list">
                    {
                        data.services.map((item: IServicePromo, index: number) => (
                            <li
                                key={index}
                            >
                                <ServicePromoItem
                                    service={item}
                                />
                            </li>
                        ))
                    }
                </ul>
                <Pagination
                    color="secondary"
                    shape="rounded"
                    count={data.lastPage}
                    onChange={onPageChange}
                />
            </div>
            :
            <></>
    );
}

export default TabService;