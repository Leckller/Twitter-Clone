export type Comment = {
  id: number,
  content: string,
  commented: Date,
  likes: number
  postId: number,
  userId: number,
}