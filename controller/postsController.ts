import express, { Express, Request, Response } from 'express';

const postRouter = express.Router();

postRouter.get('/', (req: Request, res: Response) => {
  res.render('index');
});

postRouter.get('/myPosts', (req: Request, res: Response) => {
  res.render('myPosts');
});

postRouter.get('/likedPosts', (req: Request, res: Response) => {
  res.render('likedPosts');
});

postRouter.get('/createPost', (req: Request, res: Response) => {
  res.render('createPosts');
});

export default postRouter;