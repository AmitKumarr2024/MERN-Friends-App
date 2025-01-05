import express from "express";
import {
  acceptRequest,
  allMutualFriends,
  cancelRequest,
  sendRequest,
  unfriend,
  viewFriends,
} from "./Friends.controller.js";
import jwtAuth from "../../MiddleWare/jwtAuth.js";

const routes = express.Router();

routes.post("/viewFriend", viewFriends);
routes.patch("/acceptFriend", acceptRequest);
routes.post("/sendRequest", sendRequest);
routes.patch("/cancelRequest", cancelRequest);
routes.get("/mutualFriend", allMutualFriends);
routes.post("/unfriend", unfriend);

export default routes;
