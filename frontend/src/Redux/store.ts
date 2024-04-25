import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Slices/counterSlice';
import tokenReducer from './Slices/TokenSlice';
import userReducer from './Slices/UserSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenReducer,
    user: userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself

export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type AppDispatch = typeof store.dispatch