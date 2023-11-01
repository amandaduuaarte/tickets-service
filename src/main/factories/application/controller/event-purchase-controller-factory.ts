import { EventPurchaseController } from "@/application/controllers";
import { Controller } from "@/application/interfaces";

export const EventPurchaseControllerFactory = (): Controller => {
  return new EventPurchaseController();
};
