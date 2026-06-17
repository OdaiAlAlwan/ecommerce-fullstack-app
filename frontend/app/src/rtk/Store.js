import { configureStore } from "@reduxjs/toolkit";

import Productlist from "./slices/Product-slice";
import CategroyList from "./slices/Categroy-slice";

import AuthUserSlice from "./slices/AuthUser-slice";
import UsersSlice from "./slices/User-slice";
import  Cartlist  from "./slices/Cart-slice";
const store = configureStore({
  reducer: {
    auth: AuthUserSlice,
    user: UsersSlice,
    products : Productlist,
    categroy : CategroyList,
    cart : Cartlist,
  },
});

export default store;
