import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

import { addUser, getUsers } from "../models/user";

dotenv.config();

const generateTokens = (userId: string, email: string) => {
  if (process.env.JWT_ACCESS_SECRET && process.env.JWT_REFRESH_SECRET) {
    const accessToken = jwt.sign(
      { userId, email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId, email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );

    return { accessToken, refreshToken };
  }

  return { accessToken: null, refreshToken: null };
};

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

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await addUser(email, hashedPassword);
    res.status(201).send("User added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const users = await getUsers();
    const user = users.find((user) => user.email === email);

    if (!user) {
      res.status(400).send("User not found");
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).send("Invalid password");
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.email);

    res.json({ accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

export const refreshAccessTokenController = async (
  req: Request,
  res: Response
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).send("Refresh token is required");
    return;
  }

  try {
    const { userId, email } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET || ""
    ) as { userId: string; email: string };

    const { accessToken } = generateTokens(userId, email);

    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};
