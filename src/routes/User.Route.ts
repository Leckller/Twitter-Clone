import express, { Application } from 'express';
import controllers from '../controllers';
import midds from '../middlewares';

const route = express.Router();

// Foi utilizado o type Aplication devido o uso do req.envs para passar informação do middleware para o proximo
route.get('/', midds.token as Application, controllers.User.getUser as Application);

route.post('/', controllers.User.createUser);


export default route;