import express, { Request, Response } from 'express';
import controllers from '../controllers';
const route = express.Router();

route.get('/', async (req: Request, res: Response) => {
  res.status(200).json('oiii')
})

route.post('/', controllers.user.createUser)

export default route;