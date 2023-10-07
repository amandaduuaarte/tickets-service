import { EventRepository } from "@/infra/knex/repositories/events/events-repository";
import { EventPurchaseService } from "./event-purchase-service";

export class UpdateTicketsQuantityService extends EventPurchaseService {
  constructor(eventRepository: EventRepository) {
    super(eventRepository);
  }

  async update(params: {
    eventId: string;
    eventDetails: { area?: string; quantity: number };
  }): Promise<void> {
    const { eventId, eventDetails } = params;

    const content = await this.eventRepository.ticketBooking(
      eventId,
      eventDetails,
    );
    console.log(content);
  }
}
