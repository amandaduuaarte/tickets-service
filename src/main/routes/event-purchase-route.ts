import { Router } from "express";

import authMiddleware from "../middlewares/auth-middleware";
import { EventPurchaseControllerFactory } from "../factories/application/controller";

export const eventPurchaseRouter = Router();

eventPurchaseRouter.post("/event-purchase", authMiddleware.handleRequest, EventPurchaseControllerFactory);
