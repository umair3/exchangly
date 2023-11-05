import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserProfileAPI } from "../../services/Api/User";

export interface IUserState {
  isAuthenticated: boolean;
  profile: null | IUserProfileAPI;
}

const initialState: IUserState = {
  isAuthenticated: false,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<IUserProfileAPI>) => {
      state.profile = action.payload;
      state.isAuthenticated = action.payload ? true : false;
    },
    removeCurrentUser: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCurrentUser, removeCurrentUser } = userSlice.actions;

export default userSlice.reducer;
