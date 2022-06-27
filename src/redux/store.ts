import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import homeReducer from "./home/homeSlice";
import userReducer from './USER/userSlice';
import servicesBookReducer from './servicesBookSlice';
import userAddressReducer from './USER/userAddressSlice';
import orgReducer from './org/orgSlice';
import orgCommentsReducer from './org/orgCommentsSlice';
import orgServicesReducer from './org_services/orgServivesSlice';
import orgProductsReducer from './org_products/orgProductsSlice';
import orgSpecialReducer from './org_specials/orgSpecialSlice';
import combosReducer from './org_combos/orgCombosSlice';
import orgDiscountsReducer from './org_discounts/orgDiscountsSlice';
import serviceReducer from './org_services/serviceSlice';
import productReducer from './org_products/productSlice';
import loginFlatFromReducer from "./loginFlatForm/loginFlatFrom";
import paymentsReducer from "./payments/paymentSlice";
import searchReducer from './search/searchSlice';
import blogReducer from "./blog/blogSlice";
import cateReducer from "./CateTree/cateTreeSlice";
import comboReducer from "./org_combos/comboSlice";
import videosReducer from './video/videosSlice';
import appReducer from "./appointment/appSlice";
import commentReducer from './commentSlice';
import orderReducer from './order/orderSlice';

const rootReducer = {
  carts: cartReducer,
  HOME: homeReducer,
  LOGIN: loginFlatFromReducer,
  ORG_COMMENTS: orgCommentsReducer,
  SERVICES_BOOK: servicesBookReducer,
  USER: userReducer,
  ORG: orgReducer,
  ORG_SERVICES: orgServicesReducer,
  SERVICE: serviceReducer,
  PRODUCT: productReducer,
  ORG_COMBOS: combosReducer,
  ORG_PRODUCTS: orgProductsReducer,
  ORG_SPECIALS: orgSpecialReducer,
  ORG_DISCOUNTS: orgDiscountsReducer,
  ADDRESS: userAddressReducer,
  PAYMENT: paymentsReducer,
  BLOG: blogReducer,
  SEARCH: searchReducer,
  CATE_TREE: cateReducer,
  COMBO: comboReducer,
  VID: videosReducer,
  APP: appReducer,
  COMMENT: commentReducer,
  ORDER: orderReducer
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
