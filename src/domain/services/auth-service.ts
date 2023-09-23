import { BadRequestException } from "@/application/errors/errorExpection";
import { Auth } from "../interfaces";
import Jwt  from "jsonwebtoken";
import { ConfigRepository } from "@/infra/knex/repositories/config/config-repository";


export class AuthService implements Auth {
    constructor(
        private readonly configRepository: ConfigRepository
    ) { }

    async run(params: Auth.AuthParams): Promise<Auth.AuthReturn> {
        const { clientId } = params.body;

        this.validate(clientId);
        console.log(`[Auth-Service]: Client ID:${clientId} validate successfully!`);

        await this.findClientId(clientId);
        console.info(`[Auth-Service]: clientid was found. client:${clientId}.`);

       await this.generateClientToken(clientId);
        
        return {
            accessToken: {
                clientId
            }
        }
    }

    private validate(clientId: string) {
        const startsWith = 'mobile';

        if (!clientId.startsWith(startsWith)) {
            console.error(`[Auth-Service]: Invalid client id: ${clientId}`);
            throw new BadRequestException('O client ID é inválido.', 400);
        }
    }

    private async findClientId (clientId: string) {
        const client = await this.configRepository.findConfigByClientId(clientId);
        if (!client || client === undefined) {
            console.info(`[Auth-Service]: clientid was not found. ${clientId}.`);
            throw new BadRequestException('O client ID é inválido.', 400);
        }
    }
    private async generateClientToken(clientId: string): Promise<string> {
        const env = process.env;

        const accessToken = await Jwt.sign({ clientId }, env.API_SECRET || '', { expiresIn: "7d" });
        console.info(`[Auth-Service]: access token was genereted!`);
        return accessToken;
    }
}