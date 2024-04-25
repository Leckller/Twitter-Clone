import { Router } from 'express';
import User from './User.Route';
import Post from './Post.Route'

const router = Router();

router.use('/user', User);
router.use('/post', Post)

export default router;
