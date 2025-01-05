import express from 'express'
import { allUser, login, Logout, singleUser, userRegister } from './User.controller.js';
import jwtAuth from '../../MiddleWare/jwtAuth.js';

const routes=new express.Router();


routes.post('/createUser',userRegister);
routes.post('/loginUser',login);
routes.get('/singleUser/:id',singleUser);
routes.get('/allUser',allUser);
routes.post('/logout',jwtAuth,Logout);

export default routes;