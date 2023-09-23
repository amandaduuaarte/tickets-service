import { OwnerModel } from "@/domain/models/owner-model";

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
    owner: OwnerModel;
    hasReservation?: EventsReservationModel;
}