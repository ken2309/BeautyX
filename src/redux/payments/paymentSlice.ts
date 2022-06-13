import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import payments from '../../api/paymentApi';
import img from '../../constants/img';
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
interface IInitialState {
    PAYMENT_METHOD: any[],
    PAYMENT: {
        payments_method: any[],
        status: string
    }
}
const initialState: IInitialState = {
    PAYMENT_METHOD: [
        {
            id: 3,
            img: img.cardAtm,
            title: "Thanh toán qua ví điện tử",
            method: "CARD_ONLINE",
            method_list: [],
        },
        // {
        //     id: 1,
        //     img: img.money,
        //     title: "Thanh toán tại cơ sở",
        //     method: "PAYMENT_IN_BRANCH",
        //     method_list: [],
        // },
        // {
        //     id: 2,
        //     img: img.cardAtm,
        //     title: "Thanh toán bằng thẻ ATM và tài khoản ngân hàng",
        //     method: "PAYMENT_ATM",
        //     method_list: [],
        // },
        // { id: 4, img: img.creditMachine, title: 'Thanh toán bằng thẻ quốc tế Visa/Master/JCB', method: 'PAYMENT_VISA', method_list: [] },
        // { id: 6, img: img.imagePay, title: 'Thanh toán qua Ví Ngân Lượng', method: 'PAYMENT_CL', method_list: [] },
    ],
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
            const CARD_ONLINE = state.PAYMENT_METHOD.find((i: any) => i.id === 3);
            const CARD_ONLINE_NEW = {
                ...CARD_ONLINE,
                method_list: payload
            }
            state.PAYMENT_METHOD = state.PAYMENT_METHOD.fill(CARD_ONLINE_NEW, 0, 1);
            state.PAYMENT.payments_method = payload;
            state.PAYMENT.status = STATUS.SUCCESS
        },
        [fetAsyncPaymentMethod.rejected]: (state) => {
            return { ...state, PAYMENT: { ...state.PAYMENT, status: STATUS.FAIL } }
        }
    }
})
export default paymentsSlice.reducer;