import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginApiResponse } from "../../api/auth";

const initialState: LoginApiResponse["data"] = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAccessToken: (
      state,
      action: PayloadAction<string | undefined | null>
    ) => {
      state.accessToken = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
      state.accessToken = null;
    },
  },
});
export const { updateAccessToken, updateUserProfile, logout } =
  authSlice.actions;

export default authSlice.reducer;
