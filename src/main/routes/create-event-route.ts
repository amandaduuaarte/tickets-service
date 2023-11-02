import { Router } from "express";
import { AdpterMiddleware, AdpterRouter } from "../adpters";
import { CreateEventControllerFactory } from "../factories/application/controller";
import { AuthMiddlewareFactory } from "../factories/main/middlewares";

export const createEventRouter = Router();

createEventRouter.post("/create-event", AdpterMiddleware(AuthMiddlewareFactory()), AdpterRouter(CreateEventControllerFactory()));
