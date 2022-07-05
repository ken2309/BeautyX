import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orgApi from '../../api/organizationApi';
import { IOrganization } from '../../interface/organization'
import { STATUS } from '../status';

export const fetchAsyncOrgsByFilter: any = createAsyncThunk(
    "SEARCH_RESULT/fetchAsyncOrgsByTag",
    async (values: any) => {
        const res = await orgApi.getAll(values);
        return {
            orgs: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page
        }
    }
)

interface IInitialState {
    tab: any,
    RE_ORGS: {
        orgs: IOrganization[],
        status: string,
        page: number,
        totalItem: number
    }
}

const initialState: IInitialState = {
    tab: null,
    RE_ORGS: {
        orgs: [],
        status: "",
        page: 1,
        totalItem: 1
    }
}
const searchResultSlice = createSlice({
    name: "SEARCH_RESULT",
    initialState,
    reducers: {
        onSetTabResult: (state, action) => {
            state.tab = action.payload
        },
    },
    extraReducers: {
        [fetchAsyncOrgsByFilter.pending]: (state) => {
            return { ...state, RE_ORGS: { ...state.RE_ORGS, status: STATUS.LOADING } }
        },
        [fetchAsyncOrgsByFilter.fulfilled]: (state, { payload }) => {
            const { orgs, page, totalItem } = payload
            return {
                ...state,
                RE_ORGS: {
                    ...state.RE_ORGS,
                    orgs: orgs,
                    page: page,
                    totalItem: totalItem
                }
            }
        },
        [fetchAsyncOrgsByFilter.rejected]: (state) => {
            return { ...state, RE_ORGS: { ...state.RE_ORGS, status: STATUS.FAIL } }
        },
    }
})
const { actions } = searchResultSlice;
export const { onSetTabResult } = actions;
export default searchResultSlice.reducer;