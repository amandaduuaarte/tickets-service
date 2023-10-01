export type findQuantityByEventIdReturn = {
    tickets_quantity: number
    event_config: {
        areas: Array<any>
    }
}

export interface EventRepositoryInterface {
    findQuantityByEventId(eventId: string): Promise<findQuantityByEventIdReturn>
}
