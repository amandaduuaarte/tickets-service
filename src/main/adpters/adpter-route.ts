import { Controller } from "@/application/interfaces";
import { error, success } from "@/application/utils/http";
import { Request, Response } from "express";

export const AdpterRouter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const content = await controller.handleRequest(req.body);
    res.send(success(content));

    if (!content) {
      res.send(error(content));
    }
  };
};
