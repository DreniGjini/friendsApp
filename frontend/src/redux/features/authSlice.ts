import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  value: {
    username: string;
    isAuth: boolean;
    token: string;
  };
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
    token: ""
  },
} as initialStateType;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (_, action: PayloadAction<{username: string; token: string;}>) => {
      const {username, token} = action.payload;
      return {
        value: {
          isAuth: true,
          username,
          token
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
