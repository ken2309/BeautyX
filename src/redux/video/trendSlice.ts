import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../status';
import newsApi from '../../api/newsApi';
import orgApi from '../../api/organizationApi';
import commentsApi from '../../api/commentsApi';
import favorites from '../../api/favorite';
import serviceApi from '../../api/serviceApi';
// import { stat } from 'fs';

const fetchAsyncData = async ({sub_domain,service_list}:any) => {
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
        try{
            for(i;i<service_list.length;i++){
                let res = await serviceApi.getDetailById({
                    org_id: resOrg.data.context.id,
                    ser_id: service_list[i]
                })
                resSerList[i]= res?.data.context;
            }
        }catch(err){
            console.log(err)
        }
        const payload = {
            org: resOrg.data,
            cmt: {
                comments:  resCmt.data.context.data,
                totalItem: resCmt.data.context.total,
                page: 1,
            },
            sers: resSerList
        }
        return payload
        // return new Promise(resolve=>resolve(payload))
    } catch (error) {
        console.log(error)
    }
};
export const fetchAsyncDataTrends: any = createAsyncThunk(
    "TRENDs/fetchAsyncDataTrends",
    async (vid: any) => {
        try {
            let param_id = vid.slug.split('-');
            let org_id = param_id[0].slice(6, param_id[0].length);
            let ser_params = param_id[1]?.slice(6, param_id[1]?.length);
            let sers = ser_params.split('_');
            const resVidData = await fetchAsyncData({
                sub_domain:org_id,
                service_list:sers
            });
            let payload = [{
                video: vid,
                resVidData
            }]
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchAsyncTrendVideos: any = createAsyncThunk(
    "TRENDs/fetchAsyncTrendVideos",
    async () => {
        try {
            const res = await newsApi.getTrendsVideo();
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)
export const onFavoriteOrg: any = createAsyncThunk(
    "TRENDs/onFavoriteOrg",
    async (org: any) => {
        console.log(org);
        await favorites.postFavorite(org?.id)
        const payload = {
            ...org,
            is_favorite: true,
            favorites_count: org.favorites_count + 1
        }
        return payload
    }
)
export const onDeleteFavoriteOrg: any = createAsyncThunk(
    "TRENDs/onDeleteFavoriteOrg",
    async (org: any) => {
        console.log(org);
        await favorites.deleteFavorite(org?.id)
        const payload = {
            ...org,
            is_favorite: false,
            favorites_count: org.favorites_count + 1
        }
        return payload
    }
)
const initialState = {
    LISTVIDs: {
        data: [],
        status: ''
    },
    VIDEOs: {
        data: [],
        status: ''
    },
    RESET_STATE: true
}
const trendsSlice = createSlice({
    name: "TRENDs",
    initialState,
    reducers: {
        /**
         * @name setResetInitialState
         * @description reset state for the next rerender.
         * @returns {object} state
         */
        setResetInitialState: (state,payload) => {
            state.RESET_STATE=payload.payload;
        },
        resetVIDEOs: (state)=>{
            state.VIDEOs=initialState.VIDEOs;
        }
    },
    extraReducers: {
        // fetch list post 
        [fetchAsyncTrendVideos.pending]: (state) => {
            return {
                ...state, LISTVIDs: {
                    ...state.LISTVIDs,
                    status: STATUS.LOADING
                }
            }
        },
        [fetchAsyncTrendVideos.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                LISTVIDs: { data: payload, status: STATUS.SUCCESS }
            }
        },
        [fetchAsyncTrendVideos.rejected]: (state) => {
            return { ...state, LISTVIDs: { ...state.LISTVIDs, status: STATUS.LOADING } }
        },
        // fetch data of post -- org -- ser -- 
        [fetchAsyncDataTrends.pending]: (state) => {
            return { ...state,
                        VIDEOs: { 
                            ...state.VIDEOs,
                            data:state.RESET_STATE?[]:[...state.VIDEOs.data],
                            status: STATUS.LOADING } }
        },
        [fetchAsyncDataTrends.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                RESET_STATE: false,
                VIDEOs: {
                    data: (state.VIDEOs.data.length === 0) ? payload : [...state.VIDEOs.data, ...payload],
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncDataTrends.rejected]: (state) => {
            return { ...state, VIDEOs: { ...state.VIDEOs, status: STATUS.LOADING } }
        },
        // favorites org
        [onFavoriteOrg.pending]: (state) => {
            return state
        },
        [onFavoriteOrg.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                // org: {
                //     ...state.org,
                //     is_favorite: true,
                //     favorites_count: payload
                // }
            }
        },
        [onFavoriteOrg.rejected]: (state,{payload}) => {
            console.log(payload)
            return state
        },
        //remove favorite org
        [onDeleteFavoriteOrg.pending]: (state) => {
            return state
        },
        [onDeleteFavoriteOrg.fulfilled]: (state, { payload }) => {
            console.log(payload)
            return {
                ...state,
                // org: {
                //     ...state.org,
                //     is_favorite: false,
                //     favorites_count: payload
                // }
            }
        },
        [onDeleteFavoriteOrg.rejected]: (state) => {
            return state
        },
    }
})
const { reducer, actions } = trendsSlice;
export const { setResetInitialState, resetVIDEOs } = actions;
export default reducer;