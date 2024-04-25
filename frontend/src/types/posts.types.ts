
export interface Post {
  id: number,
  userId: number,
  posted: Date,
  content: string,
}


export interface PostUser extends Post {
  postUser: {
    tagName: string,
    customName: string,
    picture: string
  }
}