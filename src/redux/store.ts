import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import orgReducer from "./orgSlice";
import userReducer from './USER/userSlice';
import servicesBookReducer from './servicesBookSlice';
import userAddressReducer from './USER/userAddressSlice';
import orgCommentsReducer from './org/orgCommentsSlice';

const rootReducer = {
  carts: cartReducer,
  org: orgReducer,
  ORG_COMMENTS: orgCommentsReducer,
  SERVICES_BOOK: servicesBookReducer,
  USER: userReducer,
  ADDRESS: userAddressReducer
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
