/* eslint-disable no-useless-concat */
import { Checkbox, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import icon from "../../../constants/icon";
import {
    addVoucherByOrg,
    checkConfirm,
    onApplyVoucherSubTotal,
    onCancelApplyVoucher,
    onClearApplyVoucher,
    onClearPrevCartItem,
} from "../../../redux/cartSlice";
import CartItem from "./CartItem";
//import { checkConfirm, onChooseCartItemByOrg } from '../../../redux/cartSlice'
import { useDispatch, useSelector } from "react-redux";
import ButtonLoading from "../../../components/ButtonLoading";
import { fetchAsyncOrgDiscounts } from "../../../redux/org_discounts/orgDiscountsSlice";
import { IDiscountPar, IITEMS_DISCOUNT } from "../../../interface/discount";
import { IOrganization } from "../../../interface/organization";
import useDeviceMobile from "../../../utils/useDeviceMobile";
import {
    EX_CHECK_DATE,
    EX_CHECK_INCLUDE_ITEMS,
    EX_CHECK_SUB_TOTAL,
    IS_VOUCHER,
} from "../../../utils/cart/checkConditionVoucher";
import { DISCOUNT_TYPE, EX_DISCOUNT_TYPE } from "../../../utils/formatRouterLink/fileType";
import onErrorImg from "../../../utils/errorImg";
import img from "../../../constants/img";
import formatPrice from "../../../utils/formatPrice";
import moment from "moment";

function CartGroupItem(props: any) {
    const { item, org, cartList, setOpenBranch, openBranch } = props;
    const itemOrgId = item.org_id;
    const [open, setOpen] = useState(false);
    const { VOUCHER_CART } = useSelector((state: any) => state.carts);
    const vouchers = IS_VOUCHER(VOUCHER_CART.vouchers)
    const cartListOrg = cartList.filter((i: any) => i.org_id === org?.id);
    const cartListCheck = cartList.filter((i: any) => i.isConfirm === true);
    let isCheck = false;
    if (
        org?.id === item.org_id &&
        cartListCheck.length === cartListOrg.length
    ) {
        isCheck = true;
    }

    const dispatch = useDispatch();

    const onChooseCartItemOrg = () => {
        dispatch(onClearPrevCartItem());
        dispatch(onClearApplyVoucher());
        if (isCheck === false) {
            for (var itemCart of item.items) {
                const action = checkConfirm({ ...itemCart, isConfirm: true });
                dispatch(action);
            }
        }
    };
    const servicesCartListCheckByOrg = cartListCheck?.filter(
        (i: any) => i.is_type === 2
    );

    return (
        <>
            <div className="flex-row re-cart-item-group__head">
                <div onClick={onChooseCartItemOrg} className="flex-row left">
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
                {org?.id === item.org_id &&
                    org?.branches?.length > 0 &&
                    servicesCartListCheckByOrg.length > 0 && (
                        <ButtonLoading
                            title="Chọn chi nhánh"
                            onClick={() =>
                                setOpenBranch({ ...openBranch, open: true })
                            }
                            loading={false}
                        />
                    )}
            </div>
            <div className="flex-row re-cart-item-group__add">
                {/* <div className="re-cart-item-group__add-dot"></div> */}
                {org?.id === item.org_id &&
                    org?.branches?.length > 0 &&
                    servicesCartListCheckByOrg.length &&
                    openBranch.branch
                    ? `Chi nhánh : ${openBranch.branch?.name} - ${openBranch?.branch?.full_address}`
                    : `${item?.items[0]?.org?.full_address}`}
            </div>
            {vouchers.length > 0 &&
                VOUCHER_CART.org_id === itemOrgId && (
                    <div className="cart-item-voucher">
                        <span
                            onClick={() => setOpen(true)}
                            className="flex-row title"
                        >
                            Mã khuyến mại
                            <img src={icon.cardDiscountOrange} alt="" />
                        </span>
                        <PopUpVoucherOrg
                            org={org}
                            open={open}
                            setOpen={setOpen}
                            vouchers={vouchers}
                        />
                    </div>
                )}
            <ul className="re-cart-item-group__body">
                {item.items.map((cart: any, i: number) => (
                    <li key={i}>
                        <CartItem
                            cartItem={cart}
                            org={org}
                            setOpenBranch={setOpenBranch}
                            openBranch={openBranch}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}

export default CartGroupItem;

interface IPopUpVoucherOrg {
    org: IOrganization;
    open: boolean;
    setOpen: (open: boolean) => void;
    vouchers: IDiscountPar[];
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
                <div className="flex-row-sp">
                    <span className="title">{org?.name} khuyến mại</span>

                    <img
                        className="cursor-pointer"
                        onClick={() => setOpen(false)}
                        src={icon.closeCircle}
                        alt=""
                    />
                </div>
                <div className="cart-vouchers-list">
                    <span className="cart-vouchers-list__title">
                        Danh sách mã ưu đãi
                    </span>
                    <ul className="list">
                        {vouchers.map((item: IDiscountPar, index: number) => (
                            <li key={index} className="item">
                                <VoucherOrgItem org={org} voucher={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Dialog>
    );
};
const VoucherOrgItem = (props: any) => {
    const { org } = props;
    const voucher: IDiscountPar = {
        ...props.voucher,
        // discount_type:"PRODUCT",
        // discount_value:500,
        // items:[],
        // items_count:0,
        // minimum_order_value: null,
        // valid_from: "2022-01-01 10:00:00",
        // valid_util: "2022-10-01 10:00:00"
    };
    const listItemName = voucher.items
        .filter((i: IITEMS_DISCOUNT) => i.organization?.id === org?.id)
        .map((i: IITEMS_DISCOUNT) =>
            i.productable?.service_name || i?.productable.product_name
        )
    const dispatch = useDispatch();
    const { cartAmount, cartList, VOUCHER_APPLY } = useSelector(
        (state: any) => state.carts
    );
    const active = VOUCHER_APPLY.map((i: IDiscountPar) => i.id).includes(voucher.id)
    const cartCheck = cartList.filter((item: any) => item.isConfirm === true);
    const subTotalCondition = EX_CHECK_SUB_TOTAL(cartAmount, voucher);
    const dateCondition = EX_CHECK_DATE(voucher);
    const itemsCondition = EX_CHECK_INCLUDE_ITEMS(voucher, cartCheck);

    let applyCondition = false;
    if (
        voucher.discount_type === DISCOUNT_TYPE.SUB_TOTAL.key &&
        subTotalCondition &&
        dateCondition &&
        itemsCondition
    ) {
        applyCondition = true;
    }
    if (
        voucher.discount_type === DISCOUNT_TYPE.PRODUCT.key
    ) {
        applyCondition = true
    }
    // console.log(applyCondition)

    const handleApplyVoucher = () => {
        if (active) {
            dispatch(onCancelApplyVoucher(voucher.id))
        } else {
            if (applyCondition && cartAmount > 0) {
                dispatch(onApplyVoucherSubTotal(voucher));
            }
        }
    };

    // console.log("date", dateCondition)
    // console.log("total", subTotalCondition)
    // console.log("itemsCondition", itemsCondition)
    return (
        <div
            style={
                active === true
                    ? {
                        backgroundColor: "#ffe3d2",
                        border: "1px solid var(--red-cl)",
                    }
                    : {}
            }
            className="cart-vouchers-list__item"
        >
            <div
                style={
                    active === true
                        ? { borderRight: "dashed 1px var(--red-cl)" }
                        : {}
                }
                className="cart-vouchers-list__item-left"
            >
                <div className="item-left__img">
                    <img
                        onError={(e) => onErrorImg(e)}
                        src={org?.image_url ? org?.image_url : img.imgDefault}
                        alt=""
                    />
                </div>
                <div className="item-left__name">
                    <span>{org?.name}</span>
                </div>
            </div>
            <div className="cart-vouchers-list__item-right">
                <div className="item-right__top">
                    <span className="item-right__name">
                        {EX_DISCOUNT_TYPE(voucher)}
                    </span>
                    {
                        voucher?.minimum_order_value &&
                        <span className="item-right__desc">
                            Cho đơn hàng từ {formatPrice(voucher.minimum_order_value)}đ
                        </span>
                    }
                    {
                        listItemName.length > 0 ?
                            <span className="item-right__desc">
                                Áp dụng cho các dịch vụ, sản phẩm : <span
                                    style={{ fontWeight: "bold" }}
                                >
                                    {listItemName.join(",")}
                                </span>
                            </span>
                            :
                            <span className="item-right__desc">
                                Áp dụng tất cả sản phẩm, dịch vụ
                            </span>
                    }
                </div>
                <div className="item-right__bottom">
                    {
                        (voucher.valid_from || voucher.valid_util) ?
                            <span className="item-right__expired">
                                Áp dụng: {voucher.valid_from && moment(voucher.valid_from).format("DD/MM/YYYY")} -
                                {voucher.valid_util && moment(voucher.valid_util).format("DD/MM/YYYY")}
                            </span>
                            :
                            <span className="item-right__expired"></span>
                    }
                    {
                        applyCondition === true ?
                            <div
                                onClick={() => handleApplyVoucher()}
                                className="item-right__btn"
                            >
                                <span>{
                                    active
                                        ?
                                        "Bỏ chọn" : "Áp dụng"
                                }</span>
                            </div>
                            :
                            <img src={icon.noApply} alt="" />
                    }
                </div>
            </div>
            {/* {voucher.title}<br />
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
            </button> */}
        </div>
    );
};
