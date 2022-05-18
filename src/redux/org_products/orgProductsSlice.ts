import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsApi from '../../api/productApi';
import categoryApi from '../../api/categoryApi';
import { STATUS } from '../status';
import { Product } from '../../interface/product'

interface IPRODUCTS {
    products: Product[],
    page: number,
    totalItem: number,
    status_pr: string
}
interface ICATE {
    categories: [],
    status: string
}
interface IINITIALSTATE {
    CATE: ICATE,
    PRODUCTS: IPRODUCTS
}

export const fetchAsyncCateProducts: any = createAsyncThunk(
    "ORG_PRODUCTS/fetchAsyncCateProducts",
    async (org_id: any) => {
        const res = await categoryApi.getByOrgId(org_id);
        const payload = res.data.context.data
        return payload
    }
)
export const fetchAsyncProducts: any = createAsyncThunk(
    "ORG_PRODUCTS/fetchAsyncProducts",
    async (values: any) => {
        const res = await productsApi.getByOrgId_cateId(values);
        const payload = {
            products: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total,
        }
        return payload
    }
)
const initialState: IINITIALSTATE = {
    CATE: {
        categories: [],
        status: ''
    },
    PRODUCTS: {
        products: [],
        totalItem: 1,
        page: 1,
        status_pr: ''
    }
}
const orgProductsSlice = createSlice({
    initialState,
    name: "ORG_PRODUCTS",
    reducers: {
        clearProducts: (state) => {
            return {
                ...state,
                PRODUCTS: {
                    ...state.PRODUCTS,
                    products: [],
                    page: 1
                }
            }
        }
    },
    extraReducers: {
        //get services cate org
        [fetchAsyncCateProducts.pending]: (state) => {
            return { ...state, CATE: { ...state.CATE, status: STATUS.LOADING } }
        },
        [fetchAsyncCateProducts.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                CATE: { categories: payload, status: STATUS.SUCCESS }
            }
        },
        [fetchAsyncCateProducts.rejected]: (state) => {
            return {
                ...state, CATE: { ...state.CATE, status: STATUS.FAIL }
            }
        },
        //get prducts org
        [fetchAsyncProducts.pending]: (state) => {
            return {
                ...state, PRODUCTS: {
                    ...state.PRODUCTS,
                    //status_ser: STATUS.LOADING
                }
            }
        },
        [fetchAsyncProducts.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCTS: {
                    products: [...state.PRODUCTS.products, ...payload.products],
                    totalItem: payload.totalItem,
                    page: payload.page,
                    status_pr: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncProducts.rejected]: (state) => {
            return {
                ...state,
                PRODUCTS: { ...state.PRODUCTS, status_pr: STATUS.FAIL }
            }
        }
    }
})
const { actions } = orgProductsSlice;
export const { clearProducts } = actions;
export default orgProductsSlice.reducer;