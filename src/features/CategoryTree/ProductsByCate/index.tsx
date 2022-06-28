/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import HeadMobile from '../../HeadMobile';
import { fetProductsByCateChild, onClearProducts } from '../../../redux/CateTree/cateTreeSlice';
import { STATUS } from '../../../redux/status'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProductCateItem from './ProductCateItem';
import { extraParamsUrl } from '../../../utils/extraParamsUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css'

function ProductsByCate(props: any) {
    const params: any = extraParamsUrl();
    const { PRODUCTS } = useSelector((state: any) => state.CATE_TREE);
    const { products, page, totalItem } = PRODUCTS;
    const dispatch = useDispatch();
    const callProducts = () => {
        if (PRODUCTS.status !== STATUS.SUCCESS || params.keyword !== PRODUCTS.keyword) {
            const values = {
                page: 1,
                keyword: params.keyword
            }
            dispatch(onClearProducts())
            dispatch(fetProductsByCateChild(values))
        }
    }
    useEffect(() => {
        callProducts()
    }, [])
    const onViewMore = () => {
        if (products.length >= 15 && products.length < totalItem) {
            dispatch(fetProductsByCateChild({
                keyword: params.keyword,
                page: page + 1
            }))
        }
    }
    return (
        <>
            <HeadMobile title='Danh sách sản phẩm' />
            <div className='pr-result-cnt'>
                <InfiniteScroll
                    dataLength={products.length}
                    hasMore={true}
                    next={onViewMore}
                    loader={<></>}
                >
                    <ul className="pr-result-cnt__list">
                        {
                            products.map((item: any, index: any) => (
                                <li key={index} >
                                    <ProductCateItem
                                        item={item}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </InfiniteScroll>
            </div>
        </>
    );
}

export default ProductsByCate;