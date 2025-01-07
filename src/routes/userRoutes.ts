import express from "express";
import {
  getUsersController,
  addUserController,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/users", getUsersController);
userRouter.post("/users", addUserController);

export default userRouter;
