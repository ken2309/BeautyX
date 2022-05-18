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
import loginFlatFromReducer from "./loginFlatForm/loginFlatFrom";

const rootReducer = {
  carts: cartReducer,
  HOME: homeReducer,
  LOGIN: loginFlatFromReducer,
  ORG_COMMENTS: orgCommentsReducer,
  SERVICES_BOOK: servicesBookReducer,
  USER: userReducer,
  ORG: orgReducer,
  ORG_SERVICES: orgServicesReducer,
  ORG_PRODUCTS: orgProductsReducer,
  ORG_SPECIALS: orgSpecialReducer,
  ADDRESS: userAddressReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
