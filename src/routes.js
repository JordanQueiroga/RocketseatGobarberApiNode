import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMidlleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMidlleware);
routes.post('/sessions', SessionController.store);
routes.put('/users', UserController.update);

export default routes;
