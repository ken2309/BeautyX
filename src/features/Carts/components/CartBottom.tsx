import React from 'react';
import { Container } from '@mui/material';
import icon from '../../../constants/icon';
import ButtonLoading from '../../../components/ButtonLoading';
import formatPrice from '../../../utils/formatPrice';


function CartBottom(props: any) {
    const { DATA_CART } = props;
    const listDiscount = DATA_CART.cartList
        .filter((item: any) => item.isConfirm === true)
        .map((item: any) => item.discount);
    const listCouponCode = listDiscount.map((item: any) => item?.coupon_code).filter(Boolean);
    console.log(listCouponCode)
    console.log(DATA_CART)
    return (
        <div className="re-cart-bottom">
            <Container>
                <div className="re-cart-bottom__cnt">
                    <div className="re-cart-bottom__total">
                        <div className="flex-row re-cart-bottom__total-discount">
                            <span>Mã khuyến mãi</span>
                            <img src={icon.cardDiscountOrange} alt="" className="icon" />
                        </div>
                        <div className="re-cart-bottom__cal">
                            <div className="flex-row-sp re-cart-bottom__cal-item">
                                <span>Tổng tiền</span>
                                <span>{formatPrice(DATA_CART.cartAmount)}đ</span>
                            </div>
                            {
                                listDiscount.length > 0 &&
                                <div className="flex-row-sp re-cart-bottom__cal-item">
                                    <span>Giảm giá</span>
                                    <span>-{formatPrice(DATA_CART.cartAmountDiscount)}đ</span>
                                </div>
                            }
                        </div>
                        <div className="flex-row-sp re-cart-bottom__pay">
                            <span className="left">Tổng thanh toán</span>
                            <div className="right">
                                <span className="right-money">
                                    {formatPrice(DATA_CART.cartAmount - DATA_CART.cartAmountDiscount)}đ
                                </span>
                                <ButtonLoading
                                    title='Thanh toán'
                                    loading={false}
                                    onClick={() => console.log('xxx')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CartBottom;