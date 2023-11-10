import { CreateEvent } from "../create-event-service";

export interface CreateEventRepositoryInterface {
  createEvent(data: CreateEvent.CreateEventParams): Promise<void>;
  dropEvent(data: CreateEvent.CreateEventParams): Promise<void>;
}
