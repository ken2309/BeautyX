import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsApi from "../api/commentsApi";
import { STATUS } from "./status";
import { IComment } from "../interface/comments";
import mediaApi from "../api/mediaApi";

interface IInitialState {
    image_url: string;
    status: string;
}
export const postAsyncMediaComment: any = createAsyncThunk(
    "COMMENT/postAsyncMediaComment",
    async (media: any) => {
        try {
            // const res = await commentsApi.postCommentOrg(values.values);
            let formData = new FormData();
            formData.append("file", media);
            const res = await mediaApi.postMedia(formData);
            const payload = res.data.context.original_url;
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
const initialState: IInitialState = {
    image_url: "",
    status: "",
};
const commentSlice = createSlice({
    initialState,
    name: "COMMENT",
    reducers: {
        clearPrevState: (state: any) => {
            console.log("clearPrevState");
            state.image_url = "";
        },
    },
    extraReducers: {
        // post comments
        [postAsyncMediaComment.pending]: (state) => {
            return { ...state, status: STATUS.LOADING };
        },
        [postAsyncMediaComment.fulfilled]: (state, { payload }) => {
            console.log(payload);
            return {
                ...state,
                image_url: payload,
                status: STATUS.SUCCESS,
            };
        },
        [postAsyncMediaComment.rejected]: (state) => {
            return {
                ...state,
                status: STATUS.FAIL,
            };
        },
    },
});
const { actions } = commentSlice;
export const { clearPrevState } = actions;
export default commentSlice.reducer;
