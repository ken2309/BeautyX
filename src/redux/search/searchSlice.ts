import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    open: false
}
const searchSlice = createSlice({
    name: "SEARCH",
    initialState,
    reducers: {
        onToggleSearchCnt: (state, action) => {
            state.open = action.payload
        }
    }
})
const { reducer, actions } = searchSlice;
export const { onToggleSearchCnt } = actions;
export default reducer;