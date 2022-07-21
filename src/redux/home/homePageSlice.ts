import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import servicePromoApi from '../../api/servicePromoApi';
import orgApi from '../../api/organizationApi';
import { STATUS } from '../status';
import { IServicePromo } from '../../interface/servicePromo';
import { IOrganization } from '../../interface/organization'

export const fetchAsyncServicesPromo: any = createAsyncThunk(
    "HOME_PAGE/fetchAsyncServicesPromo",
    async (values: any) => {
        const res = await servicePromoApi.getServicesPromo(values);
        return {
            services: res.data.data.hits,
            totalItem: res.data.total,
            page: values.page,
            query: values.sort
        }
    }
)
export const fetchAsyncServicesBought: any = createAsyncThunk(
    "HOME_PAGE/fetchAsyncServicesBought",
    async (values: any) => {
        const res = await servicePromoApi.getServicesPromo(values);
        return {
            services: res.data.data.hits,
            totalItem: res.data.total,
            page: values.page,
        }
    }
)

export const fetchAsyncServicesRandom: any = createAsyncThunk(
    "HOME_PAGE/fetchAsyncServicesRandom",
    async (values: any) => {
        const res = await servicePromoApi.getServicesPromo(values);
        return {
            services: res.data.data.hits,
            totalItem: res.data.total,
            page: values.page,
        }
    }
)

export const fetchAsyncOrgsFavorite: any = createAsyncThunk(
    "HOME_PAGE/fetchAsyncOrgsFavorite",
    async (values: any) => {
        const res = await orgApi.getAll(values);
        return {
            orgs: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total
        }
    }
)

interface IInitialState {
    SERVICES_PROMO: {
        services: IServicePromo[],
        page: number,
        totalItem: number,
        status: string,
        query: string
    },
    SERVICES_BOUGHT: {
        services: IServicePromo[],
        page: number,
        totalItem: number,
        status: string,
    },
    SERVICES_RANDOM: {
        services: IServicePromo[],
        page: number,
        totalItem: number,
        status: string,
    },
    ORGS_FAVORITE: {
        orgs: IOrganization[],
        page: number,
        totalItem: number,
        status: string,
    }
}

const initialState: IInitialState = {
    SERVICES_PROMO: {
        services: [],
        page: 1,
        totalItem: 1,
        status: "",
        query: ""
    },
    SERVICES_BOUGHT: {
        services: [],
        page: 1,
        totalItem: 1,
        status: "",
    },
    SERVICES_RANDOM: {
        services: [],
        page: 1,
        totalItem: 1,
        status: "",
    },
    ORGS_FAVORITE: {
        orgs: [],
        page: 1,
        totalItem: 1,
        status: "",
    }
}
const homePageSlice = createSlice({
    name: "HOME_PAGE",
    initialState,
    reducers: {
        clearServicesPromo: (state) => {
            state.SERVICES_PROMO.services = [];
            state.SERVICES_PROMO.page = 1
        }
    },
    extraReducers: {
        [fetchAsyncServicesPromo.pending]: (state) => {
            return { ...state, SERVICES_PROMO: { ...state.SERVICES_PROMO, status: STATUS.LOADING } }
        },
        [fetchAsyncServicesPromo.fulfilled]: (state, { payload }) => {
            const { services, page, totalItem, query } = payload;
            return {
                ...state,
                SERVICES_PROMO: {
                    services: [...state.SERVICES_PROMO.services, ...services],
                    page: page,
                    totalItem: totalItem,
                    query: query,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncServicesPromo.rejected]: (state) => {
            return { ...state, SERVICES_PROMO: { ...state.SERVICES_PROMO, status: STATUS.FAIL } }
        },
        //services bought count
        [fetchAsyncServicesBought.pending]: (state) => {
            return { ...state, SERVICES_BOUGHT: { ...state.SERVICES_BOUGHT, status: STATUS.LOADING } }
        },
        [fetchAsyncServicesBought.fulfilled]: (state, { payload }) => {
            const { services, page, totalItem } = payload;
            return {
                ...state,
                SERVICES_BOUGHT: {
                    services: services,
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncServicesBought.rejected]: (state) => {
            return { ...state, SERVICES_BOUGHT: { ...state.SERVICES_BOUGHT, status: STATUS.FAIL } }
        },
        //services bought count
        [fetchAsyncServicesRandom.pending]: (state) => {
            return { ...state, SERVICES_RANDOM: { ...state.SERVICES_RANDOM, status: STATUS.LOADING } }
        },
        [fetchAsyncServicesRandom.fulfilled]: (state, { payload }) => {
            const { services, page, totalItem } = payload;
            return {
                ...state,
                SERVICES_RANDOM: {
                    services: services,
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncServicesRandom.rejected]: (state) => {
            return { ...state, SERVICES_RANDOM: { ...state.SERVICES_RANDOM, status: STATUS.FAIL } }
        },
        //orgs favorite
        [fetchAsyncOrgsFavorite.pending]: (state) => {
            return { ...state, ORGS_FAVORITE: { ...state.ORGS_FAVORITE, status: STATUS.LOADING } }
        },
        [fetchAsyncOrgsFavorite.fulfilled]: (state, { payload }) => {
            const { orgs, page, totalItem } = payload;
            return {
                ...state,
                ORGS_FAVORITE: {
                    orgs: orgs,
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncOrgsFavorite.rejected]: (state) => {
            return { ...state, ORGS_FAVORITE: { ...state.ORGS_FAVORITE, status: STATUS.FAIL } }
        },
    }
})
const { actions } = homePageSlice;
export const { clearServicesPromo } = actions
export default homePageSlice.reducer;