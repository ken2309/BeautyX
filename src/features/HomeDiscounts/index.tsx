import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../interface/discount';
import DiscountItem from './DiscountItem';
import './style.css'

function HomeDiscount() {
    const { DISCOUNTS } = useSelector((state: any) => state.HOME);
    const { discounts } = DISCOUNTS;
    return (
        <div className='home-discounts'>
            <Container>
                <div className="home-discounts__title">
                    KHUYỄN MÃI HOT
                </div>
                <div className="home-discounts__list-wrap">
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
        </div>
    );
}

export default HomeDiscount;