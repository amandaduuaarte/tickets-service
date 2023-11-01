import { Responsebody } from "@/application/interfaces";

export interface EventPurchaseServiceInterface {
  run(params: EventPurchase.EventPurchaseParams): Promise<Responsebody | void>;
}

export namespace EventPurchase {
  export type EventPurchaseParams = {
    eventId: string;
    ownerName: string;
    contact: {
      email: string;
      phoneNumber: number;
    };
    eventDetails: {
      area: string;
      quantity: number;
    };
  };
}
