import { Response, Request } from './index';

export interface Controller {
    handleRequest:(request: Request) => Promise<Response>;
}