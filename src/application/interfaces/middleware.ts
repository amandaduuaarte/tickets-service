/* eslint-disable no-unused-vars */
import { Request, Response } from "express";

export interface Middleware {
  handleRequest: (request: Request, response: Response, next: any) => Promise<Response | void>;
}
