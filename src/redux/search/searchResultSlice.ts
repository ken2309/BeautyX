import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tab: 1
}
const searchResultSlice = createSlice({
    name: "SEARCH_RESULT",
    initialState,
    reducers: {
        onSetTabResult: (state, action) => {
            state.tab = action.payload
        }
    }
})
const { actions } = searchResultSlice;
export const { onSetTabResult } = actions;
export default searchResultSlice.reducer;