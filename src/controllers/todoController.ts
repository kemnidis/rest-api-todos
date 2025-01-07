import { Request, Response } from "express";
import { addTodo, getTodos, toggleTodoIsCompleted } from "../models/todo";

export const getTodosController = async (req: Request, res: Response) => {
  try {
    const todos = await getTodos();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const addTodoController = async (req: Request, res: Response) => {
  const { title, description, userId, tag } = req.body;

  try {
    const todos = await addTodo(title, description, userId, tag);
    res.status(201).send("Todo was created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const toggleTodoIsCompletedController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  
  try {
    await toggleTodoIsCompleted(id);

    res.status(200).send(`Todo's ${id} isCompleted toggled`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
