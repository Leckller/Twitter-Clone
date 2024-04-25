import { Post } from "../types/posts.types";

const url = 'http://localhost:8001/post'

export default class PostFetch {
  private token;

  constructor(token: string) { this.token = token; }

  async createPost(fields: Post): Promise<any> {
    const Request = await fetch(url + '/create', {
      method: 'POST',
      body: JSON.stringify(fields),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer: ' + this.token,
      },
    });
    const Response = await Request.json();
    return Response;
  }
  async deletePost(postId: number): Promise<any> {
    const Request = await fetch(url + '/delete', {
      method: 'DELETE',
      body: JSON.stringify({ postId }),
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer: ' + this.token,
      },
    });
    const Response = await Request.json();
    return Response;
  }
}