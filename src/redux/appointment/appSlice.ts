import { STATUS } from '../status';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apointmentApi from '../../api/apointmentApi';
import dayjs from 'dayjs';
import { formatDateV } from '../../utils/formatDate';

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
        const today = dayjs().format("YYYY-MM-DD")
        const appsToday = appsList.filter((val: any) => (formatDateV(val.time_start)) === today);
        return {
            apps: appsList,
            time,
            appsToday: appsToday
        }
    }
)

interface IInitialState {
    APPS: {
        appointments: any[],
        status: string,
        time: any,
        appsToday: any[]
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
        time: dayjs().format("YYYY-MM"),
        appsToday: []
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
        },
        onClearApps:(state)=>{
            state.APPS.appointments = [];
            state.APPS.appsToday = []
        }
    },
    extraReducers: {
        [fetchAsyncApps.pending]: (state) => {
            return { ...state, APPS: { ...state.APPS, status: STATUS.LOADING } }
        },
        [fetchAsyncApps.fulfilled]: (state, { payload }) => {
            const { apps, time, appsToday } = payload;
            return {
                ...state,
                APPS: {
                    appointments: apps,
                    time: time,
                    status: STATUS.SUCCESS,
                    appsToday: appsToday
                }
            }
        },
        [fetchAsyncApps.rejected]: (state) => {
            return { ...state, APPS: { ...state.APPS, status: STATUS.FAIL } }
        },
    }
})
const { actions } = appsSlice;
export const { onSetStatusApp, onClearApps } = actions;
export default appsSlice.reducer;