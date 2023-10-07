import { AuthController } from "@/application/controllers/auth-controller";
import { Router } from "express";

export const authRoute = Router();
const authController = new AuthController();

authRoute.post("/auth", authController.handleRequest);
