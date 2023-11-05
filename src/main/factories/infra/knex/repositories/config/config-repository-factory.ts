import { ConfigRepositoryInterface } from "@/domain/interfaces/repositories";
import { ConfigRepository } from "@/infra/knex/repositories/config/config-repository";

export const ConfigRepositoryFactory = (): ConfigRepositoryInterface => {
  return new ConfigRepository();
};
