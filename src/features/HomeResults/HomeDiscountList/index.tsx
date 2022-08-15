import React from 'react';
import Head from '../../Head';
import HeadTitle from '../../HeadTitle';
import { Container } from '@mui/material';
import '../../HomeDiscounts/style.css'
import { useSelector, useDispatch } from 'react-redux';
import { IDiscountPar, IITEMS_DISCOUNT } from '../../../interface/discount';
import DiscountItem from '../../HomeDiscounts/DiscountItem';
import { fetchAsyncDiscounts } from '../../../redux/home/homeSlice'
import ButtonLoading from '../../../components/ButtonLoading';
import './style.css';
import Footer from '../../Footer';
import HeadMobile from '../../HeadMobile';
import useFullScreen from '../../../utils/useDeviceMobile';

function HomeDiscountList() {
    const dispatch = useDispatch();
    const IS_MB = useFullScreen();
    const { DISCOUNTS } = useSelector((state: any) => state.HOME);
    const { discounts, totalItem, page } = DISCOUNTS;
    const onViewMore = () => {
        dispatch(fetchAsyncDiscounts({ page: page + 1 }))
    }
    return (
        <>
            <HeadTitle
                title="Giá tốt, Ưu đãi khủng"
            />
            {IS_MB ? <HeadMobile title='Khuyến mãi HOT' /> : <Head />}
            <Container>
                <div className="discount-list-cnt">
                    <ul className="discounts__list">
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
                    <div className="discount-list-cnt__bot">
                        {
                            discounts.length < totalItem &&
                            <ButtonLoading
                                title='Xem thêm ưu đãi'
                                loading={false}
                                onClick={onViewMore}
                            />
                        }
                    </div>
                </div>
            </Container>
            <Footer />
        </>
    );
}

export default HomeDiscountList;