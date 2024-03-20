import express from 'express';
import controllers from '../controllers';

const route = express.Router();

route.post('/login', controllers.Login.login);

export default route;