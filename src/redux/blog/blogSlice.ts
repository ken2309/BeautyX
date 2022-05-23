import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newsApi from '../../api/newsApi';
import { STATUS } from '../status'

export const fetchAsyncNews: any = createAsyncThunk(
    "BLOG/fetchAsyncNews",
    async () => {
        try {
            const res = await newsApi.getAll();
            const payload = res.data
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchAsyncVideos: any = createAsyncThunk(
    "BLOG/fetchAsyncNews",
    async () => {
        try {
            const res = await newsApi.getVideo();
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
)
const initialState = {
    NEWS: {
        news: [],
        status: ''
    },
    VIDEOS: {
        videos: [],
        status: ''
    }
}
const blogSlice = createSlice({
    name: 'BLOG',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncNews.pending]: (state) => {
            return { ...state, NEWS: { ...state.NEWS, status: STATUS.LOADING } }
        },
        [fetchAsyncNews.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                NEWS: { news: payload, status: STATUS.SUCCESS }
            }
        },
        [fetchAsyncNews.rejected]: (state) => {
            return { ...state, NEWS: { ...state.NEWS, status: STATUS.LOADING } }
        },

        [fetchAsyncVideos.pending]: (state) => {
            return { ...state, VIDEOS: { ...state.VIDEOS, status: STATUS.LOADING } }
        },
        [fetchAsyncVideos.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                VIDEOS: { videos: payload, status: STATUS.SUCCESS }
            }
        },
        [fetchAsyncVideos.rejected]: (state) => {
            return { ...state, VIDEOS: { ...state.VIDEOS, status: STATUS.LOADING } }
        },
    }
})
export default blogSlice.reducer;