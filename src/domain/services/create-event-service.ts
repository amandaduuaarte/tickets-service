import { Responsebody } from "@/application/interfaces";
import { CreateEvent, CreateEventServiceInterface } from "../interfaces";
import { BadRequestException } from "@/application/errors/errorExpection";
import { BAD_REQUEST } from "@/application/constants";

import { error, success } from "@/application/utils/http";
import { CreateEventRepository } from "@/infra/knex/repositories/events/create-event-repository";
import { CreateEventeValidator } from "../schemas/create-event-schema";

export class CreateEventService implements CreateEventServiceInterface {
  constructor(readonly createEventRepository: CreateEventRepository) {
    this.createEventRepository = createEventRepository;
  }
  async run(params: CreateEvent.CreateEventParams): Promise<Responsebody | void> {
    try {
      const { date } = params;
      if (!params) {
        console.error(`[Create-Event-Service]: Params are required.`);
        throw new BadRequestException("Os parametros são inválidos.", BAD_REQUEST);
      }

      await this.validate(params);
      await this.areasValidate(params);
      await this.dateValidate(date);
      // await this.createEventTable(params);

      return success("Tudo certo com o seu evento.");
    } catch (err: any) {
      return error(err.message);
    }
  }

  // Lembrar de implementar o factory no knex
  private async validate(data: CreateEvent.CreateEventParams): Promise<void> {
    try {
      console.info(`[Create-Event-Service]: Validating create event params.`);
      await CreateEventeValidator.validate({ event: data });
      console.info(`[EventPurchase-Service]: Params validate with successfully!.`);
    } catch (err: any) {
      console.error(`[EventPurchase-Service]: Params are invalid: ${err.message}`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }

  private async areasValidate(data: CreateEvent.CreateEventParams): Promise<void> {
    try {
      if (data.event_config && (!data.front || !data.pista || !data.vip)) {
        console.error(`[EventPurchase-Service]: areas not found.`);
        throw new BadRequestException("É necessário informar a quantidade de ingressos disponiveis por area.", BAD_REQUEST);
      }
      if (data.front && data.vip && data.pista) data.ticket_quantity = data.front + data.vip + data.pista;
    } catch (err: any) {
      console.error(`[EventPurchase-Service]: Params are invalid`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }

  private async dateValidate(date: string): Promise<void> {
    try {
      console.info(`[EventPurchase-Service]: dateValidate: ${date}`);
      const eventDate = new Date(date);
      const nowDate = new Date();

      console.log(eventDate, nowDate);
      if (eventDate < nowDate) {
        console.error(`[EventPurchase-Service]: EventDate is invalid: ${eventDate}`);
        throw new BadRequestException("A data do evento é anterior a data atual", BAD_REQUEST);
      }
    } catch (err: any) {
      console.error(`[Create-Event-Service]: ${err.message}`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }
  private async createEventTable(data: CreateEvent.CreateEventParams): Promise<void> {
    try {
      console.info(`[Create-Event-Service]: Trying to create event table.`);
      await this.createEventRepository.createEvent(data);
    } catch (err: any) {
      console.error(`[Create-Event-Service]: ${err.message}`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }
}
