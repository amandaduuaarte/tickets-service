import { Router } from 'express'
import { EventPurchaseController } from '@/application/controllers'

export const eventPurchaseRouter = Router()
const eventPurchaseController = new EventPurchaseController()

eventPurchaseRouter.post(
    '/event-purchase',
    eventPurchaseController.handleRequest,
)
