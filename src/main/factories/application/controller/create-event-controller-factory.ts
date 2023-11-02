import { CreateEventController } from "@/application/controllers/create-event-controller";
import { Controller } from "@/application/interfaces";
import { CreateEventServiceFactory } from "../../domain/services";

export const CreateEventControllerFactory = (): Controller => {
  return new CreateEventController(CreateEventServiceFactory());
};
