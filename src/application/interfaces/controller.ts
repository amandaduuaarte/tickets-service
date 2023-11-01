import { Responsebody } from "./index";

export interface Controller {
  handleRequest: (data: any) => Promise<Responsebody | void>;
}
