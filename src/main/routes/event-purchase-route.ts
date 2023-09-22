import { EventPurchaseController } from "@/application/controllers";
import { Router } from "express";

export const eventPurchaseRouter = Router();
const eventPurchaseController = new EventPurchaseController();

eventPurchaseRouter.post('/event-purchase', (req, res) => {
    eventPurchaseController.handleRequest(req);
});

