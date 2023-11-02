import { Responsebody } from "@/application/interfaces";
import { CreateEvent, CreateEventServiceInterface } from "../interfaces";

export class CreateEventService implements CreateEventServiceInterface {
  async run(data: CreateEvent.CreateEventParams): Promise<Responsebody | void> {
    console.info(`[Create-Event-Service]: ${data}`);
  }
}
