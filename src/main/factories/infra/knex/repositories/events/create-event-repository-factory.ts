import { CreateEventRepositoryInterface } from "@/domain/interfaces/repositories/create-event-repository";
import { CreateEventRepository } from "@/infra/knex/repositories/events/create-event-repository";

export const CreateEventRepositoryFactory = (): CreateEventRepositoryInterface => {
  return new CreateEventRepository();
};
