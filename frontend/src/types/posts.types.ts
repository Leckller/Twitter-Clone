import { User } from "./users.types"

export interface Post {
  id: number,
  userId: number,
  posted: Date,
  content: string,
}

export interface UserPosts extends User {
  userPost: Post[]
}

export interface PostUser {
  postUser: {
    tagName: string,
    customName: string,
    picture: string
  }
}

export interface PostAndUser extends Post, PostUser { }