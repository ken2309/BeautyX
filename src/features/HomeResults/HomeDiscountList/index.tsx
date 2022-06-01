import React from 'react';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import { Container } from '@mui/material';
import '../../HomeDiscounts/style.css'
import { useSelector } from 'react-redux';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../interface/discount';
import DiscountItem from '../../HomeDiscounts/DiscountItem';
import './style.css';

function HomeDiscountList() {
    const { DISCOUNTS } = useSelector((state: any) => state.HOME);
    const { discounts } = DISCOUNTS;
    return (
        <>
            <HeadTitle
                title="Giá tốt, Ưu đãi khủng"
            />
            <Head />
            <Container>
                <div className="home-discounts__list-wrap discount-list-cnt">
                    <ul className="home-discounts__list">
                        {
                            discounts.map((discount: IDiscountPar, index: number) => (
                                <li
                                    key={index}
                                    className="item-cnt"
                                >
                                    {
                                        discount.items.map((item: IITEMS_DISCOUNT, i: number) => (
                                            <DiscountItem
                                                key={i}
                                                discountItem={item}
                                                discountPar={discount}
                                            />
                                        ))
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </Container>
        </>
    );
}

export default HomeDiscountList;