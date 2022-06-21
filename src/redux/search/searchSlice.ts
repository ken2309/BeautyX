import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orgApi from '../../api/organizationApi';
import { STATUS } from '../status';
import productsApi from '../../api/productApi';
import servicePromoApi from '../../api/servicePromoApi';

export const fetchOrgsBySearch: any = createAsyncThunk(
    "SEARCH/fetchOrgsBySearch",
    async (values: any) => {
        const res = await orgApi.getOrgByKeyword(values);
        return {
            orgs: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page
        }
    }
)
export const fetchProductsBySearch: any = createAsyncThunk(
    "SEARCH/fetchProductsBySearch",
    async (values: any) => {
        const res = await productsApi.getProductsSingle(values);
        return {
            products: res.data.data.hits,
            totalItem: res.data.total,
            page: values.page
        }
    }
)
export const fetchServicesBySearch: any = createAsyncThunk(
    "SEARCH/fetchServicesBySearch",
    async (values: any) => {
        const res = await servicePromoApi.getByKeyword(values);
        return {
            services: res.data.data.hits,
            totalItem: res.data.total,
            page: values.page
        }
    }
)

const initialState = {
    open: false,
    keyword: "",
    HISTORY: [],
    ORGS: {
        orgs: [],
        page: 1,
        totalItem: 1,
        status: ""
    },
    SERVICES: {
        services: [],
        page: 1,
        totalItem: 1,
        status: ""
    },
    PRODUCTS: {
        products: [],
        page: 1,
        totalItem: 1,
        status: ""
    }
}
const searchSlice = createSlice({
    name: "SEARCH",
    initialState,
    reducers: {
        onToggleSearchCnt: (state, action) => {
            state.open = action.payload
        },
        onSetKeyword: (state, action) => {
            state.keyword = action.payload
        },

    },
    extraReducers: {
        [fetchOrgsBySearch.pending]: (state) => {
            return { ...state, ORGS: { ...state.ORGS, status: STATUS.LOADING } }
        },
        [fetchOrgsBySearch.fulfilled]: (state, { payload }) => {
            const { orgs, page, totalItem } = payload
            return {
                ...state,
                ORGS: {
                    orgs: orgs,
                    status: STATUS.SUCCESS,
                    totalItem: totalItem,
                    page: page
                }
            }
        },
        [fetchOrgsBySearch.rejected]: (state) => {
            return { ...state, ORGS: { ...state.ORGS, status: STATUS.FAIL } }
        },

        [fetchProductsBySearch.pending]: (state) => {
            return { ...state, PRODUCTS: { ...state.PRODUCTS, status: STATUS.LOADING } }
        },
        [fetchProductsBySearch.fulfilled]: (state, { payload }) => {
            const { products, page, totalItem } = payload
            return {
                ...state,
                PRODUCTS: {
                    products: products,
                    status: STATUS.SUCCESS,
                    totalItem: totalItem,
                    page: page
                }
            }
        },
        [fetchProductsBySearch.rejected]: (state) => {
            return { ...state, PRODUCTS: { ...state.PRODUCTS, status: STATUS.FAIL } }
        },

        [fetchServicesBySearch.pending]: (state) => {
            return { ...state, SERVICES: { ...state.SERVICES, status: STATUS.LOADING } }
        },
        [fetchServicesBySearch.fulfilled]: (state, { payload }) => {
            const { services, page, totalItem } = payload
            return {
                ...state,
                SERVICES: {
                    services: services,
                    status: STATUS.SUCCESS,
                    totalItem: totalItem,
                    page: page
                }
            }
        },
        [fetchServicesBySearch.rejected]: (state) => {
            return { ...state, SERVICES: { ...state.SERVICES, status: STATUS.FAIL } }
        }
    }
})
const { reducer, actions } = searchSlice;
export const { onToggleSearchCnt, onSetKeyword } = actions;
export default reducer;