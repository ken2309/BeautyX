import { Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import axiosClient from '../../api-client/axios';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../interfaces/discount';
import { DISCOUNT_TYPE } from "../../src/utils/formatRouterLink/fileType";
import style from "./home.module.css"

export function HomeDiscounts(props) {
    const { data, error, mutate, isValidating } = useSWR("/discounts", {
        revalidateOnFocus: false,
    });
    let discounts: IDiscountPar[] = [];
    if (!data) {
        return <>Loading...</>
    } else {
        discounts = data.data.context.data
    }
    return (
        <div className={style.discount_cnt}>
            <Container>
                <div className={style.home_discounts__title}>
                    <span>Khuyến mãi HOT</span>
                    <Link href="/giam-gia" >
                        <a>Xem thêm {">"}</a>
                    </Link>
                </div>
                <div className="home-discounts__list-wrap">
                    <ul className="home-discounts__list">
                        {discounts
                            .filter((i: IDiscountPar) =>
                            (i.items.length > 0 && (
                                i.discount_type === DISCOUNT_TYPE.PRODUCT.key ||
                                i.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key
                            ))
                            )
                            .slice(0, 12)
                            .map((discount: IDiscountPar, index: number) => (
                                <div key={index}>
                                    {discount.items.map(
                                        (item: IITEMS_DISCOUNT, i: number) => (
                                            <li key={i}>
                                                {item.productable.service_name ?? item.productable.product_name}
                                            </li>
                                        )
                                    )}
                                </div>
                            ))}
                        {/* <div className="watch-more-card" onClick={onViewMore}>
                            <li>
                                <div>{'>'}</div>
                                <span>Xem thêm</span>
                            </li>
                        </div> */}
                    </ul>
                </div>
            </Container>
        </div>
    );
}