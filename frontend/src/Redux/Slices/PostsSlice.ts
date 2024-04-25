import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostUser } from "../../types/posts.types";

const initialState: {
  global: PostUser[],
  followers: PostUser[],
} = {
  followers: [],
  global: [],
}

const PostSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setGlobal: (state, action: PayloadAction<PostUser[]>) => {
      if (action.payload.some(post => state.global.some(statePost => statePost.id === post.id))) {
        return;
      }
      state.global = [...action.payload, ...state.global]
    },
    setFollowers: (state, action: PayloadAction<PostUser[]>) => {
      if (action.payload.some(post => state.followers.some(statePost => statePost.id === post.id))) {
        return;
      }
      state.followers = [...state.followers, ...action.payload]
    },
  }
});

export const { setFollowers, setGlobal } = PostSlice.actions;

export default PostSlice.reducer;