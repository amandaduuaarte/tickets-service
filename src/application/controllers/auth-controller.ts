import { Responsebody } from "../interfaces";
import { Controller } from "../interfaces/controller";

import { error, success } from "../utils/http";
import { Auth, AuthServiceInterface } from "@/domain/interfaces";

export class AuthController implements Controller {
  constructor(private readonly authService: AuthServiceInterface) {}
  public async handleRequest(data: Auth.AuthParams): Promise<Responsebody> {
    console.info("[Auth-controller]:", data);

    try {
      const authservice = this.authService;
      const content = await authservice.run(data);

      return success(content);
    } catch (err: any) {
      return error({ message: err.message });
    }
  }
}
