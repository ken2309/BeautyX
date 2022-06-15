import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import comboApi from '../../api/comboApi';
import commentsApi from '../../api/commentsApi';
import { STATUS } from '../status';

export const fetchAsyncComboDetail: any = createAsyncThunk(
    "COMBO/fetchAsyncComboDetail",
    async (values: any) => {
        const res = await comboApi.getComboDetail(values);
        return res.data.context
    }
)
export const fetchAsyncCommentsCombo: any = createAsyncThunk(
    "COMBO/fetchAsyncCommentsCombo",
    async (values: any) => {
        const res = await commentsApi.getComments(values);
        const payload = {
            combo_id: parseInt(values.id),
            comments: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page
        }
        return payload
    }
)
export const postCommentCombo: any = createAsyncThunk(
    "COMBO/postCommentCombo",
    async (params: any) => {
        const res = await commentsApi.postComment(params.values);
        const payload = {
            ...res.data.context,
            user: params.user
        }
        return payload
    }
)

const initialState = {
    COMBO: {
        combo: {},
        status: ""
    },
    COMMENTS: {
        combo_id: null,
        comments: [],
        page: 1,
        totalItem: 1,
        status: ""
    }
}
const comboSlice = createSlice({
    name: "COMBO",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncComboDetail.pending]: (state) => {
            return { ...state, COMBO: { ...state.COMBO, status: STATUS.LOADING } }
        },
        [fetchAsyncComboDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                COMBO: {
                    combo: payload,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncComboDetail.rejected]: (state) => {
            return { ...state, COMBO: { ...state.COMBO, status: STATUS.FAIL } }
        },
        //get comments combo
        [fetchAsyncCommentsCombo.pending]: (state) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status: STATUS.LOADING }
            }
        },
        [fetchAsyncCommentsCombo.fulfilled]: (state, { payload }) => {
            const { combo_id, comments, page, totalItem } = payload;
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    combo_id: combo_id,
                    comments: comments,
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncCommentsCombo.rejected]: (state) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status: STATUS.FAIL }
            }
        },
        //post comments combo
        [postCommentCombo.pending]: (state) => {
            return state;
        },
        [postCommentCombo.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    comments: [payload, ...state.COMMENTS.comments],
                    totalItem: state.COMMENTS.totalItem + 1
                }
            }
        },
        [postCommentCombo.pending]: (state) => {
            return state;
        },
    }
})
export default comboSlice.reducer;