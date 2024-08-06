import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Config } from "../config";
import { ITokenDecode } from "../controllers/userController";

export interface RequestWithToken extends Request {
  userId: string;
}

export const authMiddleware = (
  req: Request<RequestWithToken>,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers;

  if (!headers.authorization) {
    return res.status(401).send({ error: "Token is required" });
  }

  const token = req.headers.authorization?.split(" ")?.[1];

  if (!token) {
    return res.status(401).send({ error: "Token is required" });
  }

  jwt.verify(token, Config.secret, (error, decode) => {
    if (error) return res.status(401).send({ error: "Token invalid" });
    const decodeToken = decode as ITokenDecode;
    req.body.userId = decodeToken.id;
    next();
  });
};
