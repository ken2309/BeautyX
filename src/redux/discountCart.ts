import { createSlice } from '@reduxjs/toolkit';

const storageName = "_WB_DIS";
const storage = JSON.parse(`${sessionStorage.getItem(storageName)}`) || [];

const initialState = {
    DISCOUNT_CART: sessionStorage.getItem(storageName) ? storage : []
}

const discountCartReducer = createSlice({
    name: "DISCOUNT_CART",
    initialState,
    reducers: {}
})