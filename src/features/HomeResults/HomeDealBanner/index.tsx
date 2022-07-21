import React, { useEffect, useState } from 'react';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import servicePromoApi from '../../../api/servicePromoApi';
import { IServicePromo } from '../../../interface/servicePromo'
import ServicePromoItem from '../../ViewItemCommon/ServicePromoItem';
import ButtonLoading from '../../../components/ButtonLoading';
import { dealHot } from '../../../constants/img';

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

export const deals = [
    { id: 1, title: 'Deal hot từ 50-100k', min_price: 50000, max_price: 100000, img: dealHot.dealhot },
    { id: 2, title: 'Deal chăm sóc da làm đẹp Giảm 50%', min_price: null, img: dealHot.dealhot1, percent: 50 },
    { id: 3, title: 'Dịch vụ xâm lấn Giảm 30%', min_price: null, img: dealHot.dealhot2, percent: 30 }
]

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
            const res = await servicePromoApi.getServicesPromo({
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