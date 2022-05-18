import React, { useEffect, useState } from 'react';
import ProductItem from '../../ViewItemCommon/ProductItem';
import { Product } from '../../../interface/product';
import productsApi from '../../../api/productApi';
import scrollTop_2 from '../../../utils/scrollTop_2';
import { Pagination } from '@mui/material'

function Products(props: any) {
    const { org, act } = props;
    const [data, setData] = useState({
        products: [],
        page: 1,
        page_count: 1
    })
    async function handleGetProductsSpecial() {
        const ORG = await org
        try {
            const res_products = await productsApi.getSpecialPriceByOrg_id({
                org_id: ORG?.id,
                page: data.page
            });
            setData({
                ...data,
                products: res_products.data.context.data,
                page_count: res_products.data.context.last_page
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (org) {
            handleGetProductsSpecial()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [org, data.page])
    const pageChange = (event: any, value: any) => {
        setData({
            ...data,
            page: value
        })
        scrollTop_2(500);
    };
    return (
        act === 1 ?
            <ul
                className='sale-list-cnt'
            >
                {
                    data.products.map((item: Product, index: number) => (
                        <li
                            className='sale-list__item'
                            key={index}
                        >
                            <ProductItem
                                product={item}
                                org={org}
                            />
                        </li>
                    ))
                }
                <div className="sale-list-cnt__pagination">
                    <Pagination
                        color="secondary"
                        shape="rounded"
                        count={data.page_count}
                        onChange={pageChange}
                    />
                </div>
            </ul>
            :
            <></>
    );
}

export default Products;