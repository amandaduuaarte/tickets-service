import { Responsebody } from "@/application/interfaces";

export interface CreateEventServiceInterface {
  run(params: CreateEvent.CreateEventParams): Promise<Responsebody | void>;
}

export namespace CreateEvent {
  type event_config = {
    areas: {
      name: string;
      quantity: number;
    };
  };

  export type CreateEventParams = {
    name: string;
    description: string;
    type: string;
    place: string;
    owner: string;
    ticket_quantity: number;
    event_config: event_config[];
    date: string;
    front?: number;
    pista?: number;
    vip?: number;
  };
}
