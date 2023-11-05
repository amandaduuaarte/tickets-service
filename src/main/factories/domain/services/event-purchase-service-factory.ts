import { EventPurchaseServiceInterface } from "@/domain/interfaces/event-purchase-service";
import { EventPurchaseService } from "@/domain/services";
import { EventRepository } from "@/infra/knex/repositories/events/events-repository";
import { Nodemailer } from "@/infra/nodemailer/config";
import { RabbitMQ } from "@/infra/rabbit/rabbitmq-config";
import { SendEmailWorker } from "@/infra/rabbit/workers/send-email-worker";
import { EventsRepositoryFactory } from "../../infra/knex/repositories/events/events-repository-factory";

export const EventPurchaseServiceFactory = (): EventPurchaseServiceInterface => {
  return new EventPurchaseService(EventsRepositoryFactory(), new RabbitMQ(), new SendEmailWorker(new Nodemailer()));
};
