import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAddressApi from '../../api/userAddressApi';
import { STATUS } from '../status';
import { IUserAddress } from '../../interface/userAddress';

interface IInitialState {
    address: IUserAddress[],
    address_default:any,
    status: any,
    status_up: any,
}

export const fetchAsyncUserAddress: any = createAsyncThunk(
    "ADDRESS/fetchAsyncUserAddress",
    async () => {
        try {
            const res = await userAddressApi.getAddress();
            const payload = res.data.context;
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const removeAsyncUserAddress: any = createAsyncThunk(
    "ADDRESS/removeAsyncUserAddress",
    async (address_id: number) => {
        try {
            await userAddressApi.deleteAddress(address_id);
            const payload = address_id
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const postAsyncAddress: any = createAsyncThunk(
    "ADDRESS/postAsyncAddress",
    async (address) => {
        try {
            const res = await userAddressApi.postAddress(address);
            const payload = res.data.context;
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
export const updateAsyncAddress: any = createAsyncThunk(
    "ADDRESS/updateAsyncAddress",
    async (address: any) => {
        try {
            await userAddressApi.updateAddress(address)
            const payload = {
                ...address,
                is_default: true
            }
            return payload
        } catch (error) {
            console.log(error)
        }
    }
)
const initialState: IInitialState = {
    address: [],
    address_default:null,
    status: null,
    status_up: null,
}
const userAddressSlice = createSlice({
    initialState,
    name: "ADDRESS",
    reducers: {
        removeAddress: (state, action) => {
            state.address = state.address.filter((item: any) => item.id !== action.payload.id)
        },
        removeDefaultItem: (state, action) => {
            state.address_default = action.payload
            // const iIndex = state.address.findIndex((item: any) =>
            //     item.id === action.payload.id
            // );
            // state.address[iIndex].is_default = false
            //const old_address = { ...action.payload, is_default: false }
            //const itemIndex = state.address.findIndex((item: any) => item.id === action.payload.id);
            //state.address = state.address.fill(old_address, itemIndex, itemIndex + 1)
        }
    },
    extraReducers: {
        [fetchAsyncUserAddress.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [fetchAsyncUserAddress.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                address_default: payload.find((i:IUserAddress) => i.is_default === true),
                address: payload,
                status: STATUS.SUCCESS
            }
        },
        [fetchAsyncUserAddress.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        },

        [removeAsyncUserAddress.pending]: (state) => {
            return { ...state, status_up: STATUS.LOADING }
        },
        [removeAsyncUserAddress.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                address: state.address.filter((item: any) => item.id !== payload),
                status_up: STATUS.SUCCESS
            }
        },
        [removeAsyncUserAddress.rejected]: (state) => {
            return { ...state, status_up: STATUS.FAIL }
        },
        //post address
        [postAsyncAddress.pending]: (state) => {
            return { ...state, status_up: STATUS.LOADING }
        },
        [postAsyncAddress.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                address_default : payload,
                address: [payload, ...state.address,],
                status_up: STATUS.SUCCESS
            }
        },
        [postAsyncAddress.rejected]: (state) => {
            return { ...state, status_up: STATUS.FAIL }
        },
        //updateAddress
        [updateAsyncAddress.pending]: (state) => {
            return { ...state, status_up: STATUS.LOADING }
        },
        [updateAsyncAddress.fulfilled]: (state, { payload }) => {
            //const itemIndex = state.address.findIndex((item: any) => item.id === payload.id);
            //const arr = state.address.filter((item: any, index: number) => index !== itemIndex);
            return {
                ...state,
                address_default: payload,
                //address: [payload, ...arr],
                status_up: STATUS.SUCCESS
            }
        },
        [updateAsyncAddress.rejected]: (state) => {
            return { ...state, status_up: STATUS.FAIL }
        }

    }
})
const { actions } = userAddressSlice;
export const { removeAddress, removeDefaultItem } = actions
export default userAddressSlice.reducer;
