import { Controller } from "@/application/interfaces";

import { Request, Response } from "express";

export const AdpterRouter = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const content = await controller.handleRequest(req.body);
    res.send(content);

    if (!content) {
      res.send({ message: "Invalid request." });
    }
  };
};
