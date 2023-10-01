type EventsReservationModel = {
    row: number;
    seat: number;
}

export type EventsModel = {
    id: string;
    title: string;
    date: Date;
    type: string;
    description: string;
    place: string;
    owner: string;
    event_config: any;
    tickets_quantity: number;
    hasReservation?: EventsReservationModel;
}