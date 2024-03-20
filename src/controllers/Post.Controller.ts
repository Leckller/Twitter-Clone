import { Request, Response } from "express"
import PostModel from "../database/models/Post.Model";
import UserModel from "../database/models/User.model";
import { Envs } from "../middlewares/token.Middleware";
import services from "../services";

const newPost = async (req: Request & Envs, res: Response) => {
  const { content } = req.body;
  const { id } = req.envs;
  const validateFields = services.Post.validateNewPost({ content });

  if (validateFields) {
    const { data: { message }, status } = validateFields;
    return res.status(status).json({ message });
  }

  const post = await PostModel.create({
    content, likes: 0, posted: new Date(), userId: id
  });

  res.status(201).json(post);
}

const viewProfilePosts = async (req: Request, res: Response) => {
  const { endereco, page } = req.params;
  const validateFields = await services.Post.enderecoExists(endereco);

  if (validateFields) {
    const { data: { message }, status } = validateFields;
    return res.status(status).json({ message });
  }

  const actLimit = Number(page) < 10 ? 10 : Number(page);

  const profilePosts = await UserModel.findAll({
    where: { endereco },
    include: [{
      order: [['posted', 'DESC']],
      limit: actLimit,
      model: PostModel,
      as: 'userPost',
    }]
  })
  res.status(200).json(profilePosts)
}

const viewGlobalPosts = async (req: Request, res: Response) => {
  const { page } = req.params;

  const limit = 10;
  const actPage = page ? Number(page) * limit : 0;

  const globalPosts = await PostModel.findAll({
    attributes: ['id', 'likes', 'posted', 'content', 'user_id'],
    order: [['posted', 'DESC']],
    limit: limit,
    offset: actPage,
    include: [{
      model: UserModel,
      as: 'postUser',
      required: true,
      attributes: { exclude: ['email', 'id', 'password'] },
    }]
  })
  res.status(200).json(globalPosts)
}

const like = async (req: Request, res: Response) => {

}

export default { newPost, viewProfilePosts, viewGlobalPosts };
