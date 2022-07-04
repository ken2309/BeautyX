/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { IProductPromo } from '../../../interface/productPromo'
import productsApi from '../../../api/productApi'
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductPromoItem from '../../ViewItemCommon/ProductPromoItem';
import ProductResultItem from '../../Search/components/ProductResultItem';
import useFullScreen from '../../../utils/useFullScreen';

interface IData {
    products: IProductPromo[],
    page: number,
    totalItem: number
}

function TabProduct(props: any) {
    const { acTab, keyword } = props;
    const IS_MB = useFullScreen();
    const [data, setData] = useState<IData>({
        products: [],
        page: 1,
        totalItem: 1
    })

    const callProductsList = async () => {
        try {
            const res = await productsApi.getProductsSingle({
                page: data.page,
                keyword: keyword
            })
            setData({
                ...data,
                products: [...data.products, ...res.data.data.hits],
                totalItem: res.data.total

            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        callProductsList()
    }, [data.page, keyword])

    const onViewMore = () => {
        if (data.products.length >= 15 && data.products.length < data.totalItem) {
            setData({
                ...data,
                page: data.page + 1
            })
        }
    }

    return (
        acTab === 2 ?
            <div>
                {/* <FilterServices
                    dataSort={dataSort}
                    setDataSort={setDataSort}
                    data={data}
                    setData={setData}
                /> */}
                <InfiniteScroll
                    dataLength={data.products.length}
                    hasMore={true}
                    loader={<></>}
                    next={onViewMore}
                >
                    <ul className="re-ser-list">
                        {
                            data.products.map((item: IProductPromo, index: number) => (
                                <li className='re-ser-list__item'
                                    key={index}
                                >
                                    {
                                        IS_MB ?
                                            <ProductResultItem keyword={keyword} product={item} />
                                            :
                                            <ProductPromoItem product={item}
                                            />
                                    }
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

export default TabProduct;