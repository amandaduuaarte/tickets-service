type body = {
    message?: string;
    content: any;
}

export type Response = {
    body?: body | any;
    code?: number;
}
export type Request<Data = any> = {
    data?: Data
}