
type postFields = {
  userId: number,
  content: string,
  posted?: Date,
}

interface post {
  createPost(newPost: postFields): postFields;
}

export default class Post {



}