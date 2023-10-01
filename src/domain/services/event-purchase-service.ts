import { BadRequestException } from '@/application/errors/errorExpection'
import { EventPurchase } from '../interfaces/event-purchase-service'
import { EventPurchaseValidator } from '../schemas/event-purchase-schema'
import { BAD_REQUEST } from '@/application/constants'
import { EventRepository } from '@/infra/knex/repositories/events/events-repository'
import { error, noContent, success } from '@/application/utils/http'

export class EventPurchaseService implements EventPurchase {
    constructor(private readonly eventRepository: EventRepository) {}

    async run(
        params: EventPurchase.EventPurchaseParams,
    ): Promise<EventPurchase.EventPurchaseReturn | void> {
        try {
            if (!params) {
                console.error(`[EventPurchase-Service]: Params are required.`)
                throw new BadRequestException(
                    'Os parametros são inválidos.',
                    BAD_REQUEST,
                )
            }

            await this.validate(params)
            await this.fullTicketAvailability(params)
            await this.ticketAvailabilityForArea(params)
            return noContent();
        } catch (err: any) {
            return error(err.message)
        }
    }

    async validate(params: EventPurchase.EventPurchaseParams): Promise<void> {
        try {
            console.info(
                `[EventPurchase-Service]: Validating event purchase params.`,
            )
            await EventPurchaseValidator.validate({ event: params })
            console.info(
                `[EventPurchase-Service]: Params validate with successfully!.`,
            )
        } catch (err: any) {
            console.error(
                `[EventPurchase-Service]: Params are invalid: ${err.message}`,
            )
            throw new BadRequestException(err.message, BAD_REQUEST)
        }
    }

    async fullTicketAvailability(
        params: EventPurchase.EventPurchaseParams,
    ): Promise<void> {
        try {
            const event = await this.eventRepository.findQuantityByEventId(
                params.eventId,
            )
            if (event.tickets_quantity < params.quantity) {
                console.log(
                    `[EventPurchase-Service]: Quantity is not valid for this event: ${params.quantity}.`,
                )
                throw new BadRequestException(
                    'Infelizmente a quantidade de ingressos é inferior a quantidade solicitada na sua compra.',
                    BAD_REQUEST,
                )
            }
        } catch (err: any) {
            console.error(
                `[EventPurchase-Service]: EventId id invalid: ${params.eventId}.`,
            )
            throw new BadRequestException(err.message, BAD_REQUEST)
        }
    }
    async ticketAvailabilityForArea(
        params: EventPurchase.EventPurchaseParams,
    ): Promise<void> {
        try {
            if (!params.eventDetails) {
                return
            }
            const event = await this.eventRepository.findQuantityByEventId(
                params.eventId,
            )
            const selectedArea = params.eventDetails.area
            const selectedQuantity = params.eventDetails.quantityForArea
            const areaFound = event.event_config.areas.find(
                (area) => area.name === selectedArea,
            )

            if (!areaFound) {
                console.error(
                    `[EventPurchase-Service]: Event area is invalid: ${params.eventDetails.area}.`,
                )
                throw new BadRequestException(
                    'Parece que o local que você selecionou não está disponível',
                    BAD_REQUEST,
                )
            }

            if (selectedQuantity > areaFound.quantity) {
                console.log(
                    `[EventPurchase-Service]: Quantity is not valid for this area: ${selectedQuantity}.`,
                )
                throw new BadRequestException(
                    'Infelizmente a quantidade de ingressos é inferior a quantidade solicitada na sua compra.',
                    BAD_REQUEST,
                )
            }
        } catch (err: any) {
            console.error(
                `[EventPurchase-Service]: EventId id invalid: ${params.eventId}.`,
            )
            throw new BadRequestException(err.message, BAD_REQUEST)
        }
    }

    // atualizar a quantidade de ingressos (nesse)
    // publicar no rabbit (acho que posso fazer isso em outro arquivo)
}
