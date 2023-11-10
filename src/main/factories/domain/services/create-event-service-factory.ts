import { CreateEventServiceInterface } from "@/domain/interfaces";
import { CreateEventService } from "@/domain/services";

import { CreateEventRepositoryFactory } from "../../infra/knex/repositories/events/create-event-repository-factory";

export const CreateEventServiceFactory = (): CreateEventServiceInterface => {
  return new CreateEventService(CreateEventRepositoryFactory());
};
