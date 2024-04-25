import express, { Application } from 'express';
import PostController from '../controllers/Post.Controller';

const route = express.Router();
const controller = new PostController();

route.post('/create', (req, res) => {
  controller.newPost(req as any, res);
})
route.post('/delete', (req, res) => {
  controller.deletePost(req as any, res)
})

export default route;
