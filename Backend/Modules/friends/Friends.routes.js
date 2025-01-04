import express from 'express';
import { acceptRequest, allMutualFriends, cancelRequest, sendRequest, unfriend, viewFriends } from './Friends.controller.js';
import jwtAuth from '../../MiddleWare/jwtAuth.js';

const routes = express.Router();

routes.post('/viewFriend', jwtAuth, viewFriends);
routes.patch('/acceptFriend', jwtAuth, acceptRequest);
routes.post('/sendRequest', jwtAuth, sendRequest);
routes.patch('/cancelRequest', jwtAuth, cancelRequest);
routes.get('/mutualFriend', jwtAuth, allMutualFriends);
routes.post('/unfriend', jwtAuth, unfriend);

export default routes;
