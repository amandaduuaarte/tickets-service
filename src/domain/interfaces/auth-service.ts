
export interface Auth {
    run(params: Auth.AuthParams): Promise<void>;
}

export namespace Auth {
    export type AuthParams = {
        clientId: string;
    }
}
