import { Router } from "express";
import { EventPurchaseController } from "@/application/controllers";
import authMiddleware from "../middlewares/auth-middleware";

export const eventPurchaseRouter = Router();
const eventPurchaseController = new EventPurchaseController();

eventPurchaseRouter.post("/event-purchase", authMiddleware.handleRequest, eventPurchaseController.handleRequest);
