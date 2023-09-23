import { AuthService } from "@/domain/services/auth-service";

import { Controller } from "../interfaces/controller";

import { BAD_REQUEST } from "../constants";
import { ConfigRepository } from "@/infra/knex/repositories/config/config-repository";

export class AuthController implements Controller {
    public async handleRequest(request: any, response: any) {
        try {
            const authservice = new AuthService(new ConfigRepository());
            const content = await authservice.run(request);
    
            return response.status(200).send(content);

        } catch (error: any) {
            return response.status(BAD_REQUEST).send({
                code: BAD_REQUEST,
                message: error.message
            });
        }
    }
}