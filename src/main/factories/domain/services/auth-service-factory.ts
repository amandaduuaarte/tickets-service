import { AuthServiceInterface } from "@/domain/interfaces";
import { AuthService } from "@/domain/services";
import { ConfigRepository } from "@/infra/knex/repositories/config/config-repository";

export const AuthServiceFactory = (): AuthServiceInterface => {
  return new AuthService(new ConfigRepository());
};
