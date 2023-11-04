import { CreateEventServiceInterface } from "@/domain/interfaces";
import { CreateEventService } from "@/domain/services";
import { CreateEventRepository } from "@/infra/knex/repositories/events/create-event-repository";

export const CreateEventServiceFactory = (): CreateEventServiceInterface => {
  return new CreateEventService(new CreateEventRepository());
};
