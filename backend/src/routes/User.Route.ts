import express from 'express';
import controllers from '../controllers';
import UserController from '../controllers/User.controller';

const route = express.Router();

const userController = new UserController();

route.post('/create', userController.createUser);

route.post('/login', userController.loginUser);

export default route;