import {
  EventRepositoryInterface,
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

  async ticketBooking(
    eventId: string,
    eventDetails: { area?: string; quantity: number },
  ) {
    try {
      const bdName = `event_${eventId}`;
      const config = new Connection().db(bdName);
      const quantity: any = await config.select("tickets_quantity");
      const newQuantity = Number(
        quantity[0].tickets_quantity - eventDetails.quantity,
      );
      await config.update({
        ["tickets_quantity"]: newQuantity,
      });
      console.info(
        `[Event-ticketBooking-Repository]: Quantity updated with successfully.`,
      );
      // Atualizar a quantidade por ares agora.
    } catch (error: any) {
      console.error(`[Event-ticketBooking-Repository]: ${error.message}`);
      throw new Error("A compra não pode ser finalizada. Tente novamente");
    }
  }
}
