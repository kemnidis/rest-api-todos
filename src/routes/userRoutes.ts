import express from "express";
import { authenticateJWT } from "./authMiddleware";
import {
  getUsersController,
  addUserController,
  loginUserController,
  refreshAccessTokenController,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/users", authenticateJWT, getUsersController);
userRouter.post("/users", addUserController);
userRouter.post("/login", loginUserController);
userRouter.post("/refresh-token", refreshAccessTokenController);

export default userRouter;
