import { AuthServiceInterface } from "@/domain/interfaces";
import { AuthService } from "@/domain/services";

import { ConfigRepositoryFactory } from "../../infra/knex/repositories/config/config-repository-factory";

export const AuthServiceFactory = (): AuthServiceInterface => {
  return new AuthService(ConfigRepositoryFactory());
};
