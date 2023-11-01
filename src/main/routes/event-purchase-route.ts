import { Router } from "express";

import { EventPurchaseControllerFactory } from "../factories/application/controller";
import { AdpterRouter } from "../adpters";
import { AuthMiddlewareFactory } from "../factories/main/middlewares";

export const eventPurchaseRouter = Router();

eventPurchaseRouter.post("/event-purchase", AuthMiddlewareFactory, AdpterRouter(EventPurchaseControllerFactory()));
