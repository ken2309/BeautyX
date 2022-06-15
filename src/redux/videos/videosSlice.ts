import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bannerApi from '../../api/bannerApi';
import { STATUS } from '../status';
import discountApi from '../../api/discountApi';
import newsApi from '../../api/newsApi';
import orgApi from '../../api/organizationApi';
import commentsApi from '../../api/commentsApi';
// import { stat } from 'fs';

const fetchAsyncData = async (sub_domain: any) => {
    try {
        const resOrg = await orgApi.getOrgById(sub_domain);
        const resCmt = await commentsApi.getCommentsOrg({
            org_id: resOrg.data.context.id,
            page: 1,
        });
        const payload = {
            org: resOrg.data,
            cmt: {
                comments: (await resCmt).data.context.data,
                totalItem: (await resCmt).data.context.total,
                page: 1,
            }
        }
        return payload
        // return new Promise(resolve=>resolve(payload))
    } catch (error) {
        console.log(error)
    }
};
export const fetchAsyncDataVideos: any = createAsyncThunk(
    "VIDEOS/fetchAsyncDataVideos",
    async (vidArr:any) => {
        try {
            const arr = vidArr.map(
                async(item:any)=>{
                    let param_id = item.slug.split('-');
                    let org_id = param_id[0].slice(6, param_id[0].length);
                    const resVidData = await fetchAsyncData(org_id);
                    let payload = {
                        video: item,
                        resVidData
                    }
                    console.log(payload)
                    return resVidData
                }
            )
            return arr;
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchAsyncVideos: any = createAsyncThunk(
    "VIDEOS/fetchAsyncVideos",
    async () => {
        try {
            const res = await newsApi.getVideo();
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchAsyncComments: any = createAsyncThunk(
    "VIDEOS/fetchAsyncComments",
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
                page: values.page,
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
const initialState = {
    VIDEOs: {
        data: [],
        status: ''
    }
}
const videosSlice = createSlice({
    name: "VIDEOs",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncVideos.pending]: (state) => {
            return { ...state, VIDEOs: { ...state.VIDEOs, status: STATUS.LOADING } }
        },
        [fetchAsyncVideos.fulfilled]: (state, { payload }) => {
            console.log(payload)
            return {
                ...state,
                VIDEOs: { ...state.VIDEOs, status: STATUS.SUCCESS }
            }
        },
        [fetchAsyncVideos.rejected]: (state) => {
            return { ...state, VIDEOs: { ...state.VIDEOs, status: STATUS.LOADING } }
        },
        [fetchAsyncDataVideos.pending]: (state) => {
            return { ...state, VIDEOs: { ...state.VIDEOs, status: STATUS.LOADING } }
        },
        [fetchAsyncDataVideos.fulfilled]: (state, { payload }) => {
            console.log(payload)
            return {
                ...state,
                VIDEOs: { data:payload, status: STATUS.SUCCESS }
            }
        },
        [fetchAsyncDataVideos.rejected]: (state) => {
            return { ...state, VIDEOs: { ...state.VIDEOs, status: STATUS.LOADING } }
        }
    }
})
export default videosSlice.reducer;