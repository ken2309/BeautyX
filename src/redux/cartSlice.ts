import { createSlice } from '@reduxjs/toolkit';
// google tag event
import {GoogleTagPush,GoogleTagEvents} from '../utils/dataLayer';
// end 

const storageName = 'web-booking-cart'
const storage = JSON.parse(`${localStorage.getItem(storageName)}`);
const initialState = {
    org: null,
    cartList: localStorage.getItem(storageName) ? storage : [],
    cartQuantity: 0,
    cartAmountDiscount: 0,
    cartAmount: 0,
}
const cart = createSlice({
    name: 'carts',
    initialState,
    reducers: {
        addCart: (state, action) => {
            GoogleTagPush(GoogleTagEvents.ADD_TO_CART);
            const iIndex = state.cartList.findIndex((item: any) =>
                item.cart_id === action.payload.cart_id
            );
            if (iIndex >= 0) {
                state.cartList[iIndex].quantity += action.payload.quantity;
            } else {
                const templeCart = { ...action.payload, quantity: action.payload.quantity };
                state.cartList.push(templeCart);
            }
            localStorage.setItem(storageName, JSON.stringify(state.cartList))
        },
        ascItem: (state, action) => {
            const iIndex = state.cartList.findIndex((item: any) =>
                item.cart_id === action.payload.cart_id
            );
            if (state.cartList[iIndex].quantity >= 1) {
                state.cartList[iIndex].quantity += 1;
            }
            localStorage.setItem(storageName, JSON.stringify(state.cartList))
        },
        descItem: (state, action) => {
            const iIndex = state.cartList.findIndex((item: any) =>
                item.cart_id === action.payload.cart_id
            );
            if (state.cartList[iIndex].quantity > 1) {
                state.cartList[iIndex].quantity -= 1;
            }
            localStorage.setItem(storageName, JSON.stringify(state.cartList))
        },
        checkConfirm: (state, action) => {
            const iIndex = state.cartList.findIndex((item: any) =>
                item.cart_id === action.payload.cart_id
            )
            if (state.cartList[iIndex].isConfirm === false) {
                state.cartList[iIndex].isConfirm = true;
            } else {
                state.cartList[iIndex].isConfirm = false;
            }
            localStorage.setItem(storageName, JSON.stringify(state.cartList))
        },
        unCheck: (state, action) => {
            const iIndex = state.cartList.findIndex((item: any) =>
                item.cart_id === action.payload.cart_id
            )
            state.cartList[iIndex].isConfirm = false;
            localStorage.setItem(storageName, JSON.stringify(state.cartList))
        },
        removeItem: (state, action) => {
            GoogleTagPush(GoogleTagEvents.REMOVE_FROM_CART);
            const nextItem = state.cartList.filter((item: any) =>
                item.cart_id !== action.payload.cart_id
            )
            state.cartList = nextItem;
            localStorage.setItem(storageName, JSON.stringify(nextItem))
        },
        chooseAll: (state, action) => {
            const cartTrue = []
            const cartFalse = []
            for (var item of storage) {
                let arr = item;
                if (item.org_id === action.payload) {
                    arr = { ...item, isConfirm: true }
                    cartTrue.push(arr);
                } else if (item.org_id !== action.payload) {
                    arr = { ...item, isConfirm: true }
                    cartFalse.push(arr);
                }
            }
            //state.cartList = cartTrue
            localStorage.setItem(storageName, JSON.stringify(state.cartList))
        },
        getTotal: (state) => {
            const cartListDiscounts = state.cartList
                .filter((item: any) => item.isConfirm === true)
                .map(
                    (item: any) => item.discount?.discount_value
                ).filter(Boolean);
            state.cartAmountDiscount = cartListDiscounts.length > 0
                && cartListDiscounts.reduce((pre: number, cur: number) => pre + cur)
            let { total, quantity } = state.cartList.reduce(
                (cartTotal: any, cartItem: any) => {
                    const { quantity, price, isConfirm } = cartItem;
                    if (isConfirm === true) {
                        const itemTotal = price * quantity;
                        cartTotal.total += itemTotal;
                        //cartTotal.quantity += quantity;
                    }
                    cartTotal.quantity += quantity;
                    return cartTotal;
                },
                {
                    total: 0, quantity: 0
                }
            );
            state.cartAmount = total;
            state.cartQuantity = quantity
        },
        clearAllCart: (state) => {
            state.cartList = [];
            localStorage.setItem(storageName, JSON.stringify(state.cartList))
        },
        clearByCheck: (state, action) => {
            state.cartList = action.payload
            localStorage.setItem(storageName, JSON.stringify(state.cartList))
        },
        onClearPrevCartItem:(state)=>{
            const newCartList = state.cartList.map((item:any)=>{
                return {
                    ...item,
                    isConfirm: false
                }
            })
            state.cartList = newCartList
        }
    }
});
const { reducer, actions } = cart;
export const {
    addCart,
    descItem,
    ascItem,
    checkConfirm,
    removeItem,
    chooseAll,
    getTotal,
    unCheck,
    clearAllCart,
    clearByCheck,
    onClearPrevCartItem
} = actions;
export default reducer;