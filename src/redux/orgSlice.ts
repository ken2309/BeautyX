import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orgApi from '../api/organizationApi';

export const fetchAsyncOrg: any = createAsyncThunk(
      "org/fetchAsyncOrg",
      async (a:any) => {
            console.log(a)
            const res = await orgApi.getAll();
            return res.data.context.data;
      }
)
const initialState = {
      org: {},
}
const orgSlice = createSlice({
      name: 'org',
      initialState,
      reducers: {

      },
      extraReducers: {
            [fetchAsyncOrg.pending]: () => {
                  // console.log('Loading...')
            },
            [fetchAsyncOrg.fulfilled]: (state, { payload }) => {
                  // console.log('Success')
                  return { ...state, org: payload }
            }
      }
})
export const getAllOrg = (state: any) => state.org.org
export default orgSlice.reducer