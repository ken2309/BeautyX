/* eslint-disable no-useless-concat */
import { Checkbox } from '@mui/material';
import React from 'react';
import icon from '../../../constants/icon';
import { checkConfirm, onClearPrevCartItem } from '../../../redux/cartSlice';
import CartItem from './CartItem';
//import { checkConfirm, onChooseCartItemByOrg } from '../../../redux/cartSlice'
import { useDispatch } from 'react-redux';

function CartGroupItem(props: any) {
    const { item, org, cartList } = props;
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
    return (
        <>
            <div
                className="flex-row-sp re-cart-item-group__head"
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
                <span className="right" >Sửa</span>
            </div>
            <ul className="re-cart-item-group__body">
                {
                    item.items.map((cart: any, i: number) => (
                        <li key={i} >
                            <CartItem
                                cartItem={cart}
                                org={org}
                            />
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default CartGroupItem;