import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import servicePromoApi from "../../../api/servicePromoApi";
import { STATUS } from "../../status";
export const fetchAsyncHotDealPromo: any = createAsyncThunk(
    "HOTDEAL/fetchAsyncHotDealPromo",
    async (values: any) => {
        const res = await servicePromoApi.getServicesPromo(values);
        return res.data.data.hits;
    }
);

const initialState = {
    HOTDEAL: {
        hotdeal: [],
        status: "",
    },
};

const hotdealSlide = createSlice({
    name: "HOTDEAL",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncHotDealPromo.pending]: (state) => {
            return {
                ...state,
                HOTDEAL: { ...state.HOTDEAL, status: STATUS.LOADING },
            };
        },
        [fetchAsyncHotDealPromo.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                HOTDEAL: {
                    hotdeal: payload,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncHotDealPromo.rejected]: (state) => {
            return {
                ...state,
                HOTDEAL: { ...state.HOTDEAL, status: STATUS.FAIL },
            };
        },
    },
});
export default hotdealSlide.reducer;
