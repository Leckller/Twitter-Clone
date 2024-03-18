import express, { Request, Response } from 'express';
import controllers from '../controllers';

const route = express.Router();

route.get('/', (req: Request, res: Response) => {
  res.status(200).json('oiiii')
})

route.post('/', controllers.User.createUser);

export default route;