import { Controller } from "@/application/interfaces";
import { AuthController } from "@/application/controllers/auth-controller";

export const AuthControllerFactory = (): any => {
  return new AuthController();
};
