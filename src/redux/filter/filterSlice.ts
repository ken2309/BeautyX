import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    FILTER_PROMO: {
        id: number,
        query: string
    },
    FILTER_ORG: {
        tags: any[],
        province_code: any,
        district_code: any,
        min_price: any,
        max_price: any,
        sort: any,
        location: any
    }
}

const initialState: IInitialState = {
    FILTER_PROMO: {
        id: 2,
        query: "-discount_percent"
    },
    FILTER_ORG: {
        tags: [],
        province_code: null,
        district_code: null,
        min_price: null,
        max_price: null,
        sort: null,
        location: null
    }
}
const filterSlice = createSlice({
    name: "FILTER",
    initialState,
    reducers: {
        onSetFilterPromo: (state, action) => {
            state.FILTER_PROMO.id = action.payload.id;
            state.FILTER_PROMO.query = action.payload.query
        },
        onSetTagsOrg: (state, action) => {
            const iIndex = state.FILTER_ORG.tags.findIndex((item: any) =>
                item === action.payload
            );
            if (iIndex >= 0) {
                const newTags = state.FILTER_ORG.tags.filter((i: any) => i !== action.payload)
                state.FILTER_ORG.tags = newTags
            } else {
                state.FILTER_ORG.tags.push(action.payload)
            }
        },
        onSetSortOrg:(state, action)=>{
            state.FILTER_ORG.sort = action.payload
        },
        //onSetProvinceOrg:(state,act)
    }
})
const { actions } = filterSlice;
export const {
    onSetFilterPromo,
    onSetTagsOrg,
    onSetSortOrg
} = actions;
export default filterSlice.reducer;