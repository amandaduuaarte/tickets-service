import { BAD_REQUEST } from "@/application/constants";

import { Middleware } from "@/application/interfaces/middleware";
import { Request, Response } from "express";

export class AuthMiddleware implements Middleware {
  handleRequest(req: Request, res: Response, next: any): void | any {
    try {
      const { accesstoken } = req.headers;

      if (!accesstoken) {
        throw new Error("Access token was not provided.");
      }
    } catch (err: any) {
      return res.status(BAD_REQUEST).send({
        code: BAD_REQUEST,
        message: err.message,
      });
    }

    next();
  }
}
