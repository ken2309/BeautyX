import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orgApi from '../../api/organizationApi';
import galleriesApi from '../../api/moboGalleriesApi';
import favorites from '../../api/favorite';
import { STATUS } from '../status'

export const fetchAsyncOrg: any = createAsyncThunk(
    "ORG/fetchAsyncOrg",
    async (sub_domain: any) => {
        try {
            const res = await orgApi.getOrgById(sub_domain);
            const payload = res.data.context;
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const fetchOrgGalleries: any = createAsyncThunk(
    "ORG/fetchOrgGalleries",
    async (org_id: any) => {
        try {
            const res = await galleriesApi.getByOrgId(org_id);
            const payload = {
                org_id: org_id,
                galleries: res.data.context.data
            };
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const onFavoriteOrg: any = createAsyncThunk(
    "ORG/onFavoriteOrg",
    async (org: any) => {
        await favorites.postFavorite(org?.id)
        const payload = org.favorites_count + 1
        return payload
    }
)
export const onDeleteFavoriteOrg: any = createAsyncThunk(
    "ORG/onDeleteFavoriteOrg",
    async (org: any) => {
        await favorites.deleteFavorite(org?.id)
        const payload = org.favorites_count - 1
        return payload
    }
)
const initialState = {
    org: {},
    status: '',
    tab: 1,
    GALLERIES: {
        galleries: [],
        org_id: null,
        status: ''
    }
}
const orgSlice = createSlice({
    initialState,
    name: "ORG",
    reducers: {
        onActiveTab: (state, action) => {
            return {
                ...state,
                tab: action.payload
            }
        }
    },
    extraReducers: {
        [fetchAsyncOrg.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [fetchAsyncOrg.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org: payload,
                status: STATUS.SUCCESS
            }
        },
        [fetchAsyncOrg.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        },
        //get galleries by org id,
        [fetchOrgGalleries.pending]: (state) => {
            return {
                ...state,
                GALLERIES: { ...state.GALLERIES, status: STATUS.LOADING }
            }
        },
        [fetchOrgGalleries.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                GALLERIES: {
                    galleries: payload.galleries,
                    org_id: payload.org_id,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchOrgGalleries.rejected]: (state) => {
            return {
                ...state,
                GALLERIES: { ...state.GALLERIES, status: STATUS.FAIL }
            }
        },
        // favorites org
        [onFavoriteOrg.pending]: (state) => {
            return state
        },
        [onFavoriteOrg.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org: {
                    ...state.org,
                    is_favorite: true,
                    favorites_count: payload
                }
            }
        },
        [onFavoriteOrg.rejected]: (state) => {
            return state
        },
        //remove favorite org
        [onDeleteFavoriteOrg.pending]: (state) => {
            return state
        },
        [onDeleteFavoriteOrg.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                org: {
                    ...state.org,
                    is_favorite: false,
                    favorites_count: payload
                }
            }
        },
        [onDeleteFavoriteOrg.rejected]: (state) => {
            return state
        }
    }
})
const { actions } = orgSlice;
export const { onActiveTab } = actions;
export default orgSlice.reducer;