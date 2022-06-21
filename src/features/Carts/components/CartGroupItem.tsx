/* eslint-disable no-useless-concat */
import { Checkbox } from '@mui/material';
import React from 'react';
import icon from '../../../constants/icon';
import CartItem from './CartItem';
import {
    SwipeableList,
} from 'react-swipeable-list';

function CartGroupItem(props: any) {
    const { item } = props;

    const onEditCartItem = () => {

    }
    return (
        <>
            <div className="flex-row-sp re-cart-item-group__head">
                <div className="flex-row left">
                    <Checkbox
                        size="small"
                        sx={{
                            color: "#7161BA",
                            "&.Mui-checked": {
                                color: "#7161BA",
                            },
                            marginLeft: "-10px",
                        }}
                    />
                    <img src={icon.Storefront} alt="" />
                    <span>{item.org_name}</span>
                </div>
                <span className="right" onClick={onEditCartItem} >Sửa</span>
            </div>
            <SwipeableList>
                <ul className="re-cart-item-group__body">
                    {
                        item.items.map((cart: any, i: number) => (
                            <li key={i} >
                                <CartItem
                                    cartItem={cart}
                                />
                            </li>
                        ))
                    }
                </ul>
            </SwipeableList>
        </>
    );
}

export default CartGroupItem;