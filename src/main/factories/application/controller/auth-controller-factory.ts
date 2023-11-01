import { Controller } from "@/application/interfaces";
import { AuthController } from "@/application/controllers/auth-controller";
import { AuthServiceFactory } from "../../domain/services/auth-service-factory";

export const AuthControllerFactory = (): Controller => {
  return new AuthController(AuthServiceFactory());
};
