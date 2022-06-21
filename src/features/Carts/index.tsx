import React from 'react';
import { useSelector } from 'react-redux';
import './style.css';
import Head from '../Head';
import HeadMobile from '../HeadMobile';
import HeadTitle from '../HeadTitle';
import useFullScreen from '../../utils/useFullScreen';
import { Container } from '@mui/material';
import UserPaymentInfo from '../Account/components/UserPaymentInfo';
import CartGroupItem from './components/CartGroupItem';

function Carts() {
    const { cartList } = useSelector((state: any) => state.carts);
    const orgs_id = cartList.map((item: any) => item.org_id);
    const IS_MB = useFullScreen();
    function unique(arr: any) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }
    const orgs = unique(orgs_id)
    const cartListGroupOrg = orgs.map((item) => {
        const cartItemByOrg = cartList.filter((i: any) => item === i.org_id)
        return {
            org_id: item,
            org_name: cartItemByOrg[0]?.org_name,
            items: cartItemByOrg
        }
    })
    return (
        <>
            <HeadTitle title="Giỏ hàng" />
            {IS_MB ? <HeadMobile title='Giỏ hàng' /> : <Head />}
            <Container>
                <div className="re-cart-cnt">
                    <div className="re-cart-cnt__head">
                        <UserPaymentInfo />
                    </div>
                    <div className="re-cart-cnt__body">
                        <ul className="re-cart-cnt__body-list">
                            {
                                cartListGroupOrg.map((item: any, index: number) => (
                                    <li key={index} className="re-cart-cnt__body__item">
                                        <CartGroupItem
                                            item={item}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default Carts;