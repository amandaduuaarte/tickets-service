/* eslint-disable no-unused-vars */
export type findQuantityByEventIdReturn = {
  tickets_quantity: number;
  event_config: {
    areas: Array<any>;
  };
};

export type findQuantityByAreaReturn = {
  area: number;
};

export interface EventRepositoryInterface {
  findQuantityByEventId(eventId: string): Promise<findQuantityByEventIdReturn>;
  ticketBooking(
    eventId: string,
    eventDetails: { area: string; quantity: number },
  ): Promise<void>;
  findQuantityByArea(
    eventId: string,
    area: string,
  ): Promise<findQuantityByAreaReturn>;
}
