import { Router } from 'express';
import PostController from '../controllers/Post.Controller';
import tokenMiddleware from '../middlewares/token.Middleware';

const route = Router();
const controller = new PostController();

route.get('/global/:page', tokenMiddleware as any, controller.getGlobalPosts)

route.post('/create', tokenMiddleware as any, (req, res) => {
  controller.newPost(req as any, res);
})
route.delete('/delete', tokenMiddleware as any, (req, res) => {
  controller.deletePost(req as any, res)
});

route.get('/:userId/:limit', tokenMiddleware as any, (req, res) => {
  controller.getProfile(req as any, res)
});

export default route;
