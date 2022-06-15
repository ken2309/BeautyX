import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../../api/productApi";
import commentsApi from "../../api/commentsApi";
import { STATUS } from "../status";
import favorites from "../../api/favorite";

// get product detail
export const fetchAsyncProductDetail: any = createAsyncThunk(
    "PRODUCT/fetchAsyncProductDetail",
    async (values: any) => {
        const res = await productsApi.getDetailById(values);
        return res.data.context;
    }
);

// get product recomment
export const fetchAsynProductRecomment: any = createAsyncThunk(
    "PRODUCT/fetchAsynProductRecomment",
    async (values: any) => {
        const res = await productsApi.getByOrg_id(values);
        const payload = {
            products: res.data.context.data,
            cate_id: values.cate_id,
        };
        return payload;
    }
);

// get comment product
export const fetchAsyncProductCmt: any = createAsyncThunk(
    "PRODUCT/fetchAsyncProductCmt",
    async (values: any) => {
        const res = await commentsApi.getComments(values);
        const payload = {
            comments: res.data.context.data,
            totalItem: res.data.context.total,
            page: values.page,
            product_id: parseInt(values.id),
        };
        return payload;
    }
);
// post comment product
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
// post favorite product
export const onFavoriteProduct: any = createAsyncThunk(
    "PRODUCT/onFavoriteProduct",
    async (values: any) => {
        const payload = {
            ...values.product,
            is_favorite: true,
            favorites_count: values.product.favorites_count + 1,
        };
        await favorites.postFavoriteItem({
            org_id: values.org_id,
            product_id: values.product.id,
        });
        return payload;
    }
);
// delete favorite product
export const onDeleteFavorite: any = createAsyncThunk(
    "PRODUCT/onDeleteFavorite",
    async (values: any) => {
        const payload = {
            ...values.product,
            is_favorite: false,
            favorites_count: values.product.favorites_count - 1,
        };
        await favorites.deleteFavoriteItem({
            org_id: values.org_id,
            product_id: values.product.id,
        });
        return payload;
    }
);
const initialState = {
    PRODUCT: {
        product: {},
        status: "",
    },
    PRODUCT_REC: {
        products: [],
        cate_id: null,
        status: "",
    },
    COMMENTS: {
        product_id: null,
        comments: [],
        page: 1,
        totalItem: 1,
        status_cmt: "",
    },
};
const productSlice = createSlice({
    initialState,
    name: "PRODUCT",
    reducers: {},
    extraReducers: {
        // get product detail
        [fetchAsyncProductDetail.pending]: (state) => {
            return {
                ...state,
                PRODUCT: { ...state.PRODUCT, status: STATUS.LOADING },
            };
        },
        [fetchAsyncProductDetail.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    product: payload,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncProductDetail.rejected]: (state) => {
            return {
                ...state,
                PRODUCT: { ...state.PRODUCT, status: STATUS.FAIL },
            };
        },
        // get product comment
        [fetchAsyncProductCmt.pending]: (state) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.LOADING },
            };
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
                    status_cmt: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsyncProductCmt.rejected]: (state) => {
            return {
                ...state,
                COMMENTS: { ...state.COMMENTS, status_cmt: STATUS.FAIL },
            };
        },
        // favorite product
        [onFavoriteProduct.pending]: (state) => {
            return state;
        },
        [onFavoriteProduct.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    ...state.PRODUCT,
                    product: payload,
                },
            };
        },
        [onFavoriteProduct.pending]: (state) => {
            return state;
        },
        // delete favorite
        [onDeleteFavorite.pending]: (state) => {
            return state;
        },
        [onDeleteFavorite.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT: {
                    ...state.PRODUCT,
                    product: payload,
                },
            };
        },
        [onDeleteFavorite.pending]: (state) => {
            return state;
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
        // get product recomment
        [fetchAsynProductRecomment.pending]: (state) => {
            return {
                ...state,
                PRODUCT_REC: {
                    ...state.PRODUCT_REC,
                    status: STATUS.LOADING,
                },
            };
        },
        [fetchAsynProductRecomment.fulfilled]: (state, { payload }) => {
            return {
                ...state,
                PRODUCT_REC: {
                    products: payload.products,
                    cate_id: payload.cate_id,
                    status: STATUS.SUCCESS,
                },
            };
        },
        [fetchAsynProductRecomment.rejected]: (state) => {
            return {
                ...state,
                PRODUCT_REC: {
                    ...state.PRODUCT_REC,
                    status: STATUS.FAIL,
                },
            };
        },
    },
});
// const { actions } = productSlice;
// export const {  } = actions;
export default productSlice.reducer;
