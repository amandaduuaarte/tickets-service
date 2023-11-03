import { Controller, Responsebody } from "../interfaces";
import { CreateEvent, CreateEventServiceInterface } from "@/domain/interfaces";

export class CreateEventController implements Controller {
  constructor(private readonly createEventService: CreateEventServiceInterface) {}
  public async handleRequest(data: CreateEvent.CreateEventParams): Promise<Responsebody | void> {
    console.info("[Create-Event-controller]:", data);

    try {
      const content = await this.createEventService.run(data);
      return content;
    } catch (err: any) {
      console.error("[Event-purchase-controller]:", err);
      return;
    }
  }
}
