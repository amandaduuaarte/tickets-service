import { Middleware } from "@/application/interfaces/middleware";
import { NextFunction, Request, Response } from "express";

export const AdpterMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await middleware.handleRequest(req.headers);

    next();
  };
};
