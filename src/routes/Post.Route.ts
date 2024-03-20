import express, { Application } from 'express';
import controllers from '../controllers';

const route = express.Router();

route.post('/', controllers.Post.newPost as Application)
route.get('/profile/:endereco/:page', controllers.Post.viewProfilePosts)
route.get('/global/:page', controllers.Post.viewGlobalPosts)

export default route;
