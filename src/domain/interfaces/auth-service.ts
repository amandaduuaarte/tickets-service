export interface AuthServiceInterface {
  run(params: Auth.AuthParams): Promise<Auth.AuthReturn>;
}

export namespace Auth {
  export type AuthParams = {
    clientId: string;
  };

  export type AuthReturn = {
    accessToken: {
      clientId: string;
    };
  };
}
