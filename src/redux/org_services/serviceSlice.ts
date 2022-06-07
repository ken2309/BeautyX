import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serviceApi from "../../api/serviceApi";
import { STATUS } from "../status";

export const fetchAsyncServiceDetail: any = createAsyncThunk(
    "SERVICE/fetchAsyncServiceDetail",
    async (values: any) => {
        const res = await serviceApi.getDetailById(values);
        return res.data.context;
    }
);
const initialState = {
    SERVICE: {
        service: {},
        status: "",
    },
};
const serviceSlice = createSlice({
    initialState,
    name: "SERVICE",
    reducers: {},
    extraReducers: {
        [fetchAsyncServiceDetail.pending]: (state) => {
            return {
                ...state,
                SERVICE: { ...state.SERVICE, status: STATUS.LOADING },
            };
        },
        [fetchAsyncServiceDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                SERVICE: {
                    service: payload,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncServiceDetail.rejected]: (state) => {
            return {
                ...state,
                SERVICE: { ...state.SERVICE, status: STATUS.FAIL },
            };
        },
    },
});
export default serviceSlice.reducer;
