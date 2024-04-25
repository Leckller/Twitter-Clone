import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserFields } from "../../types/users.types";

const initialState: Omit<User, 'id'> = {
  customName: '',
  description: '',
  email: '',
  password: '',
  picture: '',
  tagName: '',
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserByField: (state, action: PayloadAction<{ field: UserFields, value: string }>) => {
      state[action.payload.field] = action.payload.value
    },
    setUser: (state, action: PayloadAction<Omit<User, 'id'>>) => {
      state = action.payload
    }
  }
});

export const { setUserByField, setUser } = UserSlice.actions;

export default UserSlice.reducer;