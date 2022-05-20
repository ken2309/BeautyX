import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoryApi from '../../api/categoryApi';
import serviceApi from '../../api/serviceApi';
import { STATUS } from '../status';
import { Service } from '../../interface/service'

interface ISERVICES {
    services: Service[],
    page: number,
    totalItem: number,
    status_ser: string
}
interface ICATE {
    categories: [],
    status: string
}
interface IINITIALSTATE {
    CATE: ICATE,
    SERVICES: ISERVICES
}

export const fetchAsyncCateServices: any = createAsyncThunk(
    "ORG_SERVICES/fetchAsyncCateServices",
    async (org_id) => {
        const params = { org_id };
        try {
            const res = await categoryApi.getByOrgId_services(params);
            const payload = res.data.context.data
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchAsyncServices: any = createAsyncThunk(
    "ORG_SERVICES/fetchAsyncServices",
    async (values: any) => {
        const res = await serviceApi.getByOrg_id(values);
        const payload = {
            services: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total,
            status_ser: STATUS.SUCCESS
        }
        return payload
    }
)
const initialState: IINITIALSTATE = {
    CATE: {
        categories: [],
        status: ''
    },
    SERVICES: {
        services: [],
        page: 1,
        totalItem: 1,
        status_ser: ''
    }
}
const orgServicesSlice = createSlice({
    name: "ORG_SERVICES",
    initialState,
    reducers: {
        clearServices: (state) => {
            return {
                ...state,
                SERVICES: {
                    ...state.SERVICES,
                    services: [],
                    page: 1
                }
            }
        }
    },
    extraReducers: {
        //get services cate org
        [fetchAsyncCateServices.pending]: (state) => {
            return { ...state, CATE: { ...state.CATE, status: STATUS.LOADING } }
        },
        [fetchAsyncCateServices.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                CATE: { categories: payload, status: STATUS.SUCCESS }
            }
        },
        [fetchAsyncCateServices.rejected]: (state) => {
            return {
                ...state, CATE: { ...state.CATE, status: STATUS.FAIL }
            }
        },
        //get services org
        [fetchAsyncServices.pending]: (state) => {
            return {
                ...state, SERVICES: {
                    ...state.SERVICES,
                    //status_ser: STATUS.LOADING
                }
            }
        },
        [fetchAsyncServices.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                SERVICES: {
                    services: [...state.SERVICES.services, ...payload.services],
                    totalItem: payload.totalItem,
                    page: payload.page,
                    status_ser: payload.status_ser
                }
            }
        },
        [fetchAsyncServices.rejected]: (state) => {
            return {
                ...state,
                SERVICES: { ...state.SERVICES, status_ser: STATUS.FAIL }
            }
        }
    }
})
const { actions } = orgServicesSlice;
export const { clearServices } = actions
export default orgServicesSlice.reducer;