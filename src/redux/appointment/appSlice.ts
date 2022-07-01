import { STATUS } from '../status';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apointmentApi from '../../api/apointmentApi';
import dayjs from 'dayjs';

export const fetchAsyncApps: any = createAsyncThunk(
    "APP/fetchAsyncApps",
    async (time: any) => {
        const res = await apointmentApi.getAppoitment(time);
        const appsList = res.data?.context?.data?.map((i: any) => {
            return {
                ...i,
                time_query: time
            }
        })
        return {
            apps: appsList,
            time
        }
    }
)

interface IInitialState {
    APPS: {
        appointments: any[],
        status: string,
        time: any
    },
    APP_POST_RES: {
        res: any,
        status: any
    }
}

const initialState: IInitialState = {
    APPS: {
        appointments: [],
        status: '',
        time: dayjs().format("YYYY-MM")
    },
    APP_POST_RES: {
        res: null,
        status: ""
    }
}
const appsSlice = createSlice({
    initialState,
    name: "APP",
    reducers: {
        onSetStatusApp: (state) => {
            state.APPS.status = STATUS.LOADING
        }
    },
    extraReducers: {
        [fetchAsyncApps.pending]: (state) => {
            return { ...state, APPS: { ...state.APPS, status: STATUS.LOADING } }
        },
        [fetchAsyncApps.fulfilled]: (state, { payload }) => {
            const { apps, time } = payload;
            return {
                ...state,
                APPS: {
                    appointments: apps,
                    time: time,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncApps.rejected]: (state) => {
            return { ...state, APPS: { ...state.APPS, status: STATUS.FAIL } }
        },
    }
})
const { actions } = appsSlice;
export const { onSetStatusApp } = actions;
export default appsSlice.reducer;