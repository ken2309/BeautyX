import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import serviceApi from '../../api/serviceApi';
import productsApi from '../../api/productApi';
import { STATUS } from '../status'

export const fetchAsyncServicesSpecial: any = createAsyncThunk(
    "ORG_SPECIALS/fetchAsyncServicesSpecial",
    async (values: any) => {
        const res = await serviceApi.getSpecialPriceByOrg_id({
            page: values.page,
            org_id: values.org_id
        })
        const payload = {
            services_special: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total,
        }
        return payload
    }
)
export const fetchProductsSpecial: any = createAsyncThunk(
    "ORG/fetchProductsSpecial",
    async (values: any) => {
        const res = await productsApi.getSpecialPriceByOrg_id({
            page: values.page,
            org_id: values.org_id
        })
        const payload = {
            products_special: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total
        }
        return payload
    }
)

const initialState = {
    org_id: null,
    SERVICES_SPECIAL: {
        services_special: [],
        page: 1,
        totalItem: 1,
        status_ser: ''
    },
    PRODUCTS_SPECIAL: {
        products_special: [],
        page: 1,
        totalItem: 1,
        status_pr: ''
    }
}
const orgSpecialSlice = createSlice({
    initialState,
    name: "ORG_SPECIALS",
    reducers: {
        onSaveOrgId: (state, { payload }) => {
            state.org_id = payload
        }
    },
    extraReducers: {
        [fetchAsyncServicesSpecial.pending]: (state) => {
            return {
                ...state,
                SERVICES_SPECIAL: { ...state.SERVICES_SPECIAL, status_ser: STATUS.LOADING }
            }
        },
        [fetchAsyncServicesSpecial.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                SERVICES_SPECIAL: {
                    services_special: payload.services_special,
                    page: payload.page,
                    totalItem: payload.totalItem,
                    status_ser: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncServicesSpecial.rejected]: (state) => {
            return {
                ...state,
                SERVICES_SPECIAL: { ...state.SERVICES_SPECIAL, status_ser: STATUS.FAIL }
            }
        },
        //products
        [fetchProductsSpecial.pending]: (state) => {
            return {
                ...state,
                PRODUCTS_SPECIAL: { ...state.PRODUCTS_SPECIAL, status_pr: STATUS.LOADING }
            }
        },
        [fetchProductsSpecial.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCTS_SPECIAL: {
                    products_special: payload.products_special,
                    page: payload.page,
                    totalItem: payload.totalItem,
                    status_pr: STATUS.SUCCESS
                }
            }
        },
        [fetchProductsSpecial.rejected]: (state) => {
            return {
                ...state,
                PRODUCTS_SPECIAL: { ...state.PRODUCTS_SPECIAL, status_pr: STATUS.FAIL }
            }
        }
    }
})
const { actions } = orgSpecialSlice;
export const { onSaveOrgId } = actions;
export default orgSpecialSlice.reducer;