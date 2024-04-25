import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface Token {
  token: string
}

const initialState: Token = {
  token: ''
}

export const tokenSlice = createSlice({
  name: 'Token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  }
})

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;