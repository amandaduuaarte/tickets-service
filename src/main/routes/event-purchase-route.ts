import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth-middleware";
import { EventPurchaseControllerFactory } from "../factories/application/controller";
import { AdpterRouter } from "../adpters";

const authMiddleware = new AuthMiddleware();

export const eventPurchaseRouter = Router();

eventPurchaseRouter.post("/event-purchase", authMiddleware.handleRequest, AdpterRouter(EventPurchaseControllerFactory()));
