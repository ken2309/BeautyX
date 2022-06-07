import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsApi from '../../api/productApi';
import commentsApi from '../../api/commentsApi';
import { STATUS } from '../status'

export const fetchAsyncProductDetail: any = createAsyncThunk(
    "PRODUCT/fetchAsyncProductDetail",
    async (values: any) => {
        const res = await productsApi.getDetailById(values);
        return res.data.context
    }
)
export const fetchAsyncProductCmt: any = createAsyncThunk(
    "PRODUCT/fetchAsyncProductCmt",
    async (values: any) => {
        const res = await commentsApi.getComments(values);
        const payload = {
            comments: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page,
            product_id: parseInt(values.id)
        }
        return payload
    }
)
const initialState = {
    PRODUCT: {
        product: {},
        status: ""
    },
    COMMENTS: {
        product_id: null,
        comments: [],
        page: 1,
        totalItem: 1,
        status_cmt: ""
    }
}
const productSlice = createSlice({
    initialState,
    name: "PRODUCT",
    reducers: {},
    extraReducers: {
        [fetchAsyncProductDetail.pending]: (state) => {
            return { ...state, PRODUCT: { ...state.PRODUCT, status: STATUS.LOADING } }
        },
        [fetchAsyncProductDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    product: payload,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncProductDetail.rejected]: (state) => {
            return { ...state, PRODUCT: { ...state.PRODUCT, status: STATUS.FAIL } }
        },

        [fetchAsyncProductCmt.pending]: (state) => {
            return { ...state, COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING } }
        },
        [fetchAsyncProductCmt.fulfilled]: (state, { payload }) => {
            const { comments, totalItem, page, product_id } = payload;
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    comments: comments,
                    totalItem: totalItem,
                    page: page,
                    product_id: product_id,
                    status_cmt: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncProductCmt.rejected]: (state) => {
            return { ...state, COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.FAIL } }
        }
    }
})
export default productSlice.reducer;