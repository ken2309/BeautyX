import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import payments from '../../api/paymentApi';
import { STATUS } from '../status'

export const fetAsyncPaymentMethod: any = createAsyncThunk(
    "PAYMENT/fetAsyncPaymentMethod",
    async () => {
        try {
            const res = await payments.getAllPayment();
            const payload = res.data.context.data;
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
const initialState = {
    PAYMENT: {
        payments_method: [],
        status: ''
    }
}
const paymentsSlice = createSlice({
    name: "PAYMENT",
    initialState,
    reducers: {},
    extraReducers: {
        [fetAsyncPaymentMethod.pending]: (state) => {
            return { ...state, PAYMENT: { ...state.PAYMENT, status: STATUS.LOADING } }
        },
        [fetAsyncPaymentMethod.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PAYMENT: { payments_method: payload, status: STATUS.SUCCESS }
            }
        },
        [fetAsyncPaymentMethod.rejected]: (state) => {
            return { ...state, PAYMENT: { ...state.PAYMENT, status: STATUS.FAIL } }
        }
    }
})
export default paymentsSlice.reducer;