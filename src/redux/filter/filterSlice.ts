import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    FILTER_PROMO: {
        id: 2,
        query: "-discount_percent"
    }
}
const filterSlice = createSlice({
    name: "FILTER",
    initialState,
    reducers: {
        onSetFilterPromo: (state, action) => {
            state.FILTER_PROMO.id = action.payload.id;
            state.FILTER_PROMO.query = action.payload.query
        }
    }
})
const { actions } = filterSlice;
export const { onSetFilterPromo } = actions;
export default filterSlice.reducer;