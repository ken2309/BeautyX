import React, { useEffect, useState } from 'react';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import { deals } from '../../Homev2/components/HomeDeal';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import servicePromoApi from '../../../api/servicePromoApi';
import { IServicePromo } from '../../../interface/servicePromo'
import ServicePromoItem from '../../ViewItemCommon/ServicePromoItem';
import FilterServices from '../../FilterServices';
import ButtonLoading from '../../../components/ButtonLoading';

interface IBanner {
    id: number,
    title: string,
    min_price: number | null,
    max_price?: number | null,
    percent?: number,
    img: string
}
interface IData {
    services: IServicePromo[],
    page: number,
    totalItem: number,
    loadPage: boolean
}

function HomeDealBanner() {
    const location = useLocation();
    const id_banner = location.search.slice(1, location.search.length);
    const bannerDeals = deals.find((item: IBanner) => item.id === parseInt(id_banner))
    const [dataSort, setDataSort] = useState('-discount_percent')
    const [data, setData] = useState<IData>({
        services: [],
        page: 1,
        totalItem: 1,
        loadPage: false
    })
    const handleGetServices = async () => {
        try {
            const res = await servicePromoApi.getServicesDealBanner({
                page: data.page,
                min_price: bannerDeals?.min_price,
                max_price: bannerDeals?.max_price,
                percent: bannerDeals?.percent,
                location: dataSort,
                sort: dataSort
            })
            setData({
                ...data,
                services: [...data.services, ...res.data.data.hits],
                totalItem: res.data.total,
                loadPage: false
            })
        } catch (error) {
            console.log(error)
            setData({ ...data, loadPage: false })
        }
    }
    useEffect(() => {
        handleGetServices()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSort, data.page])
    const onViewMore = () => {
        setData({
            ...data,
            page: data.page + 1,
            loadPage: true
        })
    }
    return (
        <>
            <HeadTitle
                title={bannerDeals?.title}
            />
            <Head />
            <div
                className='deal-banner'
            >
                <Container>
                    <div className="deal-banner__wr">
                        <img src={bannerDeals?.img} alt="" className="deal-banner__img" />
                        <FilterServices
                            dataSort={dataSort}
                            setDataSort={setDataSort}
                            setData={setData}
                        />
                        <ul className="deal-banner__list">
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
                        <div className="deal-banner__bot">
                            {
                                data.services.length < data.totalItem &&
                                <ButtonLoading
                                    title='Xem thêm'
                                    onClick={onViewMore}
                                    loading={data.loadPage}
                                />
                            }
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default HomeDealBanner;