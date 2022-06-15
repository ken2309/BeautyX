/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useFullScreen from '../../utils/useFullScreen';
import Head from '../Head';
import HeadMobile from '../HeadMobile';
import HeadTitle from '../HeadTitle';
import { Container } from '@mui/material'
import './style.css';
import '../ServiceDetail/serviceDetail.css';
import { useSelector } from 'react-redux';
import UserPaymentInfo from '../Account/components/UserPaymentInfo';
import DetailOrgCard from '../ServiceDetail/components/DetailOrgCard';
import ProductItem from './ProductItem';
import ButtonLoading from '../../components/ButtonLoading';
import formatPrice from '../../utils/formatPrice';
import PaymentMethodCpn from '../PaymentMethod';
import { FLAT_FORM_TYPE } from '../../rootComponents/flatForm';
import { extraPaymentMethodId } from '../PaymentMethod/extraPaymentMethodId';
import { EXTRA_FLAT_FORM } from '../../api/extraFlatForm';
import { pickBy, identity } from 'lodash'
import order from '../../api/orderApi';
import { IUserAddress } from '../../interface/userAddress'
import Footer from '../Footer';


function BuyNow() {
    const IS_MB = useFullScreen();
    const location: any = useLocation();
    const history = useHistory();
    const FLAT_FORM = EXTRA_FLAT_FORM();
    const { payments_method } = useSelector(
        (state: any) => state.PAYMENT.PAYMENT
    );
    const [chooseE_wall, setChooseE_wall] = useState();
    const [address, setAddress] = useState<IUserAddress>();
    const { org, products } = location.state;
    let { total } = products?.reduce(
        (cartTotal: any, cartItem: any) => {
            const { quantity, product } = cartItem;
            const priceBuy = product.special_price > 0 ? product.special_price : product.retail_price
            const itemTotal = priceBuy * quantity;
            cartTotal.total += itemTotal;
            return cartTotal;
        },
        {
            total: 0
        }
    );

    const payment_method_id = extraPaymentMethodId(
        payments_method,
        chooseE_wall
    );
    const productsPost = products.map((item: any) => {
        return {
            id: item.product.id,
            quantity: item.quantity
        }
    })
    const params_string = {
        products: productsPost,
        services: [],
        treatment_combo: [],
        payment_method_id: payment_method_id,
        coupon_code: [],
        description: "",
        user_address_id: address?.id
    }
    async function handlePostOrder() {
        //setLoading(true)
        const params = pickBy(params_string, identity);
        try {
            const response = await order.postOrder(org?.id, params);
            const state_payment = await response.data.context;
            const desc = await state_payment.payment_gateway.description;
            const transaction_uuid =
                state_payment.payment_gateway.transaction_uuid;
            if (response.data.context.status !== "CANCELED") {
                history.push({
                    pathname: `/trang-thai-don-hang/${desc}`,
                    search: transaction_uuid,
                    state: { state_payment },
                });
            } else {
                //setPopUpFail(true)
            }
            //setLoading(false);
        } catch (err) {
            console.log(err);
            //setLoading(false);
        }
    }
    const onClickPayment = () => {
        if (address) {
            if (FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX) {
                if (chooseE_wall) {
                    handlePostOrder()
                }
            } else {
                handlePostOrder()
            }
        }
    }

    return (
        <>
            <HeadTitle title="Chi tiết thanh toán" />
            {IS_MB ? <HeadMobile title='Chi tiết thanh toán' /> : <Head />}
            <Container>
                <div className="service-detail buy-now-cnt">
                    <div className="flex-row-sp buy-now__user">
                        <div className="buy-now__user-left">
                            <UserPaymentInfo
                                onSetAddressDefault={setAddress}
                            />
                        </div>
                        <div className="buy-now__user-right">
                            {org && <DetailOrgCard org={org} />}
                        </div>
                    </div>
                    <div className="buy-now__list">
                        <span className="title">Sản phẩm</span>
                        <ul className="list">
                            {
                                products?.map((item: any, index: number) => (
                                    <li key={index} >
                                        <ProductItem
                                            product={item.product}
                                            quantity={item.quantity}
                                        />
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div
                        style={
                            FLAT_FORM === FLAT_FORM_TYPE.BEAUTYX &&
                                location.state.TYPE === "BOOK_NOW"
                                ? { display: "block" }
                                : { display: "none" }
                        }
                    >
                        <PaymentMethodCpn
                            e={chooseE_wall}
                            onPaymentMethodChange={setChooseE_wall}
                        />
                    </div>
                    <div className="buy-now__total-cnt">
                        <div className="buy-now__total">
                            <div className="flex-row-sp buy-now__total-bill">
                                <span>Tổng tiền</span>
                                <span>{formatPrice(total)}đ</span>
                            </div>
                            <div className="buy-now__total-pay">
                                <div className="flex-row-sp amount-total">
                                    <span>Tổng thanh toán</span>
                                    <span>{formatPrice(total)}đ</span>
                                </div>
                                <div className="amount-btn">
                                    <ButtonLoading
                                        onClick={onClickPayment}
                                        title='Thanh toán'
                                        loading={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Footer/>
        </>
    );
}

export default BuyNow;