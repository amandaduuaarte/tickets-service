import { EventRepositoryInterface } from "@/domain/interfaces/repositories";
import { EventRepository } from "@/infra/knex/repositories/events/events-repository";

export const EventsRepositoryFactory = (): EventRepositoryInterface => {
  return new EventRepository();
};
