import { Middleware } from "@/application/interfaces/middleware";
import { NextFunction, Request, Response } from "express";

export const AdpterMiddleware = (middleware: Middleware) => {
  async (req: Request, res: Response, next: NextFunction) => {
    const content = await middleware.handleRequest(req.headers);
    if (!content) {
      res.send({ message: "Invalid request" });
    }
    res.send(content);

    next();
  };
};
