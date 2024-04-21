import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/IUser';

interface initialStateType
  extends Pick<
    IUser,
    'id' | 'email' | 'name' | 'imgUrl' | 'username' | 'statuses'
  > {
  isAuth: boolean;
  token: string;
}

const initialState = {
  isAuth: false,
} as initialStateType;

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState,
    logIn: (_, action: PayloadAction<Omit<initialStateType, 'isAuth'>>) => {
      const { username, token, id, imgUrl, email, name, statuses } =
        action.payload;

      return {
        isAuth: true,
        username,
        token,
        statuses,
        imgUrl,
        name,
        id,
        email,
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
