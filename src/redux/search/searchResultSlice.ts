import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orgApi from "../../api/organizationApi";
import servicePromoApi from "../../api/servicePromoApi";
import productsApi from "../../api/productApi";
import { IOrganization } from "../../interface/organization";
import { IServicePromo } from "../../interface/servicePromo";
import { IProductPromo } from "../../interface/productPromo";
import { STATUS } from "../status";

export const fetchAsyncOrgsByFilter: any = createAsyncThunk(
    "SEARCH_RESULT/fetchAsyncOrgsByTag",
    async (values: any) => {
        const res = await orgApi.getAll(values);
        return {
            orgs: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page,
        };
    }
);
export const fetchServicesByFilter: any = createAsyncThunk(
    "SEARCH_RESULT/fetchServicesByFilter",
    async (values: any) => {
        const res = await servicePromoApi.getServicesPromo(values);
        return {
            services: res.data.data.hits,
            totalItem: res.data.total,
            page: values.page,
        };
    }
);
export const fetchProductsByFilter: any = createAsyncThunk(
    "SEARCH_RESULT/fetchProductsByFilter",
    async (values: any) => {
        const res = await productsApi.getProductsAll(values);
        return {
            products: res.data.data.hits,
            totalItem: res.data.total,
            page: values.page,
        };
    }
);

interface IInitialState {
    tab: any;
    RE_ORGS: {
        orgs: IOrganization[];
        status: string;
        page: number;
        totalItem: number;
    };
    RE_SERVICES: {
        services: IServicePromo[];
        status: string;
        page: number;
        totalItem: number;
    };
    RE_PRODUCTS: {
        products: IProductPromo[];
        status: string;
        page: number;
        totalItem: number;
    };
}

const initialState: IInitialState = {
    tab: null,
    RE_ORGS: {
        orgs: [],
        status: "",
        page: 1,
        totalItem: 1,
    },
    RE_SERVICES: {
        services: [],
        status: "",
        page: 1,
        totalItem: 1,
    },
    RE_PRODUCTS: {
        products: [],
        status: "",
        page: 1,
        totalItem: 1,
    },
};
const searchResultSlice = createSlice({
    name: "SEARCH_RESULT",
    initialState,
    reducers: {
        onSetTabResult: (state, action) => {
            state.tab = action.payload;
        },
        onSetEmptyOrgs: (state) => {
            state.RE_ORGS.orgs = [];
            state.RE_ORGS.page = 1;
            state.RE_ORGS.status = "";
        },
        onSetEmptyServices: (state) => {
            state.RE_SERVICES.services = [];
            state.RE_SERVICES.page = 1;
            state.RE_SERVICES.status = "";
        },
        onSetEmptyProducts: (state) => {
            state.RE_PRODUCTS.products = [];
            state.RE_PRODUCTS.page = 1;
            state.RE_PRODUCTS.status = "";
        },
    },
    extraReducers: {
        [fetchAsyncOrgsByFilter.pending]: (state) => {
            return {
                ...state,
                RE_ORGS: { ...state.RE_ORGS, status: STATUS.LOADING },
            };
        },
        [fetchAsyncOrgsByFilter.fulfilled]: (state, { payload }) => {
            const { orgs, page, totalItem } = payload;
            return {
                ...state,
                RE_ORGS: {
                    ...state.RE_ORGS,
                    orgs: [...state.RE_ORGS.orgs, ...orgs],
                    //orgs: orgs,
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncOrgsByFilter.rejected]: (state) => {
            return {
                ...state,
                RE_ORGS: { ...state.RE_ORGS, status: STATUS.FAIL },
            };
        },

        [fetchServicesByFilter.pending]: (state) => {
            return {
                ...state,
                RE_SERVICES: { ...state.RE_SERVICES, status: STATUS.LOADING },
            };
        },
        [fetchServicesByFilter.fulfilled]: (state, { payload }) => {
            const { services, page, totalItem } = payload;
            return {
                ...state,
                RE_SERVICES: {
                    services: [...state.RE_SERVICES.services, ...services],
                    status: STATUS.SUCCESS,
                    page: page,
                    totalItem: totalItem,
                },
            };
        },
        [fetchServicesByFilter.rejected]: (state) => {
            return {
                ...state,
                RE_SERVICES: { ...state.RE_SERVICES, status: STATUS.FAIL },
            };
        },

        [fetchProductsByFilter.pending]: (state) => {
            return {
                ...state,
                RE_PRODUCTS: { ...state.RE_PRODUCTS, status: STATUS.LOADING },
            };
        },
        [fetchProductsByFilter.fulfilled]: (state, { payload }) => {
            const { products, page, totalItem } = payload;
            return {
                ...state,
                RE_PRODUCTS: {
                    products: [...state.RE_PRODUCTS.products, ...products],
                    status: STATUS.SUCCESS,
                    page: page,
                    totalItem: totalItem,
                },
            };
        },
        [fetchProductsByFilter.rejected]: (state) => {
            return {
                ...state,
                RE_PRODUCTS: { ...state.RE_PRODUCTS, status: STATUS.FAIL },
            };
        },
    },
});
const { actions } = searchResultSlice;
export const {
    onSetTabResult,
    onSetEmptyOrgs,
    onSetEmptyProducts,
    onSetEmptyServices,
} = actions;
export default searchResultSlice.reducer;
