export interface EventPurchaseService {
  run(
    // eslint-disable-next-line no-unused-vars
    params: EventPurchase.EventPurchaseParams,
  ): Promise<EventPurchase.EventPurchaseReturn | void>;
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

  export type EventPurchaseReturn = {
    body: {
      code: number;
      message: string;
    };
  };
}
