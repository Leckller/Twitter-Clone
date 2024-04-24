import { Router } from 'express';
import User from './User.Route';

const router = Router();

router.use('/user', User);

export default router;
