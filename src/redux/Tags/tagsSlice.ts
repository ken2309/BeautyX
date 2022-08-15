import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tagsApi from "../../api/tagApi";
import { STATUS } from "../status";

export const fetchAsyncProductTags: any = createAsyncThunk(
    "TAGS/fetchAsyncProduct",
    async () => {
        try {
            const res = await tagsApi.getProducts();
            const payload = res.data.context.data;
            return payload;
        } catch (error) {
            console.log("error", error);
        }
    }
);
export const fetchAsyncTags: any = createAsyncThunk(
    "TAGS/fetchAsyncProduct",
    async () => {
        try {
            const res = await tagsApi.getProducts();
            const payload = res.data.context.data;
            return payload;
        } catch (error) {
            console.log("error", error);
        }
    }
);

const initialState = {
    tags: [],
    status: "",
};

const tagsSlice: any = createSlice({
    initialState,
    name: "TAGS",
    reducers: {},
    extraReducers: {
        [fetchAsyncTags.pending]: (state) => {
            return {
                ...state,
                status: STATUS.LOADING,
            };
        },
        [fetchAsyncTags.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                tags: payload,
                status: STATUS.SUCCESS,
            };
        },
        [fetchAsyncTags.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL };
        },
        [fetchAsyncProductTags.pending]: (state) => {
            return {
                ...state,
                status: STATUS.LOADING,
            };
        },
        [fetchAsyncProductTags.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                tags: payload,
                status: STATUS.SUCCESS,
            };
        },
        [fetchAsyncProductTags.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL };
        },
    },
});

export default tagsSlice.reducer;
