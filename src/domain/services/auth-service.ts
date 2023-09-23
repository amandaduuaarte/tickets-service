import { BadRequestException } from "@/application/errors/errorExpection";
import { Auth } from "../interfaces";
import Jwt  from "jsonwebtoken";


export class AuthService implements Auth {
    constructor() { }

    async run(params: Auth.AuthParams): Promise<Auth.AuthReturn> {
        const { clientId } = params.body;

        this.validate(clientId);
        console.log(`[Auth-Service]: Client ID:${clientId} validate successfully!`);

        this.generateClientToken(clientId);
        
        return {
            accessToken: {
                clientId
            }
        }
    }

   private validate(clientId: string) {
        const startsWith = 'mobile';

        if (!clientId.startsWith(startsWith)) {
            console.error(`[Auth-Service] Invalid client id: ${clientId}`);
            throw new BadRequestException('O client ID é inválido.', 400);
        }
   }

    private async generateClientToken(clientId: string) {
        const env = process.env;
        // Validar se é um client cadastrado na table config
        const accessToken = await Jwt.sign({ clientId }, env.API_SECRET || '', { expiresIn: "7d" });
        console.log(accessToken);
        
    }
}