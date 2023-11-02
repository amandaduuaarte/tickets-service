import { Router } from "express";
import { AdpterRouter } from "../adpters";
import { CreateEventControllerFactory } from "../factories/application/controller";

export const createEventRouter = Router();

createEventRouter.post("/create-event", AdpterRouter(CreateEventControllerFactory()));
