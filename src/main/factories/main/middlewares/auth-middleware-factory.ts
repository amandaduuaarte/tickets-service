import { AuthMiddleware } from "@/main/middlewares";
import { Middleware } from "@/application/interfaces/middleware";

export const AuthMiddlewareFactory = (): Middleware => {
  return new AuthMiddleware();
};
