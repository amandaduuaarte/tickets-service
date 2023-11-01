import { Controller, Responsebody } from "../interfaces";
import { error } from "../utils/http";

import { EventPurchase, EventPurchaseServiceInterface } from "@/domain/interfaces/event-purchase-service";

export class EventPurchaseController implements Controller {
  constructor(private readonly eventPurchaseService: EventPurchaseServiceInterface) {}
  public async handleRequest(data: EventPurchase.EventPurchaseParams): Promise<Responsebody | void> {
    console.info("[Event-purchase-controller]:", data);

    try {
      const content = await this.eventPurchaseService.run(data);
      return content;
    } catch (err: any) {
      console.error("[Event-purchase-controller]:", error);
      return;
    }
  }
}
