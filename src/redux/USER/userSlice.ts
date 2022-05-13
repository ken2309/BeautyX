import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authentication from '../../api/authApi';

export const fetchAsyncUser: any = createAsyncThunk(
    "USER/fetchAsyncUser",
    async () => {
        const res = await authentication.getUserProfile();
        return res?.data.context
    }
)
const initialState = {
    USER: null,
    loading: true
}
const userSlice = createSlice({
    initialState,
    name: "USER",
    reducers: {
        putUser: (state, action) => {
            state.USER = action.payload
        }
    },
    extraReducers: {
        [fetchAsyncUser.pending]: (state) => {
            return { ...state, loading: true }
        },
        [fetchAsyncUser.fulfilled]: (state, { payload }) => {
            return { ...state, USER: payload, loading: false }
        }
    }
})
// export const getUserProfile = (state: any) => state
const { actions } = userSlice;
export const { putUser } = actions;
export default userSlice.reducer