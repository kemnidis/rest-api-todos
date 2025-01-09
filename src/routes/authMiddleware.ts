import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.JWT_ACCESS_SECRET) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      res.status(401).send("Access token is required");
      return;
    }

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err) => {
      if (err) {
        res.status(403).send("Invalid or expired access token");
      }

      next();
    });
  }

  return;
};
