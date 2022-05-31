import discountApi from "../../api/discountApi";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../status'

export const fetchAsyncDiscountDetail: any = createAsyncThunk(
    "ORG_DISCOUNTS/fetchAsyncDiscountDetail",
    async (values: any) => {
        try {
            const res = await discountApi.getById(values)
            return res.data.context
        } catch (error) {
            console.log(error)
        }
    }
)
const initialState = {
    DISCOUNT: {
        discount: {},
        status: ""
    }
}
const orgDiscountsSlice = createSlice({
    name: "ORG_DISCOUNTS",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncDiscountDetail.pending]: (state) => {
            return { ...state, DISCOUNT: { ...state.DISCOUNT, status: STATUS.LOADING } }
        },
        [fetchAsyncDiscountDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                DISCOUNT: {
                    discount: payload,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncDiscountDetail.rejected]: (state) => {
            return { ...state, DISCOUNT: { ...state.DISCOUNT, status: STATUS.FAIL } }
        }
    }
})
export default orgDiscountsSlice.reducer;