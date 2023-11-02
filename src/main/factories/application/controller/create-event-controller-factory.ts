import { CreateEventController } from "@/application/controllers/create-event-controller";
import { Controller } from "@/application/interfaces";

export const CreateEventControllerFactory = (): Controller => {
  return new CreateEventController();
};
