import { Controller, Responsebody } from "../interfaces";
import { CreateEvent } from "@/domain/interfaces";

export class CreateEventController implements Controller {
  public async handleRequest(data: CreateEvent.CreateEventParams): Promise<Responsebody | void> {
    console.info("[Create-Event-controller]:", data);

    try {
      console.log(data);
    } catch (err: any) {
      console.error(err.message);
    }
  }
}
