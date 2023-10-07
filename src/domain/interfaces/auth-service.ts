export interface AuthService {
  // eslint-disable-next-line no-unused-vars
  run(params: Auth.AuthParams): Promise<Auth.AuthReturn>;
}

export namespace Auth {
  export type AuthParams = {
    body: {
      clientId: string;
    };
  };
  export type AuthReturn = {
    accessToken: {
      clientId: string;
    };
  };
}
