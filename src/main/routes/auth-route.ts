import { Router } from "express";
import { AuthControllerFactory } from "../factories/application/controller";

export const authRoute = Router();

authRoute.post("/auth", AuthControllerFactory);
