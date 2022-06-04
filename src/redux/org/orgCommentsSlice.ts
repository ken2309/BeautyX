import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsApi from "../../api/commentsApi";
import { STATUS } from "../status";
import { IComment } from "../../interface/comments";

interface IInitialState {
    org_id: any;
    comments: IComment[];
    page: number;
    totalItem: number;
    status: string;
    status_ac: string;
}

export const fetchAsyncOrgComments: any = createAsyncThunk(
    "ORG_COMMENTS/fetchAsyncOrgComments",
    async (values: any) => {
        try {
            const res = commentsApi.getCommentsOrg({
                org_id: values.org_id,
                page: values.page,
            });
            const payload = {
                org_id: values.org_id,
                comments: (await res).data.context.data,
                totalItem: (await res).data.context.total,
                page: 1,
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
export const postAsyncOrgComments: any = createAsyncThunk(
    "ORG_COMMENTS/postAsyncOrgComments",
    async (values: any) => {
        try {
            const res = await commentsApi.postCommentOrg(values.values);
            const payload = {
                comment: {
                    ...res.data.context,
                    user: values.user,
                },
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
const initialState: IInitialState = {
    org_id: null,
    comments: [],
    page: 1,
    totalItem: 1,
    status: "",
    status_ac: "",
};
const orgCommentsSlice = createSlice({
    initialState,
    name: "ORG_COMMENTS",
    reducers: {
        clearPrevState: (state: any) => {
            state.comments = [];
        },
    },
    extraReducers: {
        [fetchAsyncOrgComments.pending]: (state) => {
            return { ...state, status: STATUS.LOADING };
        },
        [fetchAsyncOrgComments.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org_id: payload.org_id,
                comments: [...state.comments, ...payload.comments],
                page: payload.page,
                totalItem: payload.totalItem,
                status: STATUS.SUCCESS,
            };
        },
        [fetchAsyncOrgComments.rejected]: (state) => {
            return {
                ...state,
                status: STATUS.FAIL,
            };
        },
        // post comments
        [postAsyncOrgComments.pending]: (state) => {
            return { ...state, status_ac: STATUS.LOADING };
        },
        [postAsyncOrgComments.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                comments: [payload.comment, ...state.comments],
                totalItem: state.totalItem + 1,
                status_ac: STATUS.SUCCESS,
            };
        },
        [postAsyncOrgComments.rejected]: (state) => {
            return {
                ...state,
                status_ac: STATUS.FAIL,
            };
        },
    },
});
const { actions } = orgCommentsSlice;
export const { clearPrevState } = actions;
export default orgCommentsSlice.reducer;
