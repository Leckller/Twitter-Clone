import PostModel from "../database/models/Post.Model";
import { ServiceResponse, ServiceResponseError } from "../types/Services.types"
import { Post } from "../types/posts.types";

export default class postService {
  private post = new PostModel();

  async newPost(fields: Partial<Post>, token: { email: string, id: number })
    : Promise<ServiceResponse<ServiceResponseError | Omit<Post, 'id'>>> {
    const { content } = fields;
    const { id } = token;

    if (!content || content.length < 1) {
      return { status: 411, data: { message: 'Seu post deve ter pelo menos um caractere.' } }
    } if (content.length > 256) {
      return { status: 411, data: { message: 'Seu post atingiu o limite de 256 caracteres.' } }
    }

    const post = await this.post.createPost({ content, posted: new Date(), userId: id });

    return { status: 201, data: post };
  }

  async deletePost(postId: number, token: { email: string, id: number })
    : Promise<ServiceResponse<ServiceResponseError>> {
    const post = await this.post.findPostById(postId);
    if (!post) { return { status: 400, data: { message: 'Post não encontrado.' } } }
    if (token.id !== post.userId) {
      return { status: 401, data: { message: 'Você não tem permissão para apagar este post.' } }
    }
    return { status: 200, data: { message: 'Post removido!' } }
  }
}
