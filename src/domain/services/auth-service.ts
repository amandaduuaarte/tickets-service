import { BadRequestException } from "@/application/errors/errorExpection";
import { Auth } from "../interfaces";
import Jwt from "jsonwebtoken";
import { ConfigRepository } from "@/infra/knex/repositories/config/config-repository";

export class AuthService implements Auth {
  constructor(private readonly configRepository: ConfigRepository) {
    this.configRepository = configRepository;
  }

  async run(params: Auth.AuthParams): Promise<Auth.AuthReturn> {
    const { clientId } = params.body;
    this.validate(clientId);
    console.info(`[Auth-Service]: clientid was validate. client:${clientId}.`);

    await this.findClientId(clientId);
    console.info(`[Auth-Service]: clientid was found. client:${clientId}.`);

    const accessToken = await this.generateClientToken(clientId);

    return {
      accessToken: {
        clientId: accessToken,
      },
    };
  }

  private validate(clientId: string | string[]): void {
    const startsWith = "MSInitialService";

    if (typeof clientId === "string") {
      if (!clientId.startsWith(startsWith)) {
        console.error(`[Auth-Service]: Invalid client id: ${clientId}`);
        throw new BadRequestException("O client ID é inválido.", 400);
      }
    }
  }

  private async findClientId(clientId: string) {
    const client = await this.configRepository.findConfigByClientId(clientId);
    if (!client || client === undefined) {
      console.info(`[Auth-Service]: clientid was not found. ${clientId}.`);
      throw new BadRequestException("O client ID é inválido.", 400);
    }
  }
  private async generateClientToken(clientId: string): Promise<string> {
    const env = process.env;

    const accessToken = await Jwt.sign({ clientId }, env.API_SECRET || "", {
      expiresIn: "10y",
    });
    console.info(`[Auth-Service]: access token was genereted!`);
    return accessToken;
  }
}
