
dotenv.config();
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongodb from "./Config/MongoDb.js";
import UserRegister from "./Modules/User/User.routes.js"
import FriendRequest from './Modules/friends/Friends.routes.js'



const app = express();
const port = process.env.PORT || 8006;
app.use(express.json());
app.use(cookieParser());


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE","PATCH"],
    credentials: true, // Allow credentials to be sent
  })
);



app.use("/api/user/", UserRegister);
app.use("/api/friends/", FriendRequest);



app.listen(port, () => {
  console.log(`Server start at port ${port}`);
  mongodb();

});
