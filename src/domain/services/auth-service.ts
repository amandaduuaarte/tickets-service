import { BadRequestException } from "@/application/errors/errorExpection";
import { Auth } from "../interfaces";
import Jwt from "jsonwebtoken";
import { ConfigRepository } from "@/infra/knex/repositories/config/config-repository";
import { BAD_REQUEST } from "@/application/constants";

export class AuthService implements AuthService {
  constructor(private readonly configRepository: ConfigRepository) {
    this.configRepository = configRepository;
  }

  async run(params: Auth.AuthParams): Promise<Auth.AuthReturn> {
    try {
      const { clientId } = params;

      if (!params) {
        console.error(`[Auth-Service]: clientid was not found.`);
        throw new BadRequestException("ClientId não foi encontrado.", BAD_REQUEST);
      }

      await this.validate(clientId);
      await this.findClientId(clientId);
      console.info(`[Auth-Service]: clientid was found. client:${clientId}.`);

      const accessToken = await this.generateClientToken(clientId);

      return {
        accessToken: {
          clientId: accessToken,
        },
      };
    } catch (err: any) {
      console.error(`[Auth-Service]: clientid was not found.`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }

  private validate(clientId: string | string[]): void {
    try {
      const startsWith = "MSInitialService";

      if (typeof clientId === "string") {
        if (!clientId.startsWith(startsWith)) {
          console.error(`[Auth-Service]: Invalid client id: ${clientId}`);
          throw new BadRequestException("O client ID é inválido.", 400);
        }
      }
      console.info(`[Auth-Service]: clientid was validate. client:${clientId}.`);
    } catch (err: any) {
      console.error(`[Auth-Service]: ${err.message}`);
      throw new BadRequestException("O client ID é inválido.", 400);
    }
  }

  private async findClientId(clientId: string) {
    try {
      const client = await this.configRepository.findConfigByClientId(clientId);
      if (!client || client === undefined) {
        console.info(`[Auth-Service]: clientid was not found. ${clientId}.`);
        throw new BadRequestException("O client ID é inválido.", 400);
      }
    } catch (err: any) {
      console.error(`[Auth-Service]: ${err.message}`);
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
