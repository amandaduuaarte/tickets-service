import { Router } from "express";
import { AuthControllerFactory } from "../factories/application/controller";
import { AdpterRouter } from "../adpters";

export const authRoute = Router();

authRoute.post("/auth", AdpterRouter(AuthControllerFactory()));
