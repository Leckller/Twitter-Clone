import express, { Request, Response } from 'express';

const route = express.Router();

route.get('/', async (req: Request, res: Response) => {
  res.status(200).json('oiii')
})

route.post('/',)

export default route;