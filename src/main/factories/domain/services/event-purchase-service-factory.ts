import { EventPurchaseServiceInterface } from "@/domain/interfaces/event-purchase-service";
import { EventPurchaseService } from "@/domain/services";
import { EventRepository } from "@/infra/knex/repositories/events/events-repository";
import { RabbitMQ } from "@/infra/rabbit/rabbitmq-config";

export const EventPurchaseServiceFactory = (): EventPurchaseServiceInterface => {
  return new EventPurchaseService(new EventRepository(), new RabbitMQ());
};
