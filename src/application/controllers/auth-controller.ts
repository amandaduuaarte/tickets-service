import { AuthService } from "@/domain/services";

import { Controller } from "../interfaces/controller";
import { ConfigRepository } from "@/infra/knex/repositories/config/config-repository";
import { error, success } from "../utils/http";

export class AuthController implements Controller {
  public async handleRequest(req: any, res: any): Promise<any> {
    console.info("[Auth-controller]:", req.body);

    try {
      const authservice = new AuthService(new ConfigRepository());
      const content = await authservice.run(req.body);

      return res.send(success(content));
    } catch (err: any) {
      return res.send(error({ message: err.message }));
    }
  }
}
