import express from 'express';
import UserController from '../controllers/User.controller';
import tokenMiddleware from '../middlewares/token.Middleware';

const route = express.Router();

const userController = new UserController();

route.post('/create', userController.createUser);

route.post('/login', userController.loginUser);

route.delete('/delete', tokenMiddleware as any, (req, res) => {
  userController.deleteUser(req as any, res)
});

export default route;