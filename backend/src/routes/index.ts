import User from './User.Route';
import Comment from './Comment.Route';
import Post from './Post.Route';
import Login from './Login.Route';
import { Application, Router } from 'express';
import middlewares from '../middlewares';

const router = Router();

router.use('/user', User);
router.use('/login', Login);
router.use(middlewares.token as Application);
router.use('/post', Post);

export default router;
