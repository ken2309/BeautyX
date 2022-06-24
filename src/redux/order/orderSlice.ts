import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import order from '../../api/orderApi';
import servicesUserApi from '../../api/servicesUser';
import { STATUS } from '../status';

export const fetchAsyncOrderServices: any = createAsyncThunk(
    "ORDER/fetchAsyncOrderServices",
    async (page: number) => {
        const res = await servicesUserApi.getServices();
        return {
            services: res.data.context.data,
            page: page,
            totalItem: res.data.context.total,
        }
    }
)
export const fetchAsyncOrderPaid: any = createAsyncThunk(
    "ORDER/fetchAsyncOrderPaid",
    async (values: any) => {
        const res = await order.getOrders(values);
        return {
            orders: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total
        }
    }
)
export const fetchAsyncOrderCancel: any = createAsyncThunk(
    "ORDER/fetchAsyncOrderCancel",
    async (values: any) => {
        const res = await order.getOrders(values);
        return {
            orders: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total
        }
    }
)

interface InitialState {
    ORDER_SERVICES: {
        services: any[],
        page: number,
        totalItem: number,
        status: string
    },
    ORDER: {
        orders: any[],
        page: number,
        totalItem: number,
        status: string
    },
    ORDER_CANCEL: {
        orders: any[],
        page: number,
        totalItem: number,
        status: string
    }
}

const initialState: InitialState = {
    ORDER_SERVICES: {
        services: [],
        page: 1,
        totalItem: 1,
        status: ""
    },
    ORDER: {
        orders: [],
        page: 1,
        totalItem: 1,
        status: ""
    },
    ORDER_CANCEL: {
        orders: [],
        page: 1,
        totalItem: 1,
        status: ""
    }
}
const orderSlice = createSlice({
    name: "ORDER",
    initialState,
    reducers: {
        onSetStatusServicesUser: (state) => {
            state.ORDER_SERVICES.status = STATUS.LOADING;
        }
    },
    extraReducers: {
        [fetchAsyncOrderServices.pending]: (state) => {
            return { ...state, ORDER_SERVICES: { ...state.ORDER_SERVICES, status: STATUS.LOADING } }
        },
        [fetchAsyncOrderServices.fulfilled]: (state, { payload }) => {
            const { services, page, totalItem } = payload
            return {
                ...state,
                ORDER_SERVICES: {
                    services: services,
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncOrderServices.rejected]: (state) => {
            return { ...state, ORDER_SERVICES: { ...state.ORDER_SERVICES, status: STATUS.FAIL } }
        },

        [fetchAsyncOrderPaid.pending]: (state) => {
            return { ...state, ORDER: { ...state.ORDER, status: STATUS.LOADING } }
        },
        [fetchAsyncOrderPaid.fulfilled]: (state, { payload }) => {
            const { orders, page, totalItem } = payload
            return {
                ...state,
                ORDER: {
                    orders: orders,
                    page: page,
                    status: STATUS.SUCCESS,
                    totalItem: totalItem
                }
            }
        },
        [fetchAsyncOrderPaid.rejected]: (state) => {
            return { ...state, ORDER: { ...state.ORDER, status: STATUS.FAIL } }
        },

        [fetchAsyncOrderCancel.pending]: (state) => {
            return { ...state, ORDER_CANCEL: { ...state.ORDER_CANCEL, status: STATUS.LOADING } }
        },
        [fetchAsyncOrderCancel.fulfilled]: (state, { payload }) => {
            const { orders, page, totalItem } = payload
            return {
                ...state,
                ORDER_CANCEL: {
                    orders: [...state.ORDER_CANCEL.orders, ...orders],
                    page: page,
                    status: STATUS.SUCCESS,
                    totalItem: totalItem
                }
            }
        },
        [fetchAsyncOrderCancel.rejected]: (state) => {
            return { ...state, ORDER_CANCEL: { ...state.ORDER_CANCEL, status: STATUS.FAIL } }
        },
    }
})
const { actions } = orderSlice;
export const { onSetStatusServicesUser } = actions
export default orderSlice.reducer;