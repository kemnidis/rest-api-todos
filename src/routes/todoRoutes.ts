import express from "express";

import {
  getTodosController,
  addTodoController,
  toggleTodoIsCompletedController,
} from "../controllers/todoController";

const todoRouter = express.Router();

todoRouter.get("/todos", getTodosController);

todoRouter.post("/todos", addTodoController);

todoRouter.patch("/todos/:id", toggleTodoIsCompletedController);

export default todoRouter;
