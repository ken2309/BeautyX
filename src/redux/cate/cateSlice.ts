import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orgApi from '../../api/organizationApi';
import { STATUS } from '../status'

export const fetchAsyncOrgCate: any = createAsyncThunk(
    "CATE/fetchAsyncOrgCate",
    async (values: any) => {
        try {
            const res = await orgApi.getOrgsByTag(values);
            const payload = {
                orgs: res.data.context.data,
                total: res.data.context.total,
                page: values.page
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
const initialState = {
    CATE: null,
    ORGS: {
        orgs: [],
        page: 1,
        totalItem: 1,
        status_org: ""
    }
}
const cateSlice = createSlice({
    name: "CATE",
    initialState,
    reducers: {
        onChooseCate: (state, action) => {
            state.CATE = action.payload
        }
    },
    extraReducers: {
        [fetchAsyncOrgCate.pending]: (state) => {
            return { ...state, ORGS: { ...state.ORGS, status_org: STATUS.LOADING } }
        },
        [fetchAsyncOrgCate.fulfilled]: (state, { payload }) => {
            const { orgs, total, page } = payload;
            return {
                ...state,
                ORGS: {
                    ...state.ORGS,
                    orgs: orgs,
                    page: page,
                    totalItem: total,
                    status_org: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncOrgCate.pending]: (state) => {
            return { ...state, ORGS: { ...state.ORGS, status_org: STATUS.FAIL } }
        },
    }
})
const { actions } = cateSlice;
export const { onChooseCate } = actions;
export default cateSlice.reducer;