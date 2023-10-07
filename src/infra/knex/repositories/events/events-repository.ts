import {
  EventRepositoryInterface,
  findQuantityByAreaReturn,
  findQuantityByEventIdReturn,
} from "@/domain/interfaces/repositories";
import { Connection } from "../../config";

export class EventRepository implements EventRepositoryInterface {
  async findQuantityByEventId(
    eventId: string,
  ): Promise<findQuantityByEventIdReturn> {
    try {
      const bdName = `event_${eventId}`;
      const config = new Connection();
      const content = await config
        .db(bdName)
        .select("tickets_quantity", "event_config");
      return content[0];
    } catch (error: any) {
      console.error(
        `[Event-findQuantityByEventId-Repository]: ${error.message}`,
      );
      throw new Error("O evento não pode ser validado.");
    }
  }

  async findQuantityByArea(
    eventId: string,
    area: string,
  ): Promise<findQuantityByAreaReturn> {
    try {
      const bdName = `event_${eventId}`;
      const config = new Connection();
      const content = await config.db(bdName).select(area);
      return content[0];
    } catch (error: any) {
      console.error(
        `[Event-findQuantityByEventId-Repository]: ${error.message}`,
      );
      throw new Error("A area não pode ser validada.");
    }
  }

  async ticketBooking(
    eventId: string,
    eventDetails: { area: string; quantity: number },
  ) {
    try {
      console.info(
        `[Event-ticketBooking-Repository]: Starting to update quantity by area.`,
      );
      this.quantityForArea(eventId, eventDetails);

      console.info(
        `[Event-ticketBooking-Repository]: Starting to update quantity.`,
      );
      this.quantityTotal(eventId, eventDetails.quantity);
    } catch (error: any) {
      console.error(`[Event-ticketBooking-Repository]: ${error.message}`);
      throw new Error("A compra não pode ser finalizada. Tente novamente");
    }
  }

  private async quantityTotal(eventId: string, quantity: number) {
    const bdName = `event_${eventId}`;
    const config = new Connection().db(bdName);
    const currentQuantity: any = await config.select("tickets_quantity");
    const newTotalQuantity = Number(
      currentQuantity[0].tickets_quantity - quantity,
    );
    await config.update({
      ["tickets_quantity"]: newTotalQuantity,
    });
    console.info(
      `[Event-quantityTotal-Repository]: Total quantity updated with successfully.`,
    );
  }

  private async quantityForArea(
    eventId: string,
    eventDetails: { area: string; quantity: number },
  ) {
    try {
      const bdName = `event_${eventId}`;
      const config = new Connection().db(bdName);
      const area = eventDetails.area;
      const currentQuantity: any = await config.select(eventDetails.area);

      const newTotalQuantity = Number(
        currentQuantity[0][area] - eventDetails.quantity,
      );

      await config.update({
        [eventDetails.area]: newTotalQuantity,
      });

      console.info(
        `[Event-quantityForArea-Repository]: Total quantity updated with successfully.`,
      );
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
