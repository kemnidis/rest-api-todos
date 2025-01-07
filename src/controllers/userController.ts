import { Request, Response } from "express";
import { addUser, getUsers } from "../models/user";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const addUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    await addUser(email, password);
    res.status(201).send("User added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
