/* eslint-disable no-useless-concat */
import { Checkbox, Dialog } from '@mui/material';
import React, { useEffect, useState } from 'react';
import icon from '../../../constants/icon';
import { addVoucherByOrg, checkConfirm, onApplyVoucherSubTotal, onClearPrevCartItem } from '../../../redux/cartSlice';
import CartItem from './CartItem';
//import { checkConfirm, onChooseCartItemByOrg } from '../../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
import ButtonLoading from '../../../components/ButtonLoading';
import { fetchAsyncOrgDiscounts } from '../../../redux/org_discounts/orgDiscountsSlice';
import { IDiscountPar } from '../../../interface/discount';
import { IOrganization } from '../../../interface/organization';
import useDeviceMobile from '../../../utils/useDeviceMobile';
import { EX_CHECK_DATE, EX_CHECK_INCLUDE_ITEMS, EX_CHECK_SUB_TOTAL } from '../../../utils/cart/checkConditionVoucher';
import { DISCOUNT_TYPE } from '../../../utils/formatRouterLink/fileType';

function CartGroupItem(props: any) {
    const { item, org, cartList, setOpenBranch, openBranch } = props;
    const itemOrgId = item.org_id
    const [open, setOpen] = useState(false)
    const { VOUCHER_CART } = useSelector((state: any) => state.carts);
    const cartListOrg = cartList.filter((i: any) => i.org_id === org?.id);
    const cartListCheck = cartList.filter((i: any) => i.isConfirm === true);
    let isCheck = false;
    if (org?.id === item.org_id && cartListCheck.length === cartListOrg.length) {
        isCheck = true
    }

    const dispatch = useDispatch();

    const onChooseCartItemOrg = () => {
        dispatch(onClearPrevCartItem())
        if (isCheck === false) {
            for (var itemCart of item.items) {
                const action = checkConfirm({ ...itemCart, isConfirm: true });
                dispatch(action);
            }
        }
    }
    const servicesCartListCheckByOrg = cartListCheck?.filter((i: any) => i.is_type === 2);


    return (
        <>
            <div
                className="flex-row re-cart-item-group__head"
            >
                <div
                    onClick={onChooseCartItemOrg}
                    className="flex-row left"
                >
                    <Checkbox
                        size="small"
                        sx={{
                            color: "#7161BA",
                            "&.Mui-checked": {
                                color: "#7161BA",
                            },
                            marginLeft: "-10px",
                        }}
                        checked={isCheck ? true : false}
                    />
                    <img src={icon.Storefront} alt="" />
                    <span>{item.org_name}</span>
                </div>
                {
                    (
                        org?.id === item.org_id &&
                        org?.branches?.length > 0 &&
                        servicesCartListCheckByOrg.length > 0) &&
                    <ButtonLoading
                        title="Chọn chi nhánh"
                        onClick={() => setOpenBranch({ ...openBranch, open: true })}
                        loading={false}
                    />
                }
            </div>
            <div className="flex-row re-cart-item-group__add">
                {/* <div className="re-cart-item-group__add-dot"></div> */}
                {
                    (org?.id === item.org_id &&
                        org?.branches?.length > 0 &&
                        servicesCartListCheckByOrg.length && openBranch.branch) ?
                        `Chi nhánh : ${openBranch.branch?.name} - ${openBranch?.branch?.full_address}` :
                        `${item?.items[0]?.org?.full_address}`
                }
            </div>
            <ul className="re-cart-item-group__body">
                {
                    item.items.map((cart: any, i: number) => (
                        <li key={i} >
                            <CartItem
                                cartItem={cart}
                                org={org}
                                setOpenBranch={setOpenBranch}
                                openBranch={openBranch}
                            />
                        </li>
                    ))
                }
            </ul>
            {
                (VOUCHER_CART.vouchers.length > 0 && VOUCHER_CART.org_id === itemOrgId) &&
                <div className="cart-item-voucher">
                    <span
                        onClick={() => setOpen(true)}
                        className="flex-row title"
                    >
                        Mã khuyên mại
                        <img src={icon.cardDiscountOrange} alt="" />
                    </span>
                    <PopUpVoucherOrg
                        org={org}
                        open={open}
                        setOpen={setOpen}
                        vouchers={VOUCHER_CART.vouchers}
                    />
                </div>
            }
        </>
    );
}

export default CartGroupItem;

interface IPopUpVoucherOrg {
    org: IOrganization,
    open: boolean,
    setOpen: (open: boolean) => void,
    vouchers: IDiscountPar[],
}

export const PopUpVoucherOrg = (props: IPopUpVoucherOrg) => {
    const IS_MB = useDeviceMobile();
    const { open, setOpen, org, vouchers } = props;
    return (
        <Dialog
            fullScreen={IS_MB ? true : false}
            open={open}
            onClose={() => setOpen(false)}
        >
            <div className="cart-item-pop-voucher">
                <span className="title">
                    {org?.name} khuyến mại
                </span>
                <div className="cart-vouchers-list">
                    <span className="cart-vouchers-list__title">
                        Danh sách mã ưu đãi
                    </span>
                    <ul className="list">
                        {
                            vouchers.map((item: IDiscountPar, index: number) => (
                                <li key={index} className="item">
                                    <VoucherOrgItem
                                        voucher={item}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </Dialog>
    )
}
const VoucherOrgItem = (props: any) => {
    const voucher: IDiscountPar = {
        ...props.voucher,
        // minimum_order_value:1000000,
        // valid_from: "2022-01-01 10:00:00",
        // valid_util: "2022-03-01 10:00:00"
    };
    const dispatch = useDispatch();
    const { cartAmountDiscount, cartAmount, cartList } = useSelector(
        (state: any) => state.carts
    );
    const cartCheck = cartList.filter((item: any) => item.isConfirm === true)
    console.log(voucher)
    const subTotalCondition = EX_CHECK_SUB_TOTAL(cartAmount, voucher)
    const dateCondition = EX_CHECK_DATE(voucher);
    const itemsCondition = EX_CHECK_INCLUDE_ITEMS(voucher, cartCheck)

    let applyCondition = false;
    if (
        voucher.discount_type === DISCOUNT_TYPE.SUB_TOTAL.key &&
        (subTotalCondition && dateCondition && itemsCondition)
    ) {
        applyCondition = true
    }
    console.log(applyCondition)

    const handleApplyVoucher = () =>{
        dispatch(onApplyVoucherSubTotal(voucher))
    }

    // console.log("date", dateCondition)
    // console.log("total", subTotalCondition)
    // console.log("itemsCondition", itemsCondition)
    return (
        <div className="cart-vouchers-list__item">
            {voucher.title}<br />
            <span>
                {voucher.discount_type}<br />
                {voucher.discount_unit}<br />
                {voucher.discount_value}<br />
                max_dis:{voucher.maximum_discount_value}<br />
                min-order:{voucher.minimum_order_value}<br />
            </span>
            <button
                onClick={handleApplyVoucher}
            >
                Áp dụng mã
            </button>
        </div>
    )
}