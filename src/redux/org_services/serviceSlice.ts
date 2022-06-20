import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import serviceApi from "../../api/serviceApi";
import commentsApi from "../../api/commentsApi";
import { STATUS } from "../status";
import favorites from "../../api/favorite";

// get service detail
export const fetchAsyncServiceDetail: any = createAsyncThunk(
    "SERVICE/fetchAsyncServiceDetail",
    async (values: any) => {
        const res = await serviceApi.getDetailById(values);
        return res.data.context;
    }
);
//get comment service
export const fetchAsyncServiceCmt: any = createAsyncThunk(
    "SERVICE/fetchAsyncServiceCmt",
    async (values: any) => {
        const res = await commentsApi.getComments(values);
        const payload = {
            service_id: parseInt(values.id),
            comments: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page,
        };
        return payload;
    }
);
// post comment service
export const postAsyncComment: any = createAsyncThunk(
    "SERVICE/postAsyncComment",
    async (params: any) => {
        console.log("params", params);
        try {
            const res = await commentsApi.postComment(params.values);
            const payload = {
                comment: {
                    ...res.data.context,
                    user: params.user,
                },
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
// post favorite service
export const fetchAsyncFavoriteService: any = createAsyncThunk(
    "SERVICE/favoriteService",
    async (valueService: any) => {
        const org_id = valueService.org_id;
        const service_id = valueService.detail.id;
        try {
            const payload = {
                ...valueService.detail,
                is_favorite: true,
                favorites_count: valueService.detail.favorites_count + 1,
            };
            await favorites.postFavoriteItem({
                org_id: org_id,
                service_id: service_id,
            });
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
// delete favorite service
export const fetchAsyncCancelFavoriteService: any = createAsyncThunk(
    "SERVICE/favoriteService",
    async (valueService: any) => {
        const org_id = valueService.org_id;
        const service_id = valueService.detail.id;
        try {
            const payload = {
                ...valueService.detail,
                is_favorite: false,
                favorites_count: valueService.detail.favorites_count - 1,
            };
            await favorites.deleteFavoriteItem({
                org_id: org_id,
                service_id: service_id,
            });
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
// get services recommend
export const fetchAsyncServicesRec: any = createAsyncThunk(
    "SERVICE/fetchAsyncServicesRec",
    async (values: any) => {
        const res = await serviceApi.getByOrg_id(values);
        const payload = {
            services: res.data.context.data,
            cate_id: values.cate_id,
        };
        return payload;
    }
);
const initialState = {
    SERVICE: {
        service: {},
        status: "",
    },
    SERVICES_REC: {
        services: [],
        cate_id: null,
        status: "",
    },
    COMMENTS: {
        service_id: null,
        comments: [],
        page: 1,
        totalItem: 1,
        status_cmt: "",
    },
};
const serviceSlice = createSlice({
    initialState,
    name: "SERVICE",
    reducers: {
        onToggleFavoriteService: (state: any, action: any) => {
            if (action.payload === true) {
                state.service = {
                    ...state.service,
                    is_favorite: action.payload,
                    favorites_count: state.service.favorites_count + 1,
                };
            } else {
                state.service = {
                    ...state.service,
                    is_favorite: action.payload,
                    favorites_count: state.service.favorites_count - 1,
                };
            }
        },
    },
    extraReducers: {
        // get detail service
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

        // get comment service
        [fetchAsyncServiceCmt.pending]: (state) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING },
            };
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
                    status_cmt: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncServiceCmt.rejected]: (state) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.FAIL },
            };
        },
        // post comment service
        [postAsyncComment.pending]: (state, { payload }) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING },
            };
        },
        [postAsyncComment.fulfilled]: (state, { payload }) => {
            const { comment, page, service_id } = payload;
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    comments: [comment, ...state.COMMENTS.comments],
                    totalItem: state.COMMENTS.totalItem + 1,
                    page: page,
                    service_id: service_id,
                    status_cmt: STATUS.SUCCESS,
                },
            };
        },
        [postAsyncComment.rejected]: (state) => {
            return {
                ...state,
                status_cmt: STATUS.FAIL,
            };
        },
        //favorite service
        [fetchAsyncFavoriteService.pending]: (state) => {
            return state;
        },
        [fetchAsyncFavoriteService.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                SERVICE: {
                    ...state.SERVICE,
                    service: payload,
                },
            };
        },
        [fetchAsyncFavoriteService.rejected]: (state) => {
            return state;
        },
        //favorite service
        [fetchAsyncCancelFavoriteService.pending]: (state) => {
            return state;
        },
        [fetchAsyncCancelFavoriteService.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                SERVICE: {
                    ...state.SERVICE,
                    service: payload,
                },
            };
        },
        [fetchAsyncCancelFavoriteService.rejected]: (state) => {
            return state;
        },
        //get services recommend
        [fetchAsyncServicesRec.pending]: (state) => {
            return {
                ...state,
                SERVICES_REC: { ...state.SERVICES_REC, status: STATUS.LOADING },
            };
        },
        [fetchAsyncServicesRec.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                SERVICES_REC: {
                    services: payload.services,
                    cate_id: payload.cate_id,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncServicesRec.rejected]: (state) => {
            return {
                ...state,
                SERVICES_REC: { ...state.SERVICES_REC, status: STATUS.FAIL },
            };
        },
    },
});
export default serviceSlice.reducer;