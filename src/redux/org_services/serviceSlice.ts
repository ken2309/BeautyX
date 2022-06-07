import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serviceApi from '../../api/serviceApi';
import commentsApi from '../../api/commentsApi';
import { STATUS } from '../status';

export const fetchAsyncServiceDetail: any = createAsyncThunk(
    "SERVICE/fetchAsyncServiceDetail",
    async (values: any) => {
        const res = await serviceApi.getDetailById(values);
        return res.data.context
    }
)
export const fetchAsyncServiceCmt: any = createAsyncThunk(
    "SERVICE/fetchAsyncServiceCmt",
    async (values: any) => {
        const res = await commentsApi.getComments(values);
        const payload = {
            service_id: parseInt(values.id),
            comments: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page
        }
        return payload
    }
)
const initialState = {
    SERVICE: {
        service: {},
        status: ""
    },
    COMMENTS: {
        service_id:null,
        comments: [],
        page: 1,
        totalItem: 1,
        status_cmt: ""
    }
}
const serviceSlice = createSlice({
    initialState,
    name: "SERVICE",
    reducers: {},
    extraReducers: {
        [fetchAsyncServiceDetail.pending]: (state) => {
            return { ...state, SERVICE: { ...state.SERVICE, status: STATUS.LOADING } }
        },
        [fetchAsyncServiceDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                SERVICE: {
                    service: payload,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncServiceDetail.rejected]: (state) => {
            return { ...state, SERVICE: { ...state.SERVICE, status: STATUS.FAIL } }
        },

        [fetchAsyncServiceCmt.pending]: (state) => {
            return { ...state, COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING } }
        },
        [fetchAsyncServiceCmt.fulfilled]: (state, { payload }) => {
            const { comments, totalItem, page, service_id } = payload;
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    comments: comments,
                    totalItem: totalItem,
                    page: page,
                    service_id: service_id,
                    status_cmt: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncServiceCmt.rejected]: (state) => {
            return { ...state, COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.FAIL } }
        }
    }
})
export default serviceSlice.reducer;