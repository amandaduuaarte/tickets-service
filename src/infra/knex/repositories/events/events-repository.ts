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
}
