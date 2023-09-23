export type Contact = {
    phoneNumber: string;
    email: string;
}

export type EventDetails = {
    row: number | string;
    seat: number;
}

export type EventPurchase = {
    eventId: string;
    ownerName: string;
    contact: Contact;
    eventDetails?: EventDetails;
}