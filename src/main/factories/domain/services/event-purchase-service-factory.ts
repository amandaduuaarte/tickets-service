import { EventPurchaseServiceInterface } from "@/domain/interfaces/event-purchase-service";
import { EventPurchaseService } from "@/domain/services";

import { EventsRepositoryFactory } from "../../infra/knex/repositories/events/events-repository-factory";
import { RabbitMQFactory } from "../../infra/rabbit/rabbitmq-config-factory";
import { SendEmailWorkerFactory } from "../../infra/rabbit/workers/send-email-worker-factory";

export const EventPurchaseServiceFactory = (): EventPurchaseServiceInterface => {
  return new EventPurchaseService(EventsRepositoryFactory(), RabbitMQFactory(), SendEmailWorkerFactory());
};
