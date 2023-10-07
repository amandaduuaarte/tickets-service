import { ConfigModel } from "@/domain/models";
import { Connection } from "../../config";
import { ConfigRepositoryInterface } from "@/domain/interfaces/repositories/config-repository";
export class ConfigRepository implements ConfigRepositoryInterface {
  async findConfigByClientId(clientId: string): Promise<ConfigModel> {
    const config = new Connection();
    const content = await config
      .db("config")
      .select("id", "clientId")
      .where("clientId", "=", clientId);
    try {
      return content[0];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
