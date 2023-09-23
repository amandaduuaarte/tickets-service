import { AuthController } from "@/application/controllers/auth-controller";
import { Auth } from "@/domain/interfaces";
import { Router } from "express";


export const authRoute = Router();
const authController = new AuthController();

authRoute.post('/auth',  authController.handleRequest);
