import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../status";
import newsApi from "../../api/newsApi";
import orgApi from "../../api/organizationApi";
import commentsApi from "../../api/commentsApi";
import favorites from "../../api/favorite";
import serviceApi from "../../api/serviceApi";
// import { stat } from 'fs';

const fetchAsyncData = async ({ sub_domain, service_list }: any) => {
    try {
        const resOrg = await orgApi.getOrgById(sub_domain);
        const resCmt = await commentsApi.getCommentsOrg({
            org_id: resOrg.data.context.id,
            page: 1,
        });
        let resSerList: any = [];
        let i = 0;
        // resSerList = await service_list.map(async (item: any) =>{
        //     let res = await serviceApi.getDetailById({
        //         org_id: resOrg.data.context.id,
        //         ser_id: item
        //     });
        //     return res
        // })
        for (i; i < service_list.length; i++) {
            let res = await serviceApi.getDetailById({
                org_id: resOrg.data.context.id,
                ser_id: service_list[i],
            });
            resSerList[i] = res.data.context;
        }
        const payload = {
            org: resOrg.data,
            cmt: {
                comments: (await resCmt).data.context.data,
                totalItem: (await resCmt).data.context.total,
                page: 1,
            },
            sers: resSerList,
        };
        return payload;
        // return new Promise(resolve=>resolve(payload))
    } catch (error) {
        console.log(error);
    }
};
export const fetchAsyncDataVideos: any = createAsyncThunk(
    "VIDEOS/fetchAsyncDataVideos",
    async (vid: any) => {
        try {
            let param_id = vid.slug.split("-");
            let org_id = param_id[0].slice(6, param_id[0].length);
            let ser_params = param_id[1]?.slice(6, param_id[1]?.length);
            let sers = ser_params.split("_");
            const resVidData = await fetchAsyncData({
                sub_domain: org_id,
                service_list: sers,
            });
            let payload = [
                {
                    video: vid,
                    resVidData,
                },
            ];
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
export const fetchAsyncVideos: any = createAsyncThunk(
    "VIDEOS/fetchAsyncVideos",
    async () => {
        try {
            const res = await newsApi.getVideo();
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);
export const onFavoriteOrg: any = createAsyncThunk(
    "VIDEOS/onFavoriteOrg",
    async (org: any) => {
        console.log(org);
        await favorites.postFavorite(org?.id);
        const payload = {
            ...org,
            is_favorite: true,
            favorites_count: org.favorites_count + 1,
        };
        return payload;
    }
);
export const onDeleteFavoriteOrg: any = createAsyncThunk(
    "VIDEOS/onDeleteFavoriteOrg",
    async (org: any) => {
        console.log(org);
        await favorites.deleteFavorite(org?.id);
        const payload = {
            ...org,
            is_favorite: false,
            favorites_count: org.favorites_count + 1,
        };
        return payload;
    }
);
const initialState = {
    LISTVIDs: {
        data: [],
        status: "",
    },
    VIDEOs: {
        data: [],
        status: "",
    },
    RESET_STATE: true,
};
const videosSlice = createSlice({
    name: "VID",
    initialState,
    reducers: {
        /**
         * @name setResetInitialState
         * @description reset state for the next rerender.
         * @returns {object} state
         */
        setResetInitialState: (state: any, payload: any) => {
            state.RESET_STATE = payload.payload;
        },
        resetVIDEOs: (state: any) => {
            state.VIDEOs = initialState.VIDEOs;
        },
    },
    extraReducers: {
        // fetch list post
        [fetchAsyncVideos.pending]: (state) => {
            return {
                ...state,
                LISTVIDs: {
                    ...state.LISTVIDs,
                    status: STATUS.LOADING,
                },
            };
        },
        [fetchAsyncVideos.fulfilled]: (state, { payload }) => {
            // console.log(payload)
            return {
                ...state,
                LISTVIDs: { data: payload, status: STATUS.SUCCESS },
            };
        },
        [fetchAsyncVideos.rejected]: (state) => {
            return {
                ...state,
                LISTVIDs: { ...state.LISTVIDs, status: STATUS.LOADING },
            };
        },
        // fetch data of post -- org -- ser --
        [fetchAsyncDataVideos.pending]: (state) => {
            return {
                ...state,
                VIDEOs: {
                    ...state.VIDEOs,
                    data: state.RESET_STATE ? [] : [...state.VIDEOs.data],
                    status: STATUS.LOADING,
                },
            };
        },
        [fetchAsyncDataVideos.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                RESET_STATE: false,
                VIDEOs: {
                    data:
                        state.VIDEOs.data.length === 0
                            ? payload
                            : [...state.VIDEOs.data, ...payload],
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncDataVideos.rejected]: (state) => {
            return {
                ...state,
                VIDEOs: { ...state.VIDEOs, status: STATUS.LOADING },
            };
        },
        // favorites org
        [onFavoriteOrg.pending]: (state) => {
            return state;
        },
        [onFavoriteOrg.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                // org: {
                //     ...state.org,
                //     is_favorite: true,
                //     favorites_count: payload
                // }
            };
        },
        [onFavoriteOrg.rejected]: (state, { payload }) => {
            console.log(payload);
            return state;
        },
        //remove favorite org
        [onDeleteFavoriteOrg.pending]: (state) => {
            return state;
        },
        [onDeleteFavoriteOrg.fulfilled]: (state, { payload }) => {
            console.log(payload);
            return {
                ...state,
                // org: {
                //     ...state.org,
                //     is_favorite: false,
                //     favorites_count: payload
                // }
            };
        },
        [onDeleteFavoriteOrg.rejected]: (state) => {
            return state;
        },
    },
});
const { reducer, actions } = videosSlice;
export const { setResetInitialState, resetVIDEOs } = actions;
export default reducer;
