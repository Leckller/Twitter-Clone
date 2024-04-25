import { PostUser } from "../types/posts.types";

const url = 'http://localhost:8001/post'

export default class PostFetch {
  private token;

  constructor(token: string) { this.token = token; }

  async globalPosts(page = 0): Promise<PostUser[]> {
    const Request = await fetch(url + '/global/' + page, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer: ' + this.token,
      },
    });
    const Response = await Request.json();
    return Response;
  }

  async createPost(content: string): Promise<any> {
    const Request = await fetch(url + '/create', {
      method: 'POST',
      body: JSON.stringify({ content }),
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