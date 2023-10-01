
export interface Auth {
    run(params: Auth.AuthParams): Promise<Auth.AuthReturn>;
}

export namespace Auth {
    export type AuthParams = {
        body: {
            clientId: string;
        }
       
    }
    export type AuthReturn = {
        accessToken: {
            clientId: string;
        }
    }
}
