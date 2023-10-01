import {
    EventRepositoryInterface,
    findQuantityByEventIdReturn,
} from '@/domain/interfaces/repositories'
import { Connection } from '../../config'

export class EventRepository implements EventRepositoryInterface {
    async findQuantityByEventId(
        eventId: string,
    ): Promise<findQuantityByEventIdReturn> {
        try {
            const bdName = `event_${eventId}`
            const config = new Connection()
            const content = await config
                .db(bdName)
                .select('tickets_quantity', 'event_config')
            return content[0]
        } catch (error: any) {
            console.error(
                `[Event-findQuantityByEventId-Repository]: ${error.message}`,
            )
            throw new Error('O evento não pode ser validado.')
        }
    }

    async ticketBooking(eventId: string, eventDetails: any) {
        try {
            const bdName = `event_${eventId}`
            const config = new Connection().db(bdName)
            const quantity = await config.select('tickets_quantity')
            const newQuantity = Number(quantity) - eventDetails.quantity
            const content = await config.update({
                ['tickets_quantity']: newQuantity,
            })
            console.log('aquiiiii', content)
        } catch (error: any) {
            console.error(
                `[Event-ticketBooking-Repository]: ${error.message}`,
            )
            throw new Error('A compra não pode ser finalizada. Tente novamente')
        }
    }
}
