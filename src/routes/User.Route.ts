import express, { Application, Request, Response } from 'express';
import controllers from '../controllers';
import midds from '../middlewares';
const route = express.Router();

// Foi utilizado o type Aplication devido o uso do req.envs para passar informação do middleware para o proximo
route.get('/', midds.token as Application, controllers.user.getUser as Application);

route.post('/', controllers.user.createUser);

route.post('/login', controllers.user.loginUser);


export default route;