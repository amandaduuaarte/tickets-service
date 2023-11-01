import { Middleware } from "@/application/interfaces/middleware";
import { error } from "@/application/utils/http";

export class AuthMiddleware implements Middleware {
  handleRequest(data: any): any {
    try {
      const { accesstoken } = data;

      if (!accesstoken) {
        throw new Error("Access token was not provided.");
      }
      return accesstoken;
    } catch (err: any) {
      return error(err.message);
    }
  }
}
