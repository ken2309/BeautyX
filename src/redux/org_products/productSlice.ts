import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productsApi from '../../api/productApi';
import commentsApi from '../../api/commentsApi';
import { STATUS } from '../status';
import favorites from '../../api/favorite';

export const fetchAsyncProductDetail: any = createAsyncThunk(
    "PRODUCT/fetchAsyncProductDetail",
    async (values: any) => {
        const res = await productsApi.getDetailById(values);
        return res.data.context
    }
)
export const fetchAsyncProductCmt: any = createAsyncThunk(
    "PRODUCT/fetchAsyncProductCmt",
    async (values: any) => {
        const res = await commentsApi.getComments(values);
        const payload = {
            comments: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page,
            product_id: parseInt(values.id)
        }
        return payload
    }
)
// post comment service
export const postAsyncProductComment: any = createAsyncThunk(
    "SERVICE/postAsyncProductComment",
    async (params: any) => {
        try {
            const res = await commentsApi.postComment(params.values);
            const payload = {
                comment: {
                    ...res.data.context,
                    user: params.user,
                },
            };
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
);
export const onFavoriteProduct: any = createAsyncThunk(
    "PRODUCT/onFavoriteProduct",
    async (values: any) => {
        const payload = {
            ...values.product,
            is_favorite: true,
            favorites_count: values.product.favorites_count + 1
        }
        await favorites.postFavoriteItem({
            org_id: values.org_id,
            product_id: values.product.id
        })
        return payload
    }
)
export const onDeleteFavorite: any = createAsyncThunk(
    "PRODUCT/onDeleteFavorite",
    async (values: any) => {
        const payload = {
            ...values.product,
            is_favorite: false,
            favorites_count: values.product.favorites_count - 1
        }
        await favorites.deleteFavoriteItem({
            org_id: values.org_id,
            product_id: values.product.id
        })
        return payload
    }
)
const initialState = {
    PRODUCT: {
        product: {},
        status: ""
    },
    COMMENTS: {
        product_id: null,
        comments: [],
        page: 1,
        totalItem: 1,
        status_cmt: ""
    }
}
const productSlice = createSlice({
    initialState,
    name: "PRODUCT",
    reducers: {

    },
    extraReducers: {
        [fetchAsyncProductDetail.pending]: (state) => {
            return { ...state, PRODUCT: { ...state.PRODUCT, status: STATUS.LOADING } }
        },
        [fetchAsyncProductDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    product: payload,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncProductDetail.rejected]: (state) => {
            return { ...state, PRODUCT: { ...state.PRODUCT, status: STATUS.FAIL } }
        },

        [fetchAsyncProductCmt.pending]: (state) => {
            return { ...state, COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING } }
        },
        [fetchAsyncProductCmt.fulfilled]: (state, { payload }) => {
            const { comments, totalItem, page, product_id } = payload;
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    comments: comments,
                    totalItem: totalItem,
                    page: page,
                    product_id: product_id,
                    status_cmt: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncProductCmt.rejected]: (state) => {
            return { ...state, COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.FAIL } }
        },

        [onFavoriteProduct.pending]: (state) => {
            return state
        },
        [onFavoriteProduct.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    ...state.PRODUCT,
                    product: payload
                }
            }
        },
        [onFavoriteProduct.pending]: (state) => {
            return state
        },

        [onDeleteFavorite.pending]: (state) => {
            return state
        },
        [onDeleteFavorite.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    ...state.PRODUCT,
                    product: payload
                }
            }
        },
        [onDeleteFavorite.pending]: (state) => {
            return state
        },
        // post comment product
        [postAsyncProductComment.pending]: (state, { payload }) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING },
            };
        },
        [postAsyncProductComment.fulfilled]: (state, { payload }) => {
            const { comment } = payload;
            return {
                ...state,
                COMMENTS: {
                    ...state.COMMENTS,
                    comments: [comment, ...state.COMMENTS.comments],
                    totalItem: state.COMMENTS.totalItem + 1,
                    status_cmt: STATUS.SUCCESS,
                },
            };
        },
        [postAsyncProductComment.rejected]: (state) => {
            return {
                ...state,
                status_cmt: STATUS.FAIL,
            };
        },
    }
})
// const { actions } = productSlice;
// export const {  } = actions;
export default productSlice.reducer;