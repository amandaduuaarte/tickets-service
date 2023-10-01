import { AuthService } from "@/domain/services";

import { Controller } from "../interfaces/controller";
import { ConfigRepository } from "@/infra/knex/repositories/config/config-repository";
import { error, success } from "../utils/http";

export class AuthController implements Controller {
    public async handleRequest(request: any, response: any) {
        try {
            const authservice = new AuthService(new ConfigRepository());
            const content = await authservice.run(request);
    
            return response.send(success(content));

        } catch (err: any) {
            return response.send(error({ message: err.message}));
        }
    }
}