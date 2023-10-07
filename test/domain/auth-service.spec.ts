import { mock, MockProxy } from "jest-mock-extended";

import { AuthService } from "../../src/domain/services/auth-service";
import { ConfigRepository } from "../../src/infra/knex/repositories/config/config-repository";
import { Auth } from "../../src/domain/interfaces/auth-service";
import { ConfigModel } from "@/domain/models";

describe("Validating token creation", () => {
  let configRepository: MockProxy<ConfigRepository>;
  let sut: Auth;
  let data: ConfigModel;

  beforeEach(() => {
    configRepository = mock();
    data = {
      id: "01",
      clientId: "MSInitialService",
    };
  });

  beforeAll(() => {
    // beforeAll => Por conta da conexao do db
    sut = new AuthService(configRepository);
  });

  it("Should invalid clientId", async () => {
    const wrongClientId = { clientId: "wrong-client-id" };
    const content = { body: wrongClientId };

    await expect(sut.run(content)).rejects.toThrow("O client ID é inválido.");
  });

  it("Should find client ID in DB", async () => {
    const rightClientId = { clientId: "MSInitialService" };
    const content = { body: rightClientId };

    configRepository.findConfigByClientId.mockResolvedValueOnce(data);
    const successResponse = {
      code: 200,
      body: {
        accessToken: {
          clientId: "success",
        },
      },
    };

    await expect(sut.run(content)).toBe(successResponse);
  });
});
