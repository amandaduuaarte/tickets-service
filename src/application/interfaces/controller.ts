/* eslint-disable no-unused-vars */
import { Request, Response } from "express";

import { Responsebody } from "./index";

export interface Controller {
  handleRequest: (
    request: Request,
    response: Response,
  ) => Promise<Responsebody>;
}
