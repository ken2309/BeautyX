import React, { useState } from 'react';
import { Container } from '@mui/material';
//import icon from '../../../constants/icon';
import ButtonLoading from '../../../components/ButtonLoading';
import formatPrice from '../../../utils/formatPrice';
import { cartReducer } from '../../../utils/cart/cartReducer';
import { useSelector } from 'react-redux';
import order from '../../../api/orderApi';
import { useHistory } from 'react-router-dom';
import { identity, pickBy } from 'lodash';
import Notification from '../../../components/Notification';
import AlertSnack from "../../../components/AlertSnack";
// ==== api tracking ====
import tracking from "../../../api/trackApi";
import { formatProductList } from "../../../utils/tracking";
// end
function CartBottom(props: any) {
    const { DATA_CART, DATA_PMT } = props;
    const [openAlertSnack, setOpenAlertSnack] = useState({
        title: "",
        open: false,
    });
    const [openNoti, setOpenNoti] = useState({
        title: "",
        open: false,
        titleLeft: "",
        titleRight: "",
        onClickLeft: () => { },
        onClickRight: () => { }
    })

    const history = useHistory();
    const USER = useSelector((state: any) => state.USER.USER);
    const listDiscount = DATA_CART.cartList
        .filter((item: any) => item.isConfirm === true)
        .map((item: any) => item.discount);
    const listCouponCode = listDiscount.map((item: any) => item?.coupon_code).filter(Boolean);
    const { products, services, combos } = cartReducer(DATA_CART.cartList.filter((i: any) => i.isConfirm === true));


    const pramsOrder = {
        user_address_id: DATA_PMT.address?.id,
        payment_method_id: DATA_PMT.payment_method_id ? DATA_PMT.payment_method_id : DATA_PMT.pmtMethod?.id,
        // payment_method_id: 5,
        products: products.map((item: any) => { return { id: item.id, quantity: item.quantity } }),
        services: services.map((item: any) => { return { id: item.id, quantity: item.quantity } }),
        combos: combos.map((item: any) => { return { id: item.id, quantity: item.quantity } }),
        coupon_code: listCouponCode.length > 0 ? listCouponCode : [],
    }

    async function handlePostOrder() {
        //setLoading(true)
        try {
            //tracking.PAY_CONFIRM_CLICK(DATA_PMT.org.id, formatProductList(pramsOrder.products))
            const response = await order.postOrder(DATA_PMT.org.id, pickBy(pramsOrder, identity));
            const state_payment = await response.data.context
            const transaction_uuid = state_payment.payment_gateway.transaction_uuid;
            if (response.data.context.status !== "CANCELED") {
                history.push({
                    pathname: `/trang-thai-don-hang/`,
                    search: transaction_uuid,
                    state: { state_payment }
                })
            } else {
                setOpenNoti({
                    open: true,
                    title: "Tạo đơn hàng thất bại",
                    titleLeft: "Đã hiểu",
                    titleRight: "Về trang chủ",
                    onClickLeft: () => setOpenNoti({ ...openNoti, open: false }),
                    onClickRight: () => history.push('/home')
                })
            }
            //setLoading(false);
        } catch (err) {
            console.log(err)
            setOpenNoti({
                open: true,
                title: "Tạo đơn hàng thất bại",
                titleLeft: "Đã hiểu",
                titleRight: "Về trang chủ",
                onClickLeft: () => setOpenNoti({ ...openNoti, open: false }),
                onClickRight: () => history.push('/home')
            })
        }
    }

    const handleSubmitOrder = () => {
        if (USER && DATA_PMT.org && pramsOrder.payment_method_id) {
            if (!DATA_PMT.address && products.length > 0) {
                setOpenAlertSnack({
                    ...openAlertSnack,
                    open: true,
                    title: 'Chưa có địa chỉ giao hàng !'
                })
            } else {
                handlePostOrder()
            }
        }
        else if (!pramsOrder.payment_method_id) {
            setOpenAlertSnack({
                ...openAlertSnack,
                open: true,
                title: 'Bạn Chưa chọn phương thức thanh toán!'
            })
        }
    }
    return (
        <div className="re-cart-bottom">
            <AlertSnack
                title={openAlertSnack.title}
                open={openAlertSnack.open}
                status="FAIL"
                onClose={() => setOpenAlertSnack({
                    ...openAlertSnack, open: false
                })}
            />
            <Container>
                <div className="re-cart-bottom__cnt">
                    <div className="re-cart-bottom__total">
                        {/* <div className="flex-row re-cart-bottom__total-discount">
                            <span>Mã khuyến mãi</span>
                            <img src={icon.cardDiscountOrange} alt="" className="icon" />
                        </div> */}
                        <div className="re-cart-bottom__cal">
                            <div className="flex-row-sp re-cart-bottom__cal-item">
                                <span>Tổng tiền</span>
                                <span>{formatPrice(DATA_CART.cartAmount)}đ</span>
                            </div>
                            {
                                listDiscount.filter(Boolean).length > 0 &&
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
                                    onClick={handleSubmitOrder}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <Notification
                content={openNoti.title}
                open={openNoti.open}
                titleBtnLeft={openNoti.titleLeft}
                titleBtnRight={openNoti.titleRight}
                onClickLeft={openNoti.onClickLeft}
                onClickRight={openNoti.onClickRight}
            />
        </div>
    );
}

export default CartBottom;