import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post } from "../../types/posts.types";

const initialState: {
  global: Omit<Post, 'id'>[],
  followers: Omit<Post, 'id'>[],
} = {
  followers: [],
  global: [],
}

const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setGlobal: (state, action: PayloadAction<Omit<Post, 'id'>[]>) => {
      state.global = [...state.global, ...action.payload]
    },
    setFollowers: (state, action: PayloadAction<Omit<Post, 'id'>[]>) => {
      state.followers = [...state.followers, ...action.payload]
    },
  }
});

export const { setFollowers, setGlobal } = PostSlice.actions;

export default PostSlice.reducer;