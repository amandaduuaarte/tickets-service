import { Middleware } from "@/application/interfaces/middleware";
import { error } from "@/application/utils/http";

export class AuthMiddleware implements Middleware {
  async handleRequest(data: any): Promise<any> {
    try {
      const { accesstoken } = data;

      if (!accesstoken) {
        throw new Error("Access token was not provided.");
      }
    } catch (err: any) {
      return error(err.message);
    }
  }
}
