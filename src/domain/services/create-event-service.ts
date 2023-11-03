import { Responsebody } from "@/application/interfaces";
import { CreateEvent, CreateEventServiceInterface } from "../interfaces";
import { BadRequestException } from "@/application/errors/errorExpection";
import { BAD_REQUEST } from "@/application/constants";
import { EventPurchaseValidator } from "../schemas/event-purchase-schema";
import { error, success } from "@/application/utils/http";

export class CreateEventService implements CreateEventServiceInterface {
  async run(params: CreateEvent.CreateEventParams): Promise<Responsebody | void> {
    try {
      console.info(`[Create-Event-Service]: ${params}`);

      if (!params) {
        console.error(`[Create-Event-Service]: Params are required.`);
        throw new BadRequestException("Os parametros são inválidos.", BAD_REQUEST);
      }

      await this.validate(params);

      return success("Tudo certo com o seu evento.");
    } catch (err: any) {
      return error(err.message);
    }
  }

  private async validate(data: CreateEvent.CreateEventParams): Promise<void> {
    try {
      console.info(`[Create-Event-Service]: Validating create event params`);
      await EventPurchaseValidator.validate({ event: data });
      console.info(`[EventPurchase-Service]: Params validate with successfully!.`);
    } catch (err: any) {
      console.error(`[EventPurchase-Service]: Params are invalid: ${err.message}`);
      throw new BadRequestException(err.message, BAD_REQUEST);
    }
  }

  private async CreateEventTable(data: CreateEvent.CreateEventParams): Promise<void> {}
}
