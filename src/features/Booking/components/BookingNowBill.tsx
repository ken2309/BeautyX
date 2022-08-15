import React from 'react';
import { useLocation } from 'react-router-dom';
import formatPrice from '../../../utils/formatPrice';
import { DISCOUNT_TYPE } from '../../../utils/formatRouterLink/fileType';

function BookingNowBill() {
    const location: any = useLocation();
    const services = location.state.services;
    let { total } = services?.reduce(
        (cartTotal: any, cartItem: any) => {
            const { quantity, service } = cartItem;
            const priceBuy = service.special_price > 0 ? service.special_price : service.price
            const itemTotal = priceBuy * quantity;
            cartTotal.total += itemTotal;
            return cartTotal;
        },
        {
            total: 0
        }
    );
    
    const discounts = services
        .map((item: any) => (
            item.service?.discount?.discount_type === DISCOUNT_TYPE.FINAL_PRICE.key ?
                total - (item.service.discount?.discount_value * item.quantity)
                :
                item.service.discount?.discount_value
        ))
        .filter(Boolean);
    const totalDiscounts = discounts.length > 0 && discounts.reduce((cur: any, pre: any) => cur + pre);
    return (
        <div className="flex-row-sp booking-cnt__bot-bill">
            <div className="left">
                <span>Tổng tiền</span>
                {discounts.length > 0 && <span>Giảm giá</span>}
                <span>Tổng thanh toán</span>
            </div>
            <div className="right">
                <span>{formatPrice(total)}đ</span>
                {discounts.length > 0 && <span>-{formatPrice(totalDiscounts)}đ</span>}
                <span>{formatPrice(total - totalDiscounts)}đ</span>
            </div>
        </div>
    );
}

export default BookingNowBill;