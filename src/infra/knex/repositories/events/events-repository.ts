import { EventRepositoryInterface, findQuantityByAreaReturn, findQuantityByEventIdReturn } from "@/domain/interfaces/repositories";

import { BadRequestException } from "@/application/errors/errorExpection";
import { BAD_REQUEST } from "@/application/constants";
import { KnexConnectionFactory } from "@/main/factories/infra/knex/config/connection-factory";

export class EventRepository implements EventRepositoryInterface {
  async findEventById(eventId: string): Promise<void> {
    const bdName = `events`;
    const config = KnexConnectionFactory();
    const content = await config.db(bdName).where("title", eventId);

    if (content.length <= 0) {
      console.error(`[Event-findQuantityByEventId-Repository]: Event not found ${eventId}`);
      throw new BadRequestException("O evento não pode ser validado.", BAD_REQUEST);
    }
  }
  async findQuantityByEventId(eventId: string): Promise<findQuantityByEventIdReturn> {
    try {
      const bdName = `events`;
      const config = KnexConnectionFactory();
      const content = await config.db(bdName).where("title", eventId).select("tickets_quantity", "event_config");
      return content[0];
    } catch (error: any) {
      console.error(`[Event-findQuantityByEventId-Repository]: ${error.message}`);
      throw new Error("O evento não pode ser validado.");
    }
  }

  async findQuantityByArea(eventId: string, area: string): Promise<findQuantityByAreaReturn> {
    try {
      const bdName = `events`;
      const config = KnexConnectionFactory();
      const content = await config.db(bdName).where("title", eventId).select(area);
      return content[0];
    } catch (error: any) {
      console.error(`[Event-findQuantityByEventId-Repository]: ${error.message}`);
      throw new Error("A area não pode ser validada.");
    }
  }

  async ticketBooking(eventId: string, eventDetails: { area: string; quantity: number }): Promise<void> {
    try {
      console.info(`[Event-ticketBooking-Repository]: Starting to update quantity by area.`);
      this.quantityForArea(eventId, eventDetails);

      console.info(`[Event-ticketBooking-Repository]: Starting to update quantity.`);
      this.quantityTotal(eventId, eventDetails.quantity);
    } catch (error: any) {
      console.error(`[Event-ticketBooking-Repository]: ${error.message}`);
      throw new Error("A compra não pode ser finalizada. Tente novamente");
    }
  }

  async quantityTotal(eventId: string, quantity: number): Promise<void> {
    const bdName = "events";
    const config = KnexConnectionFactory().db(bdName);
    const currentQuantity: any = await config.where("title", eventId).select("tickets_quantity");
    const newTotalQuantity = Number(currentQuantity[0].tickets_quantity - quantity);
    await config.update({
      ["tickets_quantity"]: newTotalQuantity,
    });
    console.info(`[Event-quantityTotal-Repository]: Total quantity updated with successfully.`);
  }

  async quantityForArea(eventId: string, eventDetails: { area: string; quantity: number }): Promise<void> {
    try {
      const bdName = "events";
      const config = KnexConnectionFactory().db(bdName);
      const area = eventDetails.area;
      const currentQuantity: any = await config.where("title", eventId).select(eventDetails.area);

      const newTotalQuantity = Number(currentQuantity[0][area] - eventDetails.quantity);

      await config.update({
        [eventDetails.area]: newTotalQuantity,
      });

      console.info(`[Event-quantityForArea-Repository]: Total quantity updated with successfully.`);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
