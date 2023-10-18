import { ConfigModel } from "@/domain/models";
import { Connection } from "../../config";
import { ConfigRepositoryInterface } from "@/domain/interfaces/repositories/config-repository";
export class ConfigRepository implements ConfigRepositoryInterface {
  async findConfigByClientId(clientId: string): Promise<ConfigModel> {
    const config = new Connection();
    const content = await config.db("config").select("id", "clientId").where("clientId", "=", clientId);

    try {
      console.info(`[Config-repository]- Results are found for clientId.`, content);
      return content[0];
    } catch (error: any) {
      console.error(`[Config-repository]`, error);
      throw new Error("Não foi possível validar o client id: " + clientId);
    }
  }
}
