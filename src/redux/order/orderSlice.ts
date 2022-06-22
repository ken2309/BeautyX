import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import order from '../../api/orderApi';
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

const initialState = {
    ORDER_SERVICES: {
        services: [],
        page: 1,
        totalItem: 1,
        status: ""
    }
}
const orderSlice = createSlice({
    name: "ORDER",
    initialState,
    reducers: {},
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
    }
})
export default orderSlice.reducer;