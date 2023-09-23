import { Request, Response } from "express";
import { AuthService } from "@/domain/services/auth-service";

import { Controller } from "../interfaces/controller";
import { Responsebody } from "../interfaces";

export class AuthController implements Controller {
    public async handleRequest(request: any, response: any){
        const authservice = new AuthService(); 
        const content = await authservice.run(request);

        return response.status(200).send({
            accessToken: content
        });
     };
}