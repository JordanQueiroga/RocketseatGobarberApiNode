import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMidlleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMidlleware);
routes.post('/sessions', SessionController.store);
routes.put('/users', UserController.update);

// sigle indica que queromos fazer o upload de apenas uma imagem
routes.post('/files', upload.single('file'), (req, res) => {
  console.log(req);
  return res.json(req.file);
});

export default routes;
