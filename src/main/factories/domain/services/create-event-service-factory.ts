import { CreateEventServiceInterface } from "@/domain/interfaces";
import { CreateEventService } from "@/domain/services";

export const CreateEventServiceFactory = (): CreateEventServiceInterface => {
  return new CreateEventService();
};
