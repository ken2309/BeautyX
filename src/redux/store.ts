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
import cateReducer from "./cate/cateSlice";
import comboReducer from "./org_combos/comboSlice";
import videosReducer from './video/videosSlice';
import appReducer from "./appointment/appSlice";

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
  CATE: cateReducer,
  COMBO: comboReducer,
  VID: videosReducer,
  APP: appReducer
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
