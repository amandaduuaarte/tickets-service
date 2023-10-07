/* eslint-disable no-unused-vars */
import { ConfigModel } from "@/domain/models";

export interface ConfigRepositoryInterface {
  findConfigByClientId(clientId: string): Promise<ConfigModel>;
}
