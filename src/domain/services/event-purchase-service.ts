import { BadRequestException } from "@/application/errors/errorExpection";
import { EventPurchase } from "../interfaces/event-purchase-service";
import { EventPurchaseValidator } from "../schemas/event-purchase-schema";
import { BAD_REQUEST } from "@/application/constants";
import { EventRepository } from "@/infra/knex/repositories/events/events-repository";
import { error, success } from "@/application/utils/http";
import { RabbitMQConfig } from "../interfaces/rabbit/rabbitmq-config";

export class EventPurchaseService implements EventPurchaseService {
  constructor(
    readonly eventRepository: EventRepository,
    readonly rabbitMQ: RabbitMQConfig,
  ) {
    this.eventRepository = eventRepository;
    this.rabbitMQ = rabbitMQ;
  }

  async run(params: EventPurchase.EventPurchaseParams): Promise<EventPurchase.EventPurchaseReturn | void> {
    try {
      const { eventId, eventDetails } = params;
      if (!params) {
        console.error(`[EventPurchase-Service]: Params are required.`);
        throw new BadRequestException("Os parametros são inválidos.", BAD_REQUEST);
      }

      await this.validate(params);
      await this.fullTicketAvailability({ eventId, eventDetails });
      await this.ticketAvailabilityForArea({ eventId, eventDetails });
      await this.updateQuantity({ eventId, eventDetails });

      console.info(`[EventPurchase-Service]: Everything ok.`);

      setTimeout(async () => {
        await this.rabbitMQ.publishDataQueue("email-notification", {
          name: params.ownerName,
          email: params.contact.email,
          eventId: eventId,
        });
      }, 1000);
      return success("Tudo certo com a sua compra! Em breve você recebera um email com o seu ingresso.");
    } catch (err: any) {
      return error(err.message);
    }
  }

  async validate(params: EventPurchase.EventPurchaseParams): Promise<void> {
    try {
      console.info(`[EventPurchase-Service]: Validating event purchase params.`);
      await EventPurchaseValidator.validate({ event: params });
      console.info(`[EventPurchase-Service]: Params validate with successfully!.`);
    } catch (err: any) {
      console.error(`[EventPurchase-Service]: Params are invalid: ${err.message}`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }

  async fullTicketAvailability(params: { eventId: string; eventDetails: { area: string; quantity: number } }): Promise<void> {
    try {
      const { quantity } = params.eventDetails;
      const event = await this.eventRepository.findQuantityByEventId(params.eventId);
      if (event.tickets_quantity < quantity) {
        console.info(`[EventPurchase-Service]: Quantity is not valid for this event: ${quantity}.`);
        throw new BadRequestException("Infelizmente a quantidade de ingressos é inferior a quantidade solicitada na sua compra.", BAD_REQUEST);
      }
    } catch (err: any) {
      console.error(`[EventPurchase-Service]: EventId id invalid: ${params.eventId}.`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }
  async ticketAvailabilityForArea(params: { eventId: string; eventDetails: { area: string; quantity: number } }): Promise<void> {
    try {
      if (!params.eventDetails.area) {
        return;
      }
      const selectedArea = params.eventDetails.area;
      const selectedQuantity = params.eventDetails.quantity;

      const eventFound = await this.eventRepository.findQuantityByArea(params.eventId, selectedArea);

      if (!eventFound) {
        console.error(`[EventPurchase-Service]: Event area is invalid: ${params.eventDetails.area}.`);
        throw new BadRequestException("Parece que o local que você selecionou não está disponível", BAD_REQUEST);
      }

      if (selectedQuantity > eventFound.area) {
        console.info(`[EventPurchase-Service]: Quantity is not valid for this area: ${selectedQuantity}.`);
        throw new BadRequestException("Infelizmente a quantidade de ingressos é inferior a quantidade solicitada na sua compra.", BAD_REQUEST);
      }
    } catch (err: any) {
      console.error(`[EventPurchase-Service]: EventId id invalid: ${params.eventId}.`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }

  async updateQuantity(params: { eventId: string; eventDetails: { area: string; quantity: number } }): Promise<void> {
    try {
      console.info(`[EventPurchase-Service]: Updating the total quantity value.`);
      await this.eventRepository.ticketBooking(params.eventId, params.eventDetails);
    } catch (err: any) {
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }
}
