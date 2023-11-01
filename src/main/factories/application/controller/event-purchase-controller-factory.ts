import { EventPurchaseController } from "@/application/controllers";
import { Controller } from "@/application/interfaces";
import { EventPurchaseServiceFactory } from "../../domain/services/event-purchase-service-factory";

export const EventPurchaseControllerFactory = (): Controller => {
  return new EventPurchaseController(EventPurchaseServiceFactory());
};
