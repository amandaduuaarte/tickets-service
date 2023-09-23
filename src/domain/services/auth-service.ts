import { Auth } from "../interfaces";


export class AuthService implements Auth {
    constructor() { }

    async run(params: any) {
        console.log(params.body)
        return params.body;
    }
}