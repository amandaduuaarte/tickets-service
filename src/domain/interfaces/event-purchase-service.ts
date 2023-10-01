export interface EventPurchase {
    run(
        params: EventPurchase.EventPurchaseParams,
    ): Promise<EventPurchase.EventPurchaseReturn | void>
}

export namespace EventPurchase {
    export type EventPurchaseParams = {
        eventId: string
        ownerName: string
        quantity: number
        contact: {
            email: string
            phoneNumber: number
        }
        eventDetails?: {
            area: string
            quantityForArea: number
        }
    }
    export type EventPurchaseReturn = {
        body: {
            code: number
            message: string
        };
    }
}
