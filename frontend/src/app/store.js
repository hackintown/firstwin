import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import wingoReducer from "../features/wingoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    wingo: wingoReducer,
  },
});

export default store;
