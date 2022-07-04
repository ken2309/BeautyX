import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orgApi from '../../api/organizationApi';

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
    tab: number,
}

const initialState: IInitialState = {
    tab: 1,
}
const searchResultSlice = createSlice({
    name: "SEARCH_RESULT",
    initialState,
    reducers: {
        onSetTabResult: (state, action) => {
            state.tab = action.payload
        },
    },
})
const { actions } = searchResultSlice;
export const { onSetTabResult } = actions;
export default searchResultSlice.reducer;