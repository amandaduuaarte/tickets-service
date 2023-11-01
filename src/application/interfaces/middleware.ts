import { Responsebody } from "./http";

export interface Middleware {
  handleRequest: (data: any) => Promise<Responsebody | void>;
}
