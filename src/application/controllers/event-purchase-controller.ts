import { Controller, Responsebody } from "../interfaces";
import { error } from "../utils/http";
import { EventPurchaseService } from "@/domain/services";
import { EventRepository } from "@/infra/knex/repositories/events/events-repository";

export class EventPurchaseController implements Controller {
  public async handleRequest(req: any, res: any): Promise<Responsebody | any> {
    console.info("[Event-purchase-controller]:", req.body);

    try {
      const eventPurchaseService = new EventPurchaseService(
        new EventRepository(),
      );
      const content = await eventPurchaseService.run(req.body);
      return res.send(content);
    } catch (err: any) {
      console.error("[Event-purchase-controller]:", error);
      return;
    }
  }
}
