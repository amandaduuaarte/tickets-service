
export interface Auth {
    run(params: Auth.AuthParams): Promise<AuthReturn>;
}


interface AuthReturn {
    accessToken: {
        clientId: string;
    }
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
